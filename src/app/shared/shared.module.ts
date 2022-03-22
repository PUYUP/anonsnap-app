import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterLocationComponent } from './filter-location/filter-location.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { FormSignupComponent } from './form-signup/form-signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FilterCalendarComponent } from './filter-calendar/filter-calendar.component';

import { ListCommentComponent } from './list-comment/list-comment.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { AutosizeModule } from 'ngx-autosize';
import { ListTagComponent } from './list-tag/list-tag.component';
import { ResetPasswordValidationComponent } from './reset-password-validation/reset-password-validation.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AutosizeModule,
    ScrollingModule,
  ],
  declarations: [
    FilterLocationComponent,
    FormSigninComponent,
    FormSignupComponent,
    ResetPasswordComponent,
    ResetPasswordValidationComponent,
    ResetPasswordConfirmComponent,
    FilterCalendarComponent,
    ListCommentComponent,
    CommentEditorComponent,
    ListTagComponent,
  ],
  entryComponents: [
    FilterLocationComponent,
    FormSigninComponent,
    FormSignupComponent,
    ResetPasswordComponent,
    ResetPasswordValidationComponent,
    ResetPasswordConfirmComponent,
    FilterCalendarComponent,
    ListCommentComponent,
    CommentEditorComponent,
    ListTagComponent,
  ],
  exports: [
    FilterLocationComponent,
    FormSigninComponent,
    FormSignupComponent,
    ResetPasswordComponent,
    ResetPasswordValidationComponent,
    ResetPasswordConfirmComponent,
    FilterCalendarComponent,
    ListCommentComponent,
    CommentEditorComponent,
    ListTagComponent,
  ]
})
export class SharedModule { }
