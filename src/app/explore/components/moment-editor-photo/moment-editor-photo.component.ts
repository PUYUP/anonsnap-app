import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-moment-editor-photo',
  templateUrl: './moment-editor-photo.component.html',
  styleUrls: ['./moment-editor-photo.component.scss'],
})
export class MomentEditorPhotoComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }
  
  dismissModal() {
    this.modalController.dismiss()
  }

}
