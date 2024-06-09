import { IResetPasswordErrorMessages, IResetPasswordForm } from '../types/resetPassword';

export const defaultForgetPasswordForm: IResetPasswordForm = {
    confirmPassword: '',
    newPassword: '',
};

export const defaultForgetPasswordErrorMessage: IResetPasswordErrorMessages = {
    newPassword: {
        message: '',
        field: ''
    },
    confirmPassword: {
        message: '',
        field: ''
    },
};
