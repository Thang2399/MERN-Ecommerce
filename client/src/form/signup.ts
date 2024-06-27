import { defaultSignUpFormType, signUpFormErrorMessageTypes } from '../types/signup';
import dayjs from 'dayjs';

export const defaultSignUpForm: defaultSignUpFormType = {
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    dateOfBirth: dayjs().toString(),
};

export const defaultSignUpFormErrorMessages: signUpFormErrorMessageTypes = {
    userName: {
        message: '',
        field: ''
    },
    phoneNumber: {
        message: '',
        field: ''
    },
    email: {
        message: '',
        field: ''
    },
    password: {
        message: '',
        field: ''
    },
    confirmPassword: {
        message: '',
        field: ''
    },
    dateOfBirth: {
        message: '',
        field: ''
    },
};
