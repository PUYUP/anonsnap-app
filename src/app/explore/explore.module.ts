import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExplorePage } from './explore.page';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MomentListComponent } from './components/moment-list/moment-list.component';
import { MomentEditorComponent } from './components/moment-editor/moment-editor.component';
import { MomentEditorPhotoComponent } from './components/moment-editor-photo/moment-editor-photo.component';

import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

import { AutosizeModule } from 'ngx-autosize';
import { PictureViewerComponent } from './components/picture-viewer/picture-viewer.component';
import { SwiperModule } from 'swiper/angular';
import { MapRadiusComponent } from './components/map-radius/map-radius.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExplorePageRoutingModule,
    SharedModule,
    AutosizeModule,
    SwiperModule,
  ],
  declarations: [
    ExplorePage,
    MomentListComponent,
    MomentEditorComponent,
    MomentEditorPhotoComponent,
    PictureViewerComponent,
    MapRadiusComponent,
  ],
  entryComponents: [
    MomentListComponent,
    MomentEditorComponent,
    MomentEditorPhotoComponent,
    PictureViewerComponent,
    MapRadiusComponent,
  ],
  providers: [
    FileTransfer,
    FileTransferObject,
    File,
  ]
})
export class ExplorePageModule {}
