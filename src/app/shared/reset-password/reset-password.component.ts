import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userRequestResetPassword } from 'src/app/store/actions/user/user.actions';
import { SelectUserResetPassword } from 'src/app/store/selectors/user/user.selectors';
import { ResetPasswordValidationComponent } from '../reset-password-validation/reset-password-validation.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  email: string;
  resetPassword$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(private _store: Store<AppState>, public modalController: ModalController) { 
    this.resetPassword$ = this._store.pipe(select(SelectUserResetPassword));
    this.resetPassword$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.modalController.dismiss();
        this.validateVerificationModal(state?.data);
      }
    })
  }

  async validateVerificationModal(data: any) {
    const modal = await this.modalController.create({
      component: ResetPasswordValidationComponent,
      backdropDismiss: false,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75],
      componentProps: {
        verificationData: { ...data }
      }
    })
    await modal.present()
  }

  ngOnInit() { }
  
  requestResetPassword() {
    this._store.dispatch(userRequestResetPassword({ data: { resetwith: 'email', value: this.email } }));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
