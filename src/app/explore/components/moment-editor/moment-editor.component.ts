import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { createMoment, updateMoment, updateMyMoment } from 'src/app/store/actions/moment/moment.actions';
import { SelectCreatedMoment, SelectUpdatedMoment, SelectUpdatedMyMoment } from 'src/app/store/selectors/moment/moment.selectors';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { UserService } from 'src/app/services/user/user.service';

import { Camera, CameraResultType } from '@capacitor/camera';

import * as endpoint from '../../../services/endpoint';
import { CameraPreviewComponent } from '../camera-preview/camera-preview.component';
import { AppState } from 'src/app/store/app.state';
import { SelectTakePicture } from 'src/app/store/selectors/camera-preview/camera-preview.selectors';
import { resetTakePicture } from 'src/app/store/actions/camera-preview/camera-preview.actions';


@Component({
  providers: [File],
  selector: 'app-moment-editor',
  templateUrl: './moment-editor.component.html',
  styleUrls: ['./moment-editor.component.scss'],
})
export class MomentEditorComponent implements OnInit {

  @ViewChild('myForm') ngForm: NgForm;
  
  @Input() locationObj: any;
  @Input() picture: any;
  @Input() item: any;
  @Input() source: string;

  formGroup: any = FormGroup;
  createdMoment$: Observable<any>;
  updatedMoment$: Observable<any>;
  updatedMyMoment$: Observable<any>;
  onDestroy$ = new Subject<void>();
  attachmentsPreview: any = [];
  attachmentsGuid: any = [];
  progress: number = 0;
  takedPicture$: Observable<any>;

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
    this.updatedMoment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.modalController.getTop().then((m: any) => {
          if (m) this.dismissModal();
        });
      }
    });

    this.updatedMyMoment$ = this._store.pipe(select(SelectUpdatedMyMoment));
    this.updatedMyMoment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.modalController.getTop().then((m: any) => {
          if (m) this.dismissModal();
        });
      }
    });

    this.takedPicture$ = this._store.pipe(select(SelectTakePicture));
    this.takedPicture$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      let path = state?.data?.path
      if (path) {
        this.uploadPicture(path);

        let newPicture = [{ guid: Date.now() }];
        this.attachmentsPreview = [...newPicture, ...this.attachmentsPreview];
      }
    });
  }

  ngOnInit() { 
    this.formGroup = this._fb.group({
      summary: [''],
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
      if (this.picture?.path) {
        this.uploadPicture(this.picture?.path);

        let newPicture = [{ guid: Date.now() }];
        this.attachmentsPreview = [...newPicture, ...this.attachmentsPreview];
      }
    }
  }

  onFormSubmit() {
    this.formGroup.value['attachments'] = this.attachmentsGuid;

    if (this.item?.guid) {
      if (this.source == 'mymoment') {
        this._store.dispatch(updateMyMoment({ data: { ...this.formGroup.value }, guid: this.item.guid }));
      } else {
        this._store.dispatch(updateMoment({ data: { ...this.formGroup.value }, guid: this.item.guid }));
      }

    } else {
      this.formGroup.value['locations'] = [this.locationObj.guid];
      this._store.dispatch(createMoment({ data: { ...this.formGroup.value } }));
    }
  }

  uploadPicture(filePath: any) {
    const fileTransfer: FileTransferObject = this._transfer.create();

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
        // reset taked picture
        this._store.dispatch(resetTakePicture());

        // success
        let dataObj = JSON.parse(data?.response);
        this.attachmentsGuid.unshift(dataObj?.guid);

        // replace guid on preview
        this.attachmentsPreview = this.attachmentsPreview.map((d: any) => {
          if (!d?.file) {
            d = { ...dataObj }
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

  async presentTakePicture() {
    const picture = await Camera.getPhoto({
      quality: 75,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  
    // Here you get the image as result.
    let newPic = [{ guid: '', file: picture.webPath }];
    this.attachmentsPreview = [...newPic, ...this.attachmentsPreview];

    this.uploadPicture(picture?.path);
  }

  async cameraPreviewModal() {
    const modal = await this.modalController.create({
      component: CameraPreviewComponent
    })
    await modal.present()
  }

  removeAttachment(item: any) {
    this.attachmentsPreview = this.attachmentsPreview.filter((d: any) => d.guid != item.guid);
    this.attachmentsGuid = this.attachmentsGuid.filter((d: any) => d != item.guid);
  }

  takePicture() {
    this.cameraPreviewModal()
  }

  send() {
    this.ngForm.ngSubmit.emit();
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
