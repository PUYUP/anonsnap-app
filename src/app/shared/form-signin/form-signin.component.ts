import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userSignin } from 'src/app/store/actions/user/user.actions';
import { SelectUserSignin } from 'src/app/store/selectors/user/user.selectors';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.scss'],
})
export class FormSigninComponent implements OnInit {

  isPasswordShowed: boolean = false;
  formGroup: any = FormGroup;
  userSignin$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder, private _store: Store<AppState>, public modalController: ModalController) { 
    this.userSignin$ = this._store.pipe(select(SelectUserSignin));
    this.userSignin$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.error) {
        // pass
      }
    })
  }

  async lostPasswordModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordComponent,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75]
    })
    await modal.present()
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onFormSubmit() {
    this._store.dispatch(userSignin({ ...this.formGroup.value }));
  }

  showPassword() {
    this.isPasswordShowed = !this.isPasswordShowed;
  }

  lostPassword() {
    this.lostPasswordModal()
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
