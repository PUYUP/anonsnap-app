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

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExplorePageRoutingModule,
    SharedModule
  ],
  declarations: [
    ExplorePage,
    MomentListComponent,
    MomentEditorComponent,
    MomentEditorPhotoComponent
  ],
  entryComponents: [
    MomentListComponent,
    MomentEditorComponent,
    MomentEditorPhotoComponent
  ]
})
export class ExplorePageModule {}
