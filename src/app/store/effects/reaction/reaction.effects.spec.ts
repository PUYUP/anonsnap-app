import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ReactionEffects } from './reaction.effects';

describe('ReactionEffects', () => {
  let actions$: Observable<any>;
  let effects: ReactionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReactionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ReactionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
