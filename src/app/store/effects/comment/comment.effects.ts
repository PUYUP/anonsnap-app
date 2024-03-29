import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CommentService } from 'src/app/services/comment/comment.service';
import { createComment, createCommentFailure, createCommentSuccess, deleteComment, deleteCommentFailure, deleteCommentSuccess, loadComments, loadCommentsFailure, loadCommentsSuccess, loadMoreComments, resetCommentStatus, updateComment, updateCommentFailure, updateCommentSuccess } from '../../actions/comment/comment.actions';


@Injectable()
export class CommentEffects {

  constructor(
    private actions$: Actions,
    private commentService: CommentService,
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
      ofType(createComment),
      mergeMap((payload) => {
        return this.commentService.createComment(payload?.data).pipe(
          map((response) => {
            return createCommentSuccess({
              data: response,
            });
          }),
          catchError((error) => of(createCommentFailure({ error: error })))
        );
      })
    )
  );

  createSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCommentSuccess),
      map((payload) => {
        this.presentToast('Komentar terkirim');
        return resetCommentStatus();
      })
    )
  );

  // ...
  // UPDATE
  // ...
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateComment),
      mergeMap((payload) => {
        return this.commentService.updateComment(payload?.data, payload?.guid).pipe(
          map((response) => {
            return updateCommentSuccess({
              data: response,
            });
          }),
          catchError((error) => of(updateCommentFailure({ error: error })))
        );
      })
    )
  );

  updateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommentSuccess),
      map((payload) => {
        this.presentToast('Berhasil diperbarui');
        return resetCommentStatus()
      })
    )
  );

  // ...
  // LOADS
  // ...
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadComments),
      mergeMap((payload) => {
        return this.commentService.loadComments(payload?.filter).pipe(
          map((response) => {
            return loadCommentsSuccess({
              data: response,
              filter: payload.filter,
            });
          }),
          catchError((error) => of(loadCommentsFailure({ error: error })))
        );
      })
    )
  );

  loadsMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreComments),
      mergeMap((payload) => {
        return this.commentService.loadComments(payload?.filter).pipe(
          map((response) => {
            return loadCommentsSuccess({
              data: {
                ...response,
                filter: payload.filter,
                isLoadMore: payload?.isLoadMore,
              },
            });
          }),
          catchError((error) => of(loadCommentsFailure({ error: error })))
        );
      })
    )
  );
  
  loadsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCommentsFailure),
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
      ofType(loadCommentsSuccess),
      map((payload) => {
        // console.log(payload);
      })
    ), {dispatch: false}
  );

  // ...
  // DELETE
  // ...
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteComment),
      mergeMap((payload) => {
        return this.commentService.deleteComment(payload?.guid).pipe(
          map((response) => {
            this.presentToast('Berhasil dihapus');
            
            return deleteCommentSuccess({
              data: response,
            });
          }),
          catchError((error) => of(deleteCommentFailure({ error: error })))
        );
      })
    )
  );

}
