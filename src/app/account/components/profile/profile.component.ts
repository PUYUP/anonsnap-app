import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userUpdate } from 'src/app/store/actions/user/user.actions';
import { SelectUserSession } from 'src/app/store/selectors/user/user.selectors';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  username: string;
  email: string;
  userSession$: Observable<any>;
  onDestroy$ = new Subject<void>();
  
  constructor(private _fb: FormBuilder, private _store: Store<AppState>, public modalController: ModalController) { 
    this.userSession$ = this._store.pipe(select(SelectUserSession));
    this.userSession$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      let user = state?.data?.user;
      setTimeout(() => {
        this.username = user?.username;
        this.email = user?.email;
      }, 100)
    });
  }

  async changePasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent,
    })

    await modal.present()
  }

  ngOnInit() {

  }

  updateUser() {
    this._store.dispatch(userUpdate({ data: { username: this.username } }));
  }

  updateSecurity() {
    this._store.dispatch(userUpdate({ data: { email: this.email } }));
  }

  presentChangePassword() {
    this.changePasswordModal();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
