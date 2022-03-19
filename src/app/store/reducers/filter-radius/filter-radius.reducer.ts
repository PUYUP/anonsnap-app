import { Action, createReducer, on } from '@ngrx/store';
import { FilterRadius, FilterRadiusSuccess } from '../../actions/filter/filter.actions';


export const filterRadiusFeatureKey = 'filterRadius';

export interface FilterRadiusState {
  radius: number;
}

export const initialState: FilterRadiusState = {
  radius: 0.25,
};

export const reducer = createReducer(
  initialState,

  on(FilterRadius, (state) => {
    return {
      ...state,
      data: {
        radius: state.radius,
      }
    }
  }),
  on(FilterRadiusSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        radius: state.radius,
        ...payload.data
      }
    }
  })
);

export function FilterRadiusReducer(state: FilterRadiusState, action: Action) {
  return reducer(state, action);
}