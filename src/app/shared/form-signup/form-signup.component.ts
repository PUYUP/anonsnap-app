import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userSignup } from 'src/app/store/actions/user/user.actions';
import { SelectUserSignin } from 'src/app/store/selectors/user/user.selectors';
import { SelectUserSignup } from 'src/app/store/selectors/user/user.selectors';

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss'],
})
export class FormSignupComponent implements OnInit {

  isPasswordShowed: boolean = false;
  formGroup: any = FormGroup;
  userSignup$: Observable<any>;
  userSignin$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder, private _store: Store<AppState>, public modalController: ModalController) { 
    this.userSignup$ = this._store.pipe(select(SelectUserSignup));
    this.userSignup$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.error) {
        // pass
      }
    });

    this.userSignin$ = this._store.pipe(select(SelectUserSignin));
    this.userSignin$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.dismissModal();
      }
    })
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onFormSubmit() {
    let username = this.formGroup.value.username;
    let email = `${username}@anonsnap.com`;

    this.formGroup.value['email'] = email;
    this._store.dispatch(userSignup({ ...this.formGroup.value }));
  }

  showPassword() {
    this.isPasswordShowed = !this.isPasswordShowed;
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
