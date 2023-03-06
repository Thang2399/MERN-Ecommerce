import { IResetPasswordErrorMessages, IResetPasswordForm } from '../types/resetPassword';

export const defaultForgetPasswordForm: IResetPasswordForm = {
    otp: '',
    confirmPassword: '',
    newPassword: '',
};

export const defaultForgetPasswordErrorMessage: IResetPasswordErrorMessages = {
    otp: {
        message: '',
        field: ''
    },
    newPassword: {
        message: '',
        field: ''
    },
    confirmPassword: {
        message: '',
        field: ''
    },
};
