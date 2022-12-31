import { defaultLoginFormTypes, loginFormErrorMessagesTypes } from '../types/login';

export const defaultLoginForm: defaultLoginFormTypes = {
    email: '',
    password: '',
    remember: true,
};

export const defaultLoginFormErrorMessages: loginFormErrorMessagesTypes = {
    email: {
        message: '',
        field: ''
    },
    password: {
        message: '',
        field: ''
    },
};