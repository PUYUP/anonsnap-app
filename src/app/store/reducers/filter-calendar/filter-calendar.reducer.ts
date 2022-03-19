import { Action, createReducer, on } from '@ngrx/store';
import { FilterCalendar } from '../../actions/filter/filter.actions';


export const filterCalendarFeatureKey = 'filterCalendar';

export interface FilterCalendarState {
  data: any;
}

export const initialState: FilterCalendarState = {
  data: null,
};

export const reducer = createReducer(
  initialState,

  on(FilterCalendar, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      }
    }
  })
);

export function FilterCalendarReducer(state: FilterCalendarState, action: Action) {
  return reducer(state, action);
}