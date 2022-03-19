import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterLocationComponent } from './filter-location/filter-location.component';
import { IonicModule } from '@ionic/angular';
import { FilterRadiusComponent } from './filter-radius/filter-radius.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { FormSignupComponent } from './form-signup/form-signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ValidateVerificationComponent } from './validate-verification/validate-verification.component';
import { FilterCalendarComponent } from './filter-calendar/filter-calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { AutosizeModule } from 'ngx-autosize';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrap5Plugin
]);

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AutosizeModule,
  ],
  declarations: [
    FilterLocationComponent,
    FilterRadiusComponent,
    FormSigninComponent,
    FormSignupComponent,
    ResetPasswordComponent,
    ValidateVerificationComponent,
    FilterCalendarComponent,
    CommentListComponent,
    CommentEditorComponent,
  ],
  entryComponents: [
    FilterLocationComponent,
    FilterRadiusComponent,
    FormSigninComponent,
    FormSignupComponent,
    ResetPasswordComponent,
    ValidateVerificationComponent,
    FilterCalendarComponent,
    CommentListComponent,
    CommentEditorComponent,
  ],
  exports: [
    FilterLocationComponent,
    FilterRadiusComponent,
    FormSigninComponent,
    FormSignupComponent,
    ResetPasswordComponent,
    ValidateVerificationComponent,
    FilterCalendarComponent,
    CommentListComponent,
    CommentEditorComponent,
  ]
})
export class SharedModule { }
