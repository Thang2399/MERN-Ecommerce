import { AUTHENTICATION, FORGET_RESET_PASSWORD, LOGIN } from './auth.js';

export const USER_ROLE = {
	ADMIN: 'admin',
	USER: 'user',
	SPONSOR: 'sponsor',
	SALESMAN: 'salesman'
};

export const USER_GENDER = {
	MALE: 'male',
	FEMALE: 'female',
	OTHER: 'other'
};

export const HTTP_STATUS = {
	SUCCESS: 200,
	CREATE_SUCCESS: 201,

	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,

	SERVER_ERROR: 500
};

export const HTTP_RESPONSE_MESSAGE = {
	AUTHENTICATION: { ...AUTHENTICATION },
	LOGIN: { ...LOGIN },
	FORGET_RESET_PASSWORD: { ...FORGET_RESET_PASSWORD },

	SERVER_ERROR: 'internal server error'
};
