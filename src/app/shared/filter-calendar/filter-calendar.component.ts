import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterCalendar } from 'src/app/store/actions/filter/filter.actions';
import { loadMoments } from 'src/app/store/actions/moment/moment.actions';
import { SelectLoadedMoments } from 'src/app/store/selectors/moment/moment.selectors';

import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-filter-calendar',
  templateUrl: './filter-calendar.component.html',
  styleUrls: ['./filter-calendar.component.scss'],
})
export class FilterCalendarComponent implements OnInit {

  filter: any;
  fromdate: any;
  todate: any;
  loadMoments$: Observable<any>;
  onDestroy$ = new Subject<void>();
  
  constructor(private _store: Store<AppState>, public modalController: ModalController) { 
    this.loadMoments$ = this._store.pipe(select(SelectLoadedMoments));
    this.loadMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.filter) {
        this.filter = state?.filter;
        this.fromdate = this.filter?.fromdate;
      }
    })
  }

  ngOnInit() { 
    
  } 

  calendarChange(event: any) {
    this.fromdate = event?.detail?.value ? this.formatDate(event?.detail?.value) : null;

    if (this.formatDate) {
      this._store.dispatch(FilterCalendar({ data: { fromdate: this.fromdate, todate: this.todate } }));
      this._store.dispatch(loadMoments({ filter: { ...this.filter, fromdate: this.fromdate, todate: this.todate } }));
    }

    this.dismiss();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'yyyy-MM-dd');
  }

  dismiss() {
    this.modalController.getTop().then((m: any) => {
      if (m) this.modalController.dismiss();
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
