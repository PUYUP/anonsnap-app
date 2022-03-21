import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MomentService } from 'src/app/services/moment/moment.service';
import { loadTags, loadTagsFailure, loadTagsSuccess } from '../../actions/tag/tag.actions';


@Injectable()
export class TagEffects {

  constructor(private actions$: Actions, private momentService: MomentService) { }
  
  // ...
  // LOADS
  // ...
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTags),
      mergeMap((payload) => {
        return this.momentService.loadTags(payload?.filter).pipe(
          map((response) => {
            return loadTagsSuccess({
              data: response,
              filter: payload.filter,
            });
          }),
          catchError((error) => of(loadTagsFailure({ error: error })))
        );
      })
    )
  );

}
