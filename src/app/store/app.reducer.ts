import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { CommentListReducer } from "./reducers/comment-list/comment-list.reducer";
import { ValidateVerificationReducer } from "./reducers/core-validate-verification/core-validate-verification.reducer";
import { CreateCommentReducer } from "./reducers/create-comment/create-comment.reducer";
import { CreateMomentReducer } from "./reducers/create-moment/create-moment.reducer";
import { DeleteCommentReducer } from "./reducers/delete-comment/delete-comment.reducer";
import { DeleteMomentReducer } from "./reducers/delete-moment/delete-moment.reducer";
import { FilterCalendarReducer } from "./reducers/filter-calendar/filter-calendar.reducer";
import { FilterMapRadiusReducer } from "./reducers/filter-map-radius/filter-map-radius.reducer";
import { FilterMomentReducer } from "./reducers/filter-moment/filter-moment.reducer";
import { FilterRadiusReducer } from "./reducers/filter-radius/filter-radius.reducer";
import { LoadMomentsReducer } from "./reducers/load-moment/load-moment.reducer";
import { LocationGeolocationReducer } from "./reducers/location-geolocation/location-geolocation.reducer";
import { LocationReducer } from "./reducers/location/location.reducer";
import { UpdateCommentReducer } from "./reducers/update-comment/update-comment.reducer";
import { UpdateMomentReducer } from "./reducers/update-moment/update-moment.reducer";
import { UserChangePasswordReducer } from "./reducers/user-change-password/user-change-password.reducer";
import { UserResetPasswordReducer } from "./reducers/user-reset-password/user-reset-password.reducer";
import { UserSessionReducer } from "./reducers/user-session/user-session.reducer";
import { UserSigninReducer } from "./reducers/user-signin/user-signin.reducer";
import { UserSignoutReducer } from "./reducers/user-signout/user-signout.reducer";
import { UserSignupReducer } from "./reducers/user-signup/user-signup.reducer";
import { UserUpdateReducer } from "./reducers/user-update/user-update.reducer";

export const AppReducers: ActionReducerMap<AppState> = {
	filterRadius: FilterRadiusReducer,
	filterMapRadius: FilterMapRadiusReducer,
	filterCalendar: FilterCalendarReducer,
	filterMoment: FilterMomentReducer,
	location: LocationReducer,
	locationGeolocation: LocationGeolocationReducer,
	userSignin: UserSigninReducer,
	userSignup: UserSignupReducer,
	userSession: UserSessionReducer,
	userUpdate: UserUpdateReducer,
	userChangePassword: UserChangePasswordReducer,
	userRequestResetPassword: UserResetPasswordReducer,
	userSignout: UserSignoutReducer,
	createMoment: CreateMomentReducer,
	deleteMoment: DeleteMomentReducer,
	updateMoment: UpdateMomentReducer,
	loadMoments: LoadMomentsReducer,
	coreValidateVerification: ValidateVerificationReducer,
	commentList: CommentListReducer,
	createComment: CreateCommentReducer,
	updateComment: UpdateCommentReducer,
	deleteComment: DeleteCommentReducer,
}