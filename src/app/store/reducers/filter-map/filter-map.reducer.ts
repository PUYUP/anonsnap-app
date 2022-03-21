import { Action, createReducer, on } from '@ngrx/store';
import { FilterMap } from '../../actions/filter/filter.actions';


export const filterMapFeatureKey = 'filterMap';

export interface FilterMapState {
  data: any;
}

export const initialState: FilterMapState = {
  data: null,
};

export const reducer = createReducer(
  initialState,

  on(FilterMap, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload.data,
      },
    }
  })
);

export function FilterMapReducer(state: FilterMapState, action: Action) {
  return reducer(state, action);
}