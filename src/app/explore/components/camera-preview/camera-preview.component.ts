import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { CameraPreview } from '@awesome-cordova-plugins/camera-preview/ngx';
import { IonContent, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { resetTakePicture, takePicture } from 'src/app/store/actions/camera-preview/camera-preview.actions';
import { MomentEditorComponent } from '../moment-editor/moment-editor.component';


@Component({
  providers: [CameraPreview],
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.scss'],
})
export class CameraPreviewComponent implements OnInit {

  @ViewChild('ionContentEl', { static: false }) ionContentEl: ElementRef;

  @Input() source: string;
  @Input() locationObj: any;

  imagePath: string;

  constructor(
    private _cameraPreview: CameraPreview,
    private _store: Store<AppState>,
    public modalController: ModalController
  ) { 

  }

  async momentEditorModal(picture: any) {
    const modal = await this.modalController.create({
      component: MomentEditorComponent,
      componentProps: {
        locationObj: this.locationObj,
        picture: picture,
      }
    });

    await modal.present();
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    const cameraPreviewOpts: any = {
      x: 0,
      y: 56,
      width: window.screen.width,
      height: window.screen.width,
      camera: 'back',
      tapPhoto: false,
      tapFocus: true,
      toBack: false,
      previewDrag: false,
      storeToFile: true,
    }

    // start camera
    this._cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
        if (this.ionContentEl.nativeElement) {
          this.ionContentEl.nativeElement.classList.add('custom-ion-content');
        }
      },
      (err) => {
        console.log(err)
      });
  }

  savePicture() {
    this._cameraPreview.takePicture({
      width: 1280,
      height: 1280,
      quality: 85,
    }).then((imageData) => {
      this.imagePath = imageData[0];
      this._store.dispatch(takePicture({ data: { path: this.imagePath } }));
      this.dismiss();
    }, (err) => {
      console.log(err);
      this.dismiss();
    });
  }

  switchCamera() {
    this._cameraPreview.switchCamera();
  }

  dismiss() {
    this._cameraPreview.hide();
    this._cameraPreview.stopCamera();
    this.modalController.dismiss().then(() => {
      // camera triggered from homepage
      // open editor
      if (this.source == 'homepage' && this.imagePath) {
        let picture = { path: this.imagePath }
        this.momentEditorModal(picture);
      }

      this._store.dispatch(resetTakePicture());

      if (this.ionContentEl.nativeElement) {
        this.ionContentEl.nativeElement.classList.remove('custom-ion-content');
      }
    });
  }

}
