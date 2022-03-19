import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FilterRadiusEffects } from './filter.effects';

describe('FilterRadiusEffects', () => {
  let actions$: Observable<any>;
  let effects: FilterRadiusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterRadiusEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FilterRadiusEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
