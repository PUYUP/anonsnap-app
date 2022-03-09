import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { FilterRadiusReducer } from "./reducers/filter-radius/filter-radius.reducer";

export const AppReducers: ActionReducerMap<AppState> = {
	filterRadius: FilterRadiusReducer
}