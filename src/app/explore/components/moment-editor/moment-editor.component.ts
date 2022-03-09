import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MomentEditorPhotoComponent } from '../moment-editor-photo/moment-editor-photo.component';

@Component({
  selector: 'app-moment-editor',
  templateUrl: './moment-editor.component.html',
  styleUrls: ['./moment-editor.component.scss'],
})
export class MomentEditorComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async momentEditorPhotoModal() {
    const modal = await this.modalController.create({
      component: MomentEditorPhotoComponent,
      id: 'momentEditorPhoto',
    });

    await modal.present();
  }
  
  dismissModal() {
    this.modalController.dismiss()
  }

  presentMomentPhotoEditor() {
    this.momentEditorPhotoModal();
  }

}
