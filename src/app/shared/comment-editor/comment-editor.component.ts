import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@capacitor/app';
import { ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createComment, updateComment } from 'src/app/store/actions/comment/comment.actions';
import { SelectCreatedComment, SelectUpdatedComment } from 'src/app/store/selectors/comment/comment.selectors';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
})
export class CommentEditorComponent implements OnInit {

  @Input('momentItem') momentItem: any;
  @Input('commentItem') commentItem: any;

  formGroup: any = FormGroup;
  createdComment$: Observable<any>;
  updatedComment$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    public modalController: ModalController,
  ) { 
    this.createdComment$ = this._store.pipe(select(SelectCreatedComment));
    this.createdComment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.dismiss()
      }
    });

    this.updatedComment$ = this._store.pipe(select(SelectUpdatedComment));
    this.updatedComment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.dismiss()
      }
    });
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      comment_content: ['', [Validators.required]]
    })

    if (this.commentItem) {
      this.formGroup.patchValue({
        comment_content: this.commentItem.comment_content,
      })
    }
  }

  onFormSubmit() {
    if (this.commentItem && this.commentItem?.guid) {
      // update
      this._store.dispatch(updateComment({
        data: { ...this.formGroup.value },
        guid: this.commentItem.guid
      }));

    } else {
      // create
      this._store.dispatch(createComment({
        data: {
          ...this.formGroup.value,
          content_type: 'moment',
          object_id: this.momentItem?.guid
        }
      }))
    }
  }

  dismiss() {
    this.modalController.dismiss()
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
