import { AUTHENTICATION, FORGET_RESET_PASSWORD, LOGIN } from './auth';

export const COMMON_CONSTANTS = {
    I18NEXT: 'i18next',
    VN: 'vn',
    EN: 'en',
    ACCESS_TOKEN: 'access_token',
    USER_ID: 'user_id',
    USER_ROLE: 'user_role',
    USER_EMAIL: 'user_email'
};

export const REGEX = {
    // eslint-disable-next-line no-useless-escape
    EMAIL_VALIDATE: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    CONTAIN_AT_LEAST_ONE_NUMBER: /\d/,
    CONTAIN_AT_LEAST_ONE_LETTER: /[a-zA-Z]/,
    CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER: /[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/
};

export const HTTP_STATUS = {
    SUCCESS: 200,
    CREATE_SUCCESS: 201,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};

export const HTTP_RESPONSE_MESSAGE = {
	AUTHENTICATION: { ...AUTHENTICATION },
	LOGIN: { ...LOGIN },
    FORGET_RESET_PASSWORD: { ...FORGET_RESET_PASSWORD },
};