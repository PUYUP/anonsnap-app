import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { deleteComment, loadComments, loadMoreComments } from 'src/app/store/actions/comment/comment.actions';
import { SelectCreatedComment, SelectLoadedComments } from 'src/app/store/selectors/comment/comment.selectors';
import { CommentEditorComponent } from '../comment-editor/comment-editor.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {

  @Input('momentItem') momentItem: any;

  filter: any;
  loadedComments$: Observable<any>;
  commentCreated$: Observable<any>;
  onDestroy$ = new Subject<void>();
  nextUrl: string;
  loadMoreEvent: any;

  constructor(
    private _store: Store<AppState>,
    private _ref: ChangeDetectorRef,
    public modalController: ModalController
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
    })
  }

  async commentEditorModal(item: any = {}) {
    const modal = await this.modalController.create({
      component: CommentEditorComponent,
      componentProps: {
        momentItem: this.momentItem,
        commentItem: item,
      },
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5
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

  deleteComment(item: any) {
    this._store.dispatch(deleteComment({ guid: item.guid }));
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
