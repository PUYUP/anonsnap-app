import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPage } from './account.page';

import { AccountPageRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MomentComponent } from './components/moment/moment.component';
import { CommentComponent } from './components/comment/comment.component';

import { SwiperModule } from 'swiper/angular';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AccountPage }]),
    AccountPageRoutingModule,
    SharedModule,
    SwiperModule
  ],
  declarations: [
    AccountPage,
    ProfileComponent,
    ChangePasswordComponent,
    MomentComponent,
    CommentComponent,
  ],
  entryComponents: [
    ProfileComponent,
    ChangePasswordComponent,
  ],
  providers: [
    FileTransfer,
    FileTransferObject,
    File,
  ]
})
export class AccountPageModule {}
