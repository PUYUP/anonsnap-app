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

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AccountPage }]),
    AccountPageRoutingModule,
    SharedModule
  ],
  declarations: [
    AccountPage,
    ProfileComponent,
    ChangePasswordComponent,
  ],
  entryComponents: [
    ProfileComponent,
    ChangePasswordComponent,
  ]
})
export class AccountPageModule {}
