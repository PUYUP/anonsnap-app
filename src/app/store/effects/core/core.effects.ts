import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CoreService } from 'src/app/services/core/core.service';
import { validateVerification, validateVerificationFailure, validateVerificationSuccess } from '../../actions/core/core.actions';

@Injectable()
export class CoreEffects {

  constructor(private actions$: Actions, private coreService: CoreService, public toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    await toast.present()
  }
  
  validateVerification$ = createEffect(() => 
    this.actions$.pipe(
      ofType(validateVerification),
      mergeMap((payload) => {
        return this.coreService.validateVerification(payload?.data, payload?.passcode).pipe(
          map((response) => {
            return validateVerificationSuccess({
              data: response,
            });
          }),
          catchError((error) => of(validateVerificationFailure({ error: error })))
        );
      })
    )
  )

  validateVerificationSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(validateVerificationSuccess),
      map((payload) => {
        
      })
    ), {dispatch: false}
  )

  validateVerificationFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(validateVerificationFailure),
      map((payload) => {
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
  )

}
