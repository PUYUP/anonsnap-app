import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ReactionService } from 'src/app/services/reaction/reaction.service';
import { createReaction, createReactionFailure, createReactionSuccess, deleteReaction, deleteReactionFailure, deleteReactionSuccess } from '../../actions/reaction/reaction.actions';


@Injectable()
export class ReactionEffects {

  constructor(
    private actions$: Actions,
    private reactionService: ReactionService,
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
  // CREATE
  // ...
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createReaction),
      mergeMap((payload) => {
        return this.reactionService.createReaction(payload?.data).pipe(
          map((response) => {
            return createReactionSuccess({
              data: response,
            });
          }),
          catchError((error) => of(createReactionFailure({ error: error })))
        );
      })
    )
  );

  createSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createReactionSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

  createFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createReactionFailure),
      map((payload) => {
        let httpError = payload?.error;
        let errorDetail = httpError?.error ? httpError?.error : httpError?.body;
        let status = httpError?.status;
        let message = [];

        for (let k in errorDetail) {
          let m = Array.isArray(errorDetail[k]) ? errorDetail[k].join(' ') : errorDetail[k]
          message.push(m);
        }

        if (message?.length > 0) {
          if (status == 401) {
            this.presentToast('Masuk ke Akun untuk melanjutkan.');
          } else {
            this.presentToast(message.join(' <br /> '));
          }
        }
      })
    ), {dispatch: false}
  );

  // ...
  // DELETE
  // ...
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteReaction),
      mergeMap((payload) => {
        return this.reactionService.deleteReaction(payload?.guid).pipe(
          map((response) => {
            return deleteReactionSuccess({
              data: response,
            });
          }),
          catchError((error) => of(deleteReactionFailure({ error: error })))
        );
      })
    )
  );

}
