import { environment } from "src/environments/environment";

const API_BASE = environment.apihost + '/api/';

export const location = API_BASE + 'snap/v1/locations/';
export const moment = API_BASE + 'snap/v1/moments/';
export const attachment = API_BASE + 'snap/v1/attachments/';
export const withs = API_BASE + 'snap/v1/withs/';
export const tags = API_BASE + 'snap/v1/tags/';
export const comment = API_BASE + 'snap/v1/comments/';

export const userToken = API_BASE + 'user/v1/token/';
export const userRequestResetPassword = API_BASE + 'user/v1/reset-password/';
export const user = API_BASE + 'user/v1/users/';

export const verification = API_BASE + 'core/v1/verifications/';