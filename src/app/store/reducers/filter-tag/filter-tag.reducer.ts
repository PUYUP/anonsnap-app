import { Action, createReducer, on } from '@ngrx/store';
import { FilterTag } from '../../actions/filter/filter.actions';


export const filterTagFeatureKey = 'filterTag';

export interface FilterTagState {
  name: string;
}

export const initialState: FilterTagState = {
  name: null,
};

export const reducer = createReducer(
  initialState,

  on(FilterTag, (state, payload) => {
    return {
      ...state,
      name: payload.name,
    }
  })
);
export function FilterTagReducer(state: FilterTagState, action: Action) {
  return reducer(state, action);
}