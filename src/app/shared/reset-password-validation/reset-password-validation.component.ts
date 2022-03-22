import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { resetValidateVerification, validateVerification } from 'src/app/store/actions/core/core.actions';
import { clearUserRequestResetPassword } from 'src/app/store/actions/user/user.actions';
import { AppState } from 'src/app/store/app.state';
import { SelectValidateVerification } from 'src/app/store/selectors/core/core.selectors';
import { ResetPasswordConfirmComponent } from '../reset-password-confirm/reset-password-confirm.component';

@Component({
  selector: 'app-reset-password-validation',
  templateUrl: './reset-password-validation.component.html',
  styleUrls: ['./reset-password-validation.component.scss'],
})
export class ResetPasswordValidationComponent implements OnInit {

  @Input() verificationData: any;

  passcode: string;
  validatedVerificationData: any;
  validateVerification$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(private _store: Store<AppState>, public modalController: ModalController) { 
    this.validateVerification$ = this._store.pipe(select(SelectValidateVerification));
    this.validateVerification$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded' && state?.data?.challenge == 'email_reset_password_verification') {
        this.validatedVerificationData = state?.data;
        this.resetPasswordConfirmModal();
        this.dismiss();
      }
    })
  }

  async resetPasswordConfirmModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordConfirmComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      backdropDismiss: false,
      componentProps: {
        verificationData: this.verificationData,
        validatedVerificationData: this.validatedVerificationData,
      }
    })

    await modal.present()
  }

  ngOnInit() { 
    this._store.dispatch(clearUserRequestResetPassword());
  }
  
  validate() {
    if (this.passcode) {
      this._store.dispatch(validateVerification({
        data: {
          challenge: this.verificationData.challenge,
          token: this.verificationData.verification_token
        },
        passcode: this.passcode,
      }))
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  
}
