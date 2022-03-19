import { Component } from '@angular/core';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormSignupComponent } from '../shared/form-signup/form-signup.component';
import { loadUserSession, userSignout } from '../store/actions/user/user.actions';
import { SelectUserSession, SelectUserSignin } from '../store/selectors/user/user.selectors';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  userSession$: Observable<any>;

  constructor(public modalController: ModalController, private _store: Store<AppState>) { 
    this._store.dispatch(loadUserSession())
    this.userSession$ = this._store.pipe(select(SelectUserSession));
  }
  
  async signupModal() {
    const modal = await this.modalController.create({
      component: FormSignupComponent,
    });

    await modal.present();
  }

  presentSignupModal() {
    this.signupModal();
  }

  signout() {
    this._store.dispatch(userSignout());
  }

}
