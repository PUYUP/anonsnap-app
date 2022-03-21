import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FilterMapEffects } from './filter.effects';

describe('FilterMapEffects', () => {
  let actions$: Observable<any>;
  let effects: FilterMapEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterMapEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FilterMapEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
