import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { TakePictureReducer } from "./reducers/camera-preview/camera-preview.reducer";
import { ListCommentReducer } from "./reducers/list-comment/list-comment.reducer";
import { ValidateVerificationReducer } from "./reducers/core-validate-verification/core-validate-verification.reducer";
import { CreateCommentReducer } from "./reducers/create-comment/create-comment.reducer";
import { CreateMomentReducer } from "./reducers/create-moment/create-moment.reducer";
import { DeleteCommentReducer } from "./reducers/delete-comment/delete-comment.reducer";
import { DeleteMomentReducer } from "./reducers/delete-moment/delete-moment.reducer";
import { DeleteMyMomentReducer } from "./reducers/delete-my-moment/delete-my-moment.reducer";
import { FilterCalendarReducer } from "./reducers/filter-calendar/filter-calendar.reducer";
import { FilterMapReducer } from "./reducers/filter-map/filter-map.reducer";
import { FilterTagReducer } from "./reducers/filter-tag/filter-tag.reducer";
import { LoadMomentsReducer } from "./reducers/load-moment/load-moment.reducer";
import { LoadMyMomentsReducer } from "./reducers/load-my-moment/load-my-moment.reducer";
import { LoadTagsReducer } from "./reducers/load-tag/load-tag.reducer";
import { LocationGeolocationReducer } from "./reducers/location-geolocation/location-geolocation.reducer";
import { LocationReducer } from "./reducers/location/location.reducer";
import { UpdateCommentReducer } from "./reducers/update-comment/update-comment.reducer";
import { UpdateMomentReducer } from "./reducers/update-moment/update-moment.reducer";
import { UpdateMyMomentReducer } from "./reducers/update-my-moment/update-my-moment.reducer";
import { UserChangePasswordReducer } from "./reducers/user-change-password/user-change-password.reducer";
import { UserResetPasswordReducer } from "./reducers/user-reset-password/user-reset-password.reducer";
import { UserSessionReducer } from "./reducers/user-session/user-session.reducer";
import { UserSigninReducer } from "./reducers/user-signin/user-signin.reducer";
import { UserSignoutReducer } from "./reducers/user-signout/user-signout.reducer";
import { UserSignupReducer } from "./reducers/user-signup/user-signup.reducer";
import { UserUpdateReducer } from "./reducers/user-update/user-update.reducer";
import { DeleteMyCommentReducer } from "./reducers/delete-my-comment/delete-my-comment.reducer";
import { UpdateMyCommentReducer } from "./reducers/update-my-comment/update-my-comment.reducer";
import { ListMyCommentReducer } from "./reducers/list-my-comment/list-my-comment.reducer";
import { CreateMyCommentReducer } from "./reducers/create-my-comment/create-my-comment.reducer";

export const AppReducers: ActionReducerMap<AppState> = {
	filterMap: FilterMapReducer,
	filterCalendar: FilterCalendarReducer,
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
	loadMyMoments: LoadMyMomentsReducer,
	deleteMyMoment: DeleteMyMomentReducer,
	updateMyMoment: UpdateMyMomentReducer,
	coreValidateVerification: ValidateVerificationReducer,
	listComment: ListCommentReducer,
	listMyComment: ListMyCommentReducer,
	createComment: CreateCommentReducer,
	updateComment: UpdateCommentReducer,
	deleteComment: DeleteCommentReducer,
	createMyComment: CreateMyCommentReducer,
	deleteMyComment: DeleteMyCommentReducer,
	updateMyComment: UpdateMyCommentReducer,
	loadTags: LoadTagsReducer,
	filterTag: FilterTagReducer,
	takePicture: TakePictureReducer,
}