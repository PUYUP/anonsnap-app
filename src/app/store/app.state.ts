import { TakePictureState } from "./reducers/camera-preview/camera-preview.reducer";
import { ListCommentState } from "./reducers/list-comment/list-comment.reducer";
import { ValidateVerificationState } from "./reducers/core-validate-verification/core-validate-verification.reducer";
import { CreateCommentState } from "./reducers/create-comment/create-comment.reducer";
import { CreateMomentState } from "./reducers/create-moment/create-moment.reducer";
import { DeleteCommentState } from "./reducers/delete-comment/delete-comment.reducer";
import { DeleteMomentState } from "./reducers/delete-moment/delete-moment.reducer";
import { DeleteMyMomentState } from "./reducers/delete-my-moment/delete-my-moment.reducer";
import { FilterCalendarState } from "./reducers/filter-calendar/filter-calendar.reducer";
import { FilterMapState } from "./reducers/filter-map/filter-map.reducer";
import { FilterTagState } from "./reducers/filter-tag/filter-tag.reducer";
import { LoadMomentsState } from "./reducers/load-moment/load-moment.reducer";
import { LoadMyMomentsState } from "./reducers/load-my-moment/load-my-moment.reducer";
import { LoadTagsState } from "./reducers/load-tag/load-tag.reducer";
import { LocationGeolocationState } from "./reducers/location-geolocation/location-geolocation.reducer";
import { LocationState } from "./reducers/location/location.reducer";
import { UpdateCommentState } from "./reducers/update-comment/update-comment.reducer";
import { UpdateMomentState } from "./reducers/update-moment/update-moment.reducer";
import { UpdateMyMomentState } from "./reducers/update-my-moment/update-my-moment.reducer";
import { UserChangePasswordState } from "./reducers/user-change-password/user-change-password.reducer";
import { UserResetPasswordState } from "./reducers/user-reset-password/user-reset-password.reducer";
import { UserSessionState } from "./reducers/user-session/user-session.reducer";
import { UserSigninState } from "./reducers/user-signin/user-signin.reducer";
import { UserSignoutState } from "./reducers/user-signout/user-signout.reducer";
import { UserSignupState } from "./reducers/user-signup/user-signup.reducer";
import { UserUpdateState } from "./reducers/user-update/user-update.reducer";
import { DeleteMyCommentState } from "./reducers/delete-my-comment/delete-my-comment.reducer";
import { UpdateMyCommentState } from "./reducers/update-my-comment/update-my-comment.reducer";
import { ListMyCommentState } from "./reducers/list-my-comment/list-my-comment.reducer";
import { CreateMyCommentState } from "./reducers/create-my-comment/create-my-comment.reducer";
import { UserConfirmResetPasswordState } from "./reducers/user-reset-password-confirm/user-reset-password-confirm.reducer";

export interface AppState {
	filterMap: FilterMapState,
	filterCalendar: FilterCalendarState,
	location: LocationState,
	locationGeolocation: LocationGeolocationState,
	userSignin: UserSigninState,
	userSignup: UserSignupState,
	userSession: UserSessionState,
	userUpdate: UserUpdateState,
	userChangePassword: UserChangePasswordState,
	userRequestResetPassword: UserResetPasswordState,
	userConfirmResetPassword: UserConfirmResetPasswordState,
	userSignout: UserSignoutState,
	createMoment: CreateMomentState,
	updateMoment: UpdateMomentState,
	deleteMoment: DeleteMomentState,
	loadMoments: LoadMomentsState,
	loadMyMoments: LoadMyMomentsState,
	deleteMyMoment: DeleteMyMomentState,
	updateMyMoment: UpdateMyMomentState,
	coreValidateVerification: ValidateVerificationState,
	listComment: ListCommentState,
	listMyComment: ListMyCommentState,
	createComment: CreateCommentState,
	updateComment: UpdateCommentState,
	deleteComment: DeleteCommentState,
	createMyComment: CreateMyCommentState,
	deleteMyComment: DeleteMyCommentState,
	updateMyComment: UpdateMyCommentState,
	loadTags: LoadTagsState,
	filterTag: FilterTagState,
	takePicture: TakePictureState,
}