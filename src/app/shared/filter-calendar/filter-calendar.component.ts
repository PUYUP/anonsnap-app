import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from '@capacitor/app';
import { CalendarOptions } from '@fullcalendar/angular';
import allLocales from '@fullcalendar/core/locales-all';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterCalendar } from 'src/app/store/actions/filter/filter.actions';
import { loadMoments } from 'src/app/store/actions/moment/moment.actions';
import { SelectLoadedMoments } from 'src/app/store/selectors/moment/moment.selectors';

import * as momentjs from 'moment';
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
  showCalendar: boolean = false;
  calendarOptions: CalendarOptions;
  loadMoments$: Observable<any>;
  onDestroy$ = new Subject<void>();
  
  constructor(private _store: Store<AppState>, public modalController: ModalController) { 
    this.loadMoments$ = this._store.pipe(select(SelectLoadedMoments));
    this.loadMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.filter = state?.filter;
    })
  }

  ngOnInit() { 
    setTimeout(() => {
      this.showCalendar = true;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        selectable: true,
        locales: allLocales,
        locale: 'id',
        initialDate: this.filter?.fromdate,
        dayCellDidMount: this.handleDayRender.bind(this),
        select: this.handleSelect.bind(this),
      };
    }, 250)
  }

  handleDayRender(arg: any) {
    //if (arg.el.getAttribute('data-date') == this.filter?.fromdate) {
    //  arg.el.classList.add('bg-warning');
    //}
    
    const start = new Date(momentjs(this.filter?.fromdate).format());
    const end = new Date(momentjs(this.filter?.todate).subtract(1, 'day').format());

    let loop = new Date(start);
    while (loop <= end) {
      let dateStr = momentjs(loop).format('YYYY-MM-DD');
      if (dateStr == arg.el.getAttribute('data-date')) {
        arg.el.classList.add('bg-warning');
      }
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
  }

  handleSelect(arg: any) {
    this.fromdate = arg.startStr;
    this.todate = arg.endStr;

    this._store.dispatch(FilterCalendar({ data: { fromdate: this.fromdate, todate: this.todate } }));
    this._store.dispatch(loadMoments({ filter: { ...this.filter, fromdate: this.fromdate, todate: this.todate } }));
    
    this.dismiss();
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
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
