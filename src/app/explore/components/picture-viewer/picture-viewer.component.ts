import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import SwiperCore, { Pagination, Zoom } from 'swiper';
SwiperCore.use([Pagination, Zoom]);


@Component({
  selector: 'app-picture-viewer',
  templateUrl: './picture-viewer.component.html',
  styleUrls: ['./picture-viewer.component.scss'],
})
export class PictureViewerComponent implements OnInit {

  @Input() items: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
