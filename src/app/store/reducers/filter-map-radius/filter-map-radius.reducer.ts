import { Action, createReducer, on } from '@ngrx/store';
import { FilterMapRadius, FilterMapRadiusSuccess } from '../../actions/filter/filter.actions';


export const filterMapRadiusFeatureKey = 'filterMapRadius';

export interface FilterMapRadiusState {
  data: any;
  error: any;
}

export const initialState: FilterMapRadiusState = {
  data: null,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(FilterMapRadius, (state, payload) => {
    return {
      ...state,
      data: null,
      error: null,
    }
  }),
  on(FilterMapRadiusSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
    }
  }),
);

export function FilterMapRadiusReducer(state: FilterMapRadiusState, action: Action) {
  return reducer(state, action);
}