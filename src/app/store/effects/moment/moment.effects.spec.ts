import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MomentEffects } from './moment.effects';

describe('MomentEffects', () => {
  let actions$: Observable<any>;
  let effects: MomentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MomentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MomentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
