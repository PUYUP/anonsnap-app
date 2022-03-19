import { CommentListState } from "./reducers/comment-list/comment-list.reducer";
import { ValidateVerificationState } from "./reducers/core-validate-verification/core-validate-verification.reducer";
import { CreateCommentState } from "./reducers/create-comment/create-comment.reducer";
import { CreateMomentState } from "./reducers/create-moment/create-moment.reducer";
import { DeleteCommentState } from "./reducers/delete-comment/delete-comment.reducer";
import { DeleteMomentState } from "./reducers/delete-moment/delete-moment.reducer";
import { FilterCalendarState } from "./reducers/filter-calendar/filter-calendar.reducer";
import { FilterMapRadiusState } from "./reducers/filter-map-radius/filter-map-radius.reducer";
import { FilterMomentState } from "./reducers/filter-moment/filter-moment.reducer";
import { FilterRadiusState } from "./reducers/filter-radius/filter-radius.reducer";
import { LoadMomentsState } from "./reducers/load-moment/load-moment.reducer";
import { LocationGeolocationState } from "./reducers/location-geolocation/location-geolocation.reducer";
import { LocationState } from "./reducers/location/location.reducer";
import { UpdateCommentState } from "./reducers/update-comment/update-comment.reducer";
import { UpdateMomentState } from "./reducers/update-moment/update-moment.reducer";
import { UserChangePasswordState } from "./reducers/user-change-password/user-change-password.reducer";
import { UserResetPasswordState } from "./reducers/user-reset-password/user-reset-password.reducer";
import { UserSessionState } from "./reducers/user-session/user-session.reducer";
import { UserSigninState } from "./reducers/user-signin/user-signin.reducer";
import { UserSignoutState } from "./reducers/user-signout/user-signout.reducer";
import { UserSignupState } from "./reducers/user-signup/user-signup.reducer";
import { UserUpdateState } from "./reducers/user-update/user-update.reducer";

export interface AppState {
	filterRadius: FilterRadiusState,
	filterMapRadius: FilterMapRadiusState,
	filterCalendar: FilterCalendarState,
	filterMoment: FilterMomentState,
	location: LocationState,
	locationGeolocation: LocationGeolocationState,
	userSignin: UserSigninState,
	userSignup: UserSignupState,
	userSession: UserSessionState,
	userUpdate: UserUpdateState,
	userChangePassword: UserChangePasswordState,
	userRequestResetPassword: UserResetPasswordState,
	userSignout: UserSignoutState,
	createMoment: CreateMomentState,
	updateMoment: UpdateMomentState,
	deleteMoment: DeleteMomentState,
	loadMoments: LoadMomentsState,
	coreValidateVerification: ValidateVerificationState,
	commentList: CommentListState,
	createComment: CreateCommentState,
	updateComment: UpdateCommentState,
	deleteComment: DeleteCommentState,
}