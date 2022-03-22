import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { resetValidateVerification } from 'src/app/store/actions/core/core.actions';
import { clearUserConfirmResetPassword, userConfirmResetPassword } from 'src/app/store/actions/user/user.actions';
import { AppState } from 'src/app/store/app.state';
import { SelectUserConfirmResetPassword } from 'src/app/store/selectors/user/user.selectors';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss'],
})
export class ResetPasswordConfirmComponent implements OnInit {

  @Input() verificationData: any;
  @Input() validatedVerificationData: any;

  formGroup: any = FormGroup;
  resetPasswordConfirm$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(
    public modalController: ModalController,
    private _store: Store<AppState>,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this._store.dispatch(resetValidateVerification());
    this.resetPasswordConfirm$ = this._store.pipe(select(SelectUserConfirmResetPassword));
    this.resetPasswordConfirm$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.dismiss();
        this._store.dispatch(clearUserConfirmResetPassword());
      }
    })

    this.formGroup = this._fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onFormSubmit() {
    let data = {
      uid: this.verificationData.uid,
      reset_token: this.verificationData.reset_token,
      resetwith: this.verificationData.resetwith,
      passcode: this.validatedVerificationData.passcode,
      verification_token: this.validatedVerificationData.token,
    }

    let finalData = {
      ...data,
      ...this.formGroup.value
    }

    this._store.dispatch(userConfirmResetPassword({ data: finalData }));
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
