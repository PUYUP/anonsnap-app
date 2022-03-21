import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userRequestResetPassword } from 'src/app/store/actions/user/user.actions';
import { SelectUserResetPassword } from 'src/app/store/selectors/user/user.selectors';
import { ValidateVerificationComponent } from '../validate-verification/validate-verification.component';

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
      component: ValidateVerificationComponent,
      backdropDismiss: false,
      initialBreakpoint: 0.35,
      breakpoints: [0, 0.35],
      componentProps: {
        ...data
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
