import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import { clearUserRequestResetPassword } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-validate-verification',
  templateUrl: './validate-verification.component.html',
  styleUrls: ['./validate-verification.component.scss'],
})
export class ValidateVerificationComponent implements OnInit {

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.dispatch(clearUserRequestResetPassword());
  }

}
