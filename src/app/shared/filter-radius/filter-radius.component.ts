import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterRadiusSuccess } from 'src/app/store/actions/filter/filter.actions';
import { AppState } from 'src/app/store/app.state';
import { SelectFilterRadius } from 'src/app/store/selectors/filter/filter.selectors';

@Component({
  selector: 'app-filter-radius',
  templateUrl: './filter-radius.component.html',
  styleUrls: ['./filter-radius.component.scss'],
})
export class FilterRadiusComponent implements OnInit {

  @Input() coordinate: any;

  maxRadius: number = 5;
  minRadius: number = 1;
  radiusValue: number = 0.25;
  step: number = 0.25;
  filterRadius$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(private _store: Store<AppState>) { 
    this.filterRadius$ = this._store.pipe(select(SelectFilterRadius));
    this.filterRadius$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      console.log(state);
      this.radiusValue = state?.radius;
    })
  }

  ngOnInit() { 
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
