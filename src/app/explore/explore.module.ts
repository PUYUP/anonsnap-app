import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExplorePage } from './explore.page';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListMomentComponent } from './components/list-moment/list-moment.component';
import { MomentEditorComponent } from './components/moment-editor/moment-editor.component';
import { MomentEditorPhotoComponent } from './components/moment-editor-photo/moment-editor-photo.component';

import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

import { AutosizeModule } from 'ngx-autosize';
import { PictureViewerComponent } from './components/picture-viewer/picture-viewer.component';
import { SwiperModule } from 'swiper/angular';
import { FilterMapComponent } from './components/filter-map/filter-map.component';
import { CameraPreviewComponent } from './components/camera-preview/camera-preview.component';

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
    ListMomentComponent,
    MomentEditorComponent,
    MomentEditorPhotoComponent,
    PictureViewerComponent,
    FilterMapComponent,
    CameraPreviewComponent,
  ],
  entryComponents: [
    ListMomentComponent,
    MomentEditorComponent,
    MomentEditorPhotoComponent,
    PictureViewerComponent,
    FilterMapComponent,
    CameraPreviewComponent,
  ],
  providers: [
    FileTransfer,
    FileTransferObject,
    File,
  ]
})
export class ExplorePageModule {}
