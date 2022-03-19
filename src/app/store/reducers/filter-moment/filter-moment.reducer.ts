import { Action, createReducer, on } from '@ngrx/store';
import { FilterMoment } from '../../actions/filter/filter.actions';


export const filterMomentFeatureKey = 'filterMoment';

export interface FilterMomentState {
  data: any;
}

export const initialState: FilterMomentState = {
  data: null,
};

export const reducer = createReducer(
  initialState,

  on(FilterMoment, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      }
    }
  })
);

export function FilterMomentReducer(state: FilterMomentState, action: Action) {
  return reducer(state, action);
}