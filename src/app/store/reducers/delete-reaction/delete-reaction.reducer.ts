import { Action, createReducer, on } from '@ngrx/store';


export const deleteReactionFeatureKey = 'deleteReaction';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

);
