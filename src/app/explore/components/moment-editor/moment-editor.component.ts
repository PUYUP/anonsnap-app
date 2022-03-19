import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { createMoment, updateMoment } from 'src/app/store/actions/moment/moment.actions';
import { SelectCreatedMoment, SelectUpdatedMoment } from 'src/app/store/selectors/moment/moment.selectors';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { UserService } from 'src/app/services/user/user.service';

import { Camera, CameraResultType } from '@capacitor/camera';

import * as endpoint from '../../../services/endpoint';

@Component({
  providers: [File],
  selector: 'app-moment-editor',
  templateUrl: './moment-editor.component.html',
  styleUrls: ['./moment-editor.component.scss'],
})
export class MomentEditorComponent implements OnInit {

  @Input() locationObj: any;
  @Input() picture: any;
  @Input() item: any;

  formGroup: any = FormGroup;
  createdMoment$: Observable<any>;
  updatedMoment$: Observable<any>;
  onDestroy$ = new Subject<void>();
  attachmentsPreview: any = [];
  attachmentsGuid: any = [];
  progress: number = 0;

  constructor(
    public modalController: ModalController,
    private _actionListener$: ActionsSubject,
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private _transfer: FileTransfer,
    private _userService: UserService
  ) { 
    this.createdMoment$ = this._store.pipe(select(SelectCreatedMoment));
    this.createdMoment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.modalController.getTop().then((m: any) => {
          if (m) this.dismissModal();
        });
      }
    });

    this.updatedMoment$ = this._store.pipe(select(SelectUpdatedMoment));
  }

  ngOnInit() { 
    this.formGroup = this._fb.group({
      summary: ['', [Validators.required]],
    });

    if (this.item) {
      this.attachmentsGuid = this.item?.attachments.map((d: any) => d.guid);
      this.attachmentsPreview = this.item?.attachments;
  
      this.formGroup.patchValue({
        summary: this.item.summary,
      })
    }

    // listen ngrx
    this._actionListener$
      .pipe(skip(1))
      .subscribe((action) => {
        if (action.type == '[Moment] Edit Moment Success') {
          this.dismissModal();
        }
      });
    
    if (this.picture) {
      this.uploadPicture(this.picture);
      this.attachmentsPreview.push({ guid: Date.now(), file: this.picture.webPath });
    }
  }

  onFormSubmit() {
    this.formGroup.value['attachments'] = this.attachmentsGuid;

    if (this.item?.guid) {
      this._store.dispatch(updateMoment({ data: { ...this.formGroup.value }, guid: this.item.guid }));
    } else {
      this.formGroup.value['locations'] = [this.locationObj.guid];
      this._store.dispatch(createMoment({ data: { ...this.formGroup.value } }));
    }
  }

  uploadPicture(file: any) {
    const fileTransfer: FileTransferObject = this._transfer.create();

    let filePath = file.path;
    let fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileName,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        Authorization: 'Bearer ' + this._userService.getUserToken?.access,
      }
   }
 
  fileTransfer.upload(filePath, endpoint.attachment, options)
    .then((data) => {
      // success
      let dataObj = JSON.parse(data?.response);
      this.attachmentsGuid.push(dataObj?.guid);

      // replace guid on preview
      this.attachmentsPreview = this.attachmentsPreview.map((d: any) => {
        if (!d?.guid || d?.guid == '') {
          d = {
            ...d,
            guid: dataObj?.guid
          }
        }

        return d;
      });
    }, (err) => {
      // error
      console.log(err);
    });
  
    fileTransfer.onProgress((progressEvent) => {
      if (progressEvent.lengthComputable) {
        let perc = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        this.progress = perc;
      }
    });
  }

  async takePicture() {
    const picture = await Camera.getPhoto({
      quality: 75,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  
    // Here you get the image as result.
    let newPic = [{ guid: '', file: picture.webPath }];
    this.attachmentsPreview = [...newPic, ...this.attachmentsPreview];

    this.uploadPicture(picture);
  }

  removeAttachment(item: any) {
    this.attachmentsPreview = this.attachmentsPreview.filter((d: any) => d.guid != item.guid);
    this.attachmentsGuid = this.attachmentsGuid.filter((d: any) => d != item.guid);
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
