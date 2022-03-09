import { Action, createReducer, on } from '@ngrx/store';
import { ChangeFilterRadius, ChangeFilterRadiusSuccess } from '../../actions/filter-radius/filter-radius.actions';


export const filterRadiusFeatureKey = 'filterRadius';

export interface FilterRadiusState {
  distance: number;
}

export const initialState: FilterRadiusState = {
  distance: 1,
};

export const reducer = createReducer(
  initialState,

  on(ChangeFilterRadius, (state) => {
    return {
      ...state,
      data: {
        distance: state.distance,
      }
    }
  }),
  on(ChangeFilterRadiusSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        distance: state.distance,
        ...payload.data
      }
    }
  })
);

export function FilterRadiusReducer(state: FilterRadiusState, action: Action) {
  return reducer(state, action);
}