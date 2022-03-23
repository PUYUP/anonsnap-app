import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createComment, createMyComment, updateComment, updateMyComment } from 'src/app/store/actions/comment/comment.actions';
import { SelectCreatedComment, SelectCreatedMyComment, SelectUpdatedComment, SelectUpdatedMyComment } from 'src/app/store/selectors/comment/comment.selectors';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
})
export class CommentEditorComponent implements OnInit {

  @ViewChild('myForm') ngForm: NgForm;
  
  @Input('momentItem') momentItem: any;
  @Input('commentItem') commentItem: any;
  @Input('source') source: any;

  formGroup: any = FormGroup;
  createdComment$: Observable<any>;
  createdMyComment$: Observable<any>;
  updatedComment$: Observable<any>;
  updatedMyComment$: Observable<any>;
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

    this.createdMyComment$ = this._store.pipe(select(SelectCreatedMyComment));
    this.createdMyComment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
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

    this.updatedMyComment$ = this._store.pipe(select(SelectUpdatedMyComment));
    this.updatedMyComment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
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
      if (this.source == 'account') {
        this._store.dispatch(updateMyComment({
          data: { ...this.formGroup.value },
          guid: this.commentItem.guid
        }));

      } else {

        this._store.dispatch(updateComment({
          data: { ...this.formGroup.value },
          guid: this.commentItem.guid
        }));
      }

    } else {
      // create
      if (this.source == 'account') {
        this._store.dispatch(createMyComment({
          data: {
            ...this.formGroup.value,
            content_type: 'moment',
            object_id: this.momentItem?.guid
          }
        }))

      } else {

        this._store.dispatch(createComment({
          data: {
            ...this.formGroup.value,
            content_type: 'moment',
            object_id: this.momentItem?.guid
          }
        }))
      }
    }
  }

  send() {
    this.ngForm.ngSubmit.emit();
  }

  dismiss() {
    this.modalController.dismiss()
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
