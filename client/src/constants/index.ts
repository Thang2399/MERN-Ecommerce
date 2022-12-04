export const COMMON_CONSTANTS = {
    I18NEXT: 'i18next',
    VN: 'vn',
    EN: 'en'
};

export const REGEX = {
    // eslint-disable-next-line no-useless-escape
    EMAIL_VALIDATE: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const HTTP_STATUS = {
    SUCCESS: 200,
    CREATE_SUCCESS: 201,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};