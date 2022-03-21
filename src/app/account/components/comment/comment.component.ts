import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { AlertController, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { deleteMyComment, loadMyComments, loadMoreMyComments } from 'src/app/store/actions/comment/comment.actions';
import { SelectDeletedMyComment, SelectLoadedMyComments } from 'src/app/store/selectors/comment/comment.selectors';
import { CommentEditorComponent } from 'src/app/shared/comment-editor/comment-editor.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  filter: any;
  loadedComments$: Observable<any>;
  commentDeleted$: Observable<any>;
  onDestroy$ = new Subject<void>();
  nextUrl: string;
  loadMoreEvent: any;

  constructor(
    private _store: Store<AppState>,
    private _ref: ChangeDetectorRef,
    public modalController: ModalController,
    public alertController: AlertController,
  ) { 
    this.loadedComments$ = this._store.pipe(select(SelectLoadedMyComments));
    this.loadedComments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.filter = state?.filter;
      this.nextUrl = state?.data?.next;

      if (this.nextUrl && this.loadMoreEvent) this.loadMoreEvent.target.complete();
    });

    this.commentDeleted$ = this._store.pipe(select(SelectDeletedMyComment));
    this.commentDeleted$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        // detech change
        this._ref.detach();

        setInterval(() => {
          this._ref.detectChanges();
        }, 100);
      }
    });
  }

  async presentDeleteAlert(item: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Konten ini akan dihapus permanen.',
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            this._store.dispatch(deleteMyComment({ guid: item.guid }));
          }
        }, {
          text: 'Batal',
          role: 'cancel',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async commentEditorModal(item: any = {}) {
    const modal = await this.modalController.create({
      component: CommentEditorComponent,
      componentProps: {
        commentItem: item,
        source: 'account',
      },
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
    })
    
    await modal.present()
  }

  ngOnInit() {
    this._store.dispatch(loadMyComments({
      filter: {
        byme: 1,
      }
    }));
  }

  loadMoreData(event: any) {
    this.loadMoreEvent = event;
    this._store.dispatch(loadMoreMyComments({
      filter: { ...this.filter, next: this.nextUrl },
      isLoadMore: true
    }));
  }

  presentCommentEditor(item: any = {}) {
    this.commentEditorModal(item);
  }

  async deleteComment(item: any) {
    await this.presentDeleteAlert(item);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
