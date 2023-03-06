import { IResetPasswordForm } from '../types/resetPassword';
import { defaultForgetPasswordErrorMessage } from '../form/resetPassword';
import { checkConfirmPassword, checkPassword, checkRequiredFiled } from './misc';

export const checkValidateResetPasswordForm = (formData: IResetPasswordForm) => {
    const errorMessages = { ...defaultForgetPasswordErrorMessage };

    errorMessages.otp = checkRequiredFiled(formData.otp, 'form.otp');
    errorMessages.newPassword = checkPassword(formData.newPassword, 'form.password');
    errorMessages.confirmPassword = checkConfirmPassword(formData.newPassword, formData.confirmPassword, 'form.confirm_password');

    return errorMessages;
};