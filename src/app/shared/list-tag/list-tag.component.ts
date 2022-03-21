import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterTag } from 'src/app/store/actions/filter/filter.actions';
import { loadMoments } from 'src/app/store/actions/moment/moment.actions';
import { loadTags } from 'src/app/store/actions/tag/tag.actions';
import { SelectLoadedMoments } from 'src/app/store/selectors/moment/moment.selectors';
import { SelectLoadedTags } from 'src/app/store/selectors/tag/tag.selectors';

@Component({
  selector: 'app-list-tag',
  templateUrl: './list-tag.component.html',
  styleUrls: ['./list-tag.component.scss'],
})
export class ListTagComponent implements OnInit {

  @Input('coordinate') coordinate: any;

  filter: any;
  tags$: Observable<any>;
  loadedMoments$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(public modalController: ModalController, private _store: Store<AppState>) { 
    this.tags$ = this._store.pipe(select(SelectLoadedTags));

    this.loadedMoments$ = this._store.pipe(select(SelectLoadedMoments));
    this.loadedMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') this.filter = state?.filter;
    })
  }

  ngOnInit() { 
    this._store.dispatch(loadTags({ filter: { ...this.filter } }));
  }

  selectedTag(item: any) {
    this._store.dispatch(FilterTag({ name: item.name }));
    this._store.dispatch(loadMoments({ filter: { ...this.filter, tag: item.name } }));
    this.dismiss();
  }
  
  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
