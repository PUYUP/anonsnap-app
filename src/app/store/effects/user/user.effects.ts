import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/app';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { loadUserSession, loadUserSessionSuccess, userChangePassword, userChangePasswordFailure, userChangePasswordSuccess, userRequestResetPassword, userRequestResetPasswordFailure, userRequestResetPasswordSuccess, userSignin, userSigninFailure, userSigninSuccess, userSignout, userSignoutSuccess, userUpdate, userUpdateFailure, userUpdateSuccess } from '../../actions/user/user.actions';
import { userSignup, userSignupFailure, userSignupSuccess } from '../../actions/user/user.actions';


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router,
    public toastController: ToastController
  ) { }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    await toast.present()
  }

  // ...
  // SIGNIN
  // ...
  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignin),
      mergeMap((payload) => {
        return this.userService.signin(payload).pipe(
          map((response) => {
            this.userService.storeUserSession(response);
            this.store.dispatch(loadUserSession());

            return userSigninSuccess({
              data: response,
            });
          }),
          catchError((error) => of(userSigninFailure({ error: error })))
        );
      })
    )
  );

  signinSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSigninSuccess),
      tap((payload) => {
        this.presentToast('Berhasil login');
        this.router.navigate(['/tabs/explore'], { replaceUrl: true });
      })
    ), {dispatch: false}
  );

  signinFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSigninFailure),
      tap((payload) => {
        let httpError = payload?.error;
        let errorDetail = httpError?.error ? httpError?.error : httpError?.body;

        if (errorDetail) this.presentToast(errorDetail?.detail);
      })
    ), {dispatch: false}
  );

  // ...
  // SIGNUP
  // ...
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignup),
      mergeMap((payload) => {
        return this.userService.signup(payload).pipe(
          map((response) => {
            this.store.dispatch(userSignin({ username: payload.username, password: payload.password }));

            return userSignupSuccess({
              data: response,
            });
          }),
          catchError((error) => of(userSignupFailure({ error: error })))
        );
      })
    )
  );

  signupFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignupFailure),
      tap((payload) => {
        let httpError = payload?.error;
        let errorDetail = httpError?.error ? httpError?.error : httpError?.body;
        let message = [];

        for (let k in errorDetail) {
          let m = Array.isArray(errorDetail[k]) ? errorDetail[k].join(' ') : errorDetail[k]
          message.push(m);
        }

        if (message?.length > 0) {
          this.presentToast(message.join(' <br /> '))
        }
      })
    ), {dispatch: false}
  );

  // ...
  // SESSION
  // ...
  session$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserSession),
      map((payload) => {
        let ses = this.userService.getUserSession;
        return loadUserSessionSuccess({data: ses});
      })
    )
  );

  // ...
  // UPDATE USER
  // ...
  userUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userUpdate),
      mergeMap((payload) => {
        return this.userService.userUpdate(payload?.data).pipe(
          map((response) => {
            this.userService.updateUserData(response);
            
            return userUpdateSuccess({
              data: response,
            });
          }),
          catchError((error) => of(userUpdateFailure({ error: error })))
        );
      })
    )
  );

  userUpdateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userUpdateSuccess),
      tap((payload) => {
        this.store.dispatch(loadUserSession());
        this.presentToast('Berhasil diupdate')
      })
    ), {dispatch: false}
  );

  userUpdateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userUpdateFailure),
      tap((payload) => {
        let httpError = payload?.error;
        let errorDetail = httpError?.error ? httpError?.error : httpError?.body;
        let message = [];

        for (let k in errorDetail) {
          let m = Array.isArray(errorDetail[k]) ? errorDetail[k].join(' ') : errorDetail[k]
          message.push(m);
        }

        if (message?.length > 0) {
          this.presentToast(message.join(' <br /> '))
        }
      })
    ), {dispatch: false}
  );

  // ...
  // CHANGE PASSWORD
  // ...
  userChangePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userChangePassword),
      mergeMap((payload) => {
        return this.userService.changePassword(payload?.data).pipe(
          map((response) => {
            return userChangePasswordSuccess({
              data: {
                ...response,
                retype_password: payload?.data?.retype_password,
              },
            });
          }),
          catchError((error) => of(userChangePasswordFailure({ error: error })))
        );
      })
    )
  );

  userChangePasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userChangePasswordSuccess),
      tap((payload) => {
        let ses = this.userService.getUserSession;
        let username = ses?.user?.username;

        this.store.dispatch(userSignin({username: username, password: payload?.data?.retype_password}))
        this.presentToast('Penggantian password berhasil')
      })
    ), {dispatch: false}
  );

  userChangePasswordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userChangePasswordFailure),
      tap((payload) => {
        let httpError = payload?.error;
        let errorDetail = httpError?.error ? httpError?.error : httpError?.body;
        let message = [];

        for (let k in errorDetail) {
          let m = Array.isArray(errorDetail[k]) ? errorDetail[k].join(' ') : errorDetail[k]
          message.push(m);
        }

        if (message?.length > 0) {
          this.presentToast(message.join(' <br /> '))
        }
      })
    ), {dispatch: false}
  );


  // ...
  // LOST PASSWORD
  // ...
  userRequestResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestResetPassword),
      mergeMap((payload) => {
        return this.userService.lostPassword(payload?.data).pipe(
          map((response) => {
            return userRequestResetPasswordSuccess({
              data: {
                ...response,
                retype_password: payload?.data?.retype_password,
              },
            });
          }),
          catchError((error) => of(userRequestResetPasswordFailure({ error: error })))
        );
      })
    )
  );

  userRequestResetPasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestResetPasswordSuccess),
      tap((payload) => {
        let ses = this.userService.getUserSession;
        this.presentToast('Perika kotak masuk email Anda')
      })
    ), {dispatch: false}
  );

  userRequestResetPasswordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestResetPasswordFailure),
      tap((payload) => {
        let httpError = payload?.error;
        let errorDetail = httpError?.error ? httpError?.error : httpError?.body;
        let message = [];

        for (let k in errorDetail) {
          let m = Array.isArray(errorDetail[k]) ? errorDetail[k].join(' ') : errorDetail[k]
          message.push(m);
        }

        if (message?.length > 0) {
          this.presentToast(message.join(' <br /> '))
        }
      })
    ), {dispatch: false}
  );


  // ...
  // SIGNOUT
  // ...
  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignout),
      map((payload) => {
        this.userService.signout();
        return userSignoutSuccess();
      })
    )
  );

  signoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignoutSuccess),
      tap((payload) => {
        this.router.navigate(['/tabs/explore'], {replaceUrl: true})
      })
    ), {dispatch: false}
  );

}
