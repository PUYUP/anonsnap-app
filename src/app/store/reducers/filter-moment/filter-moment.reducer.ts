import { Action, createReducer, on } from '@ngrx/store';
import { filterMoments, filterMomentsSuccess } from '../../actions/moment/moment.actions';

export const filterMomentsFeatureKey = 'filterMoment';

export interface FilterMomentsState {
  data: any;
}

export const initialState: FilterMomentsState = {
  data: null,
};

export const reducer = createReducer(
  initialState,

  on(filterMoments, (state, payload) => {
    return {
      ...state,
    }
  }),
  on(filterMomentsSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
    }
  })
);

export function FilterMomentsReducer(state: FilterMomentsState, action: Action) {
  return reducer(state, action);
}