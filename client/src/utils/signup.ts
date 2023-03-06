import { checkConfirmPassword, checkEmailAddress, checkPassword, checkRequiredFiled } from './misc';
import { defaultSignUpFormType } from '../types/signup';

export const checkValidateSignUpForm = (form: defaultSignUpFormType) => {
    const formData = form;
    const formError = {
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

    formError.userName = checkRequiredFiled(formData.userName, 'form.user_name');

    formError.email = checkEmailAddress(formData.email, 'form.email_address');
    formError.phoneNumber = checkRequiredFiled(formData.phoneNumber, 'form.phone_number');

    formError.password = checkPassword(formData.password, 'form.password');
    formError.confirmPassword = checkConfirmPassword(formData.password, formData.confirmPassword, 'form.repeat_password');

    return formError;
};