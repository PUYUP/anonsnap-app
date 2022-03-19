import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MomentService } from 'src/app/services/moment/moment.service';
import {
  addMoment, createMoment, createMomentFailure, createMomentSuccess, deleteMoment, deleteMomentFailure, deleteMomentSuccess, updateMoment, updateMomentFailure, updateMomentSuccess, loadMoments, loadMomentsFailure, loadMomentsSuccess, loadMoreMoments, refreshMoments, resetMomentStatus
} from '../../actions/moment/moment.actions';


@Injectable()
export class MomentEffects {

  constructor(
    private actions$: Actions,
    private momentService: MomentService,
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
  // CREATE
  // ...
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMoment),
      mergeMap((payload) => {
        return this.momentService.createMoment(payload?.data).pipe(
          map((response) => {
            return createMomentSuccess({
              data: response,
            });
          }),
          catchError((error) => of(createMomentFailure({ error: error })))
        );
      })
    )
  );

  createSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMomentSuccess),
      map((payload) => {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });

        return addMoment({data: {...payload.data}})
      })
    )
  );

  createFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMomentFailure),
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
  );

  // ...
  // UPDATE
  // ...
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMoment),
      mergeMap((payload) => {
        return this.momentService.updateMoment(payload?.data, payload?.guid).pipe(
          map((response) => {
            return updateMomentSuccess({
              data: response,
            });
          }),
          catchError((error) => of(updateMomentFailure({ error: error })))
        );
      })
    )
  );

  updateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMomentSuccess),
      map((payload) => {
        this.presentToast('Berhasil diperbarui');
        return resetMomentStatus()
      })
    )
  );

  // ...
  // EDIT FAILURE
  // ...
  editFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMomentFailure),
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
  );

  // ...
  // DELETE
  // ...
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMoment),
      mergeMap((payload) => {
        return this.momentService.deleteMoment(payload?.guid).pipe(
          map((response) => {
            this.presentToast('Berhasil dihapus');
            
            return deleteMomentSuccess({
              data: response,
            });
          }),
          catchError((error) => of(deleteMomentFailure({ error: error })))
        );
      })
    )
  );

  // ...
  // LOADS
  // ...
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoments),
      mergeMap((payload) => {
        return this.momentService.loadMoments(payload?.filter).pipe(
          map((response) => {
            return loadMomentsSuccess({
              data: response,
              filter: payload.filter,
            });
          }),
          catchError((error) => of(loadMomentsFailure({ error: error })))
        );
      })
    )
  );

  loadsMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreMoments),
      mergeMap((payload) => {
        return this.momentService.loadMoments(payload?.filter).pipe(
          map((response) => {
            return loadMomentsSuccess({
              data: {
                ...response,
                filter: payload.filter,
                isLoadMore: payload?.isLoadMore,
              },
            });
          }),
          catchError((error) => of(loadMomentsFailure({ error: error })))
        );
      })
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshMoments),
      mergeMap((payload) => {
        return this.momentService.loadMoments(payload?.filter).pipe(
          map((response) => {
            return loadMomentsSuccess({
              data: response,
              filter: payload.filter,
            });
          }),
          catchError((error) => of(loadMomentsFailure({ error: error })))
        );
      })
    )
  );
  
  loadsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMomentsFailure),
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
  );
      
  loadsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMomentsSuccess),
      map((payload) => {
        // console.log(payload);
      })
    ), {dispatch: false}
  );

}
