import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { VerificationEffects } from './verification.effects';

describe('VerificationEffects', () => {
  let actions$: Observable<any>;
  let effects: VerificationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VerificationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(VerificationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
