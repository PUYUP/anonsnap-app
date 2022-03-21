import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { AlertController, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { deleteComment, loadComments, loadMoreComments } from 'src/app/store/actions/comment/comment.actions';
import { SelectCreatedComment, SelectDeletedComment, SelectLoadedComments } from 'src/app/store/selectors/comment/comment.selectors';
import { CommentEditorComponent } from '../comment-editor/comment-editor.component';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss'],
})
export class ListCommentComponent implements OnInit {

  @Input() momentItem: any;
  @Input() source: string;

  filter: any;
  loadedComments$: Observable<any>;
  commentCreated$: Observable<any>;
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
    this.loadedComments$ = this._store.pipe(select(SelectLoadedComments));
    this.loadedComments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.filter = state?.filter;
      this.nextUrl = state?.data?.next;

      if (this.nextUrl && this.loadMoreEvent) this.loadMoreEvent.target.complete();
    });

    this.commentCreated$ = this._store.pipe(select(SelectCreatedComment));
    this.commentCreated$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded' && this.momentItem) {
        this.momentItem = {
          ...this.momentItem,
          comment_count: this.momentItem?.comment_count + 1
        }
      }
    });

    this.commentDeleted$ = this._store.pipe(select(SelectDeletedComment));
    this.commentDeleted$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded' && this.momentItem) {
        this.momentItem = {
          ...this.momentItem,
          comment_count: this.momentItem?.comment_count - 1
        }

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
            this._store.dispatch(deleteComment({ guid: item.guid }));
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
        momentItem: this.momentItem,
        commentItem: item,
        source: this.source,
      },
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
    })
    
    await modal.present()
  }

  ngOnInit() {
    this._store.dispatch(loadComments({
      filter: {
        content_type: 'moment',
        object_id: this.momentItem?.guid,
      }
    }));
  }

  loadMoreData(event: any) {
    this.loadMoreEvent = event;
    this._store.dispatch(loadMoreComments({
      filter: { ...this.filter, next: this.nextUrl },
      isLoadMore: true
    }));
  }

  presentCommentEditor(item: any = {}) {
    this.commentEditorModal(item);
  }

  async deleteComment(item: any) {
    await this.presentDeleteAlert(item);
    // this._store.dispatch(deleteComment({ guid: item.guid }));
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
