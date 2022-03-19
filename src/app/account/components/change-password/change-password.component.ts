import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userChangePassword } from 'src/app/store/actions/user/user.actions';
import { SelectUserChangePassword } from 'src/app/store/selectors/user/user.selectors';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  isPasswordShowed: boolean = false;
  formGroup: any = FormGroup;
  userChangePassword$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(
    public modalController: ModalController,
    private _fb: FormBuilder,
    private _store: Store<AppState>
  ) { 
    this.userChangePassword$ = this._store.pipe(select(SelectUserChangePassword));
    this.userChangePassword$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.dismissModal();
      }
    })
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      current_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onFormSubmit() {
    this._store.dispatch(userChangePassword({ data: { ...this.formGroup.value } }));
  }

  showPassword() {
    this.isPasswordShowed = !this.isPasswordShowed;
  }
  
  dismissModal() {
    this.modalController.dismiss()
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
