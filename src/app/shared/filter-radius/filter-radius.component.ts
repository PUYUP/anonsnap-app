import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeFilterRadiusSuccess } from 'src/app/store/actions/filter-radius/filter-radius.actions';
import { AppState } from 'src/app/store/app.state';
import { SelectFilterRadius } from 'src/app/store/selectors/filter-radius/filter-radius.selectors';

@Component({
  selector: 'app-filter-radius',
  templateUrl: './filter-radius.component.html',
  styleUrls: ['./filter-radius.component.scss'],
})
export class FilterRadiusComponent implements OnInit {

  maxRadius: number = 5;
  minRadius: number = 1;
  radiusValue: number = 1;
  filterRadius$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(private _store: Store<AppState>) { 
    this.filterRadius$ = this._store.pipe(select(SelectFilterRadius));
    this.filterRadius$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.radiusValue = state?.distance;
    })
  }

  ngOnInit() { }
  
  onRadiusChange() {
    this._store.dispatch(ChangeFilterRadiusSuccess({data: {distance: this.radiusValue}}))
  }

  onDecreaseRadius() {
    this.radiusValue = this.radiusValue - 1;
  }

  onIncreaseRadius() {
    this.radiusValue = this.radiusValue + 1;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
