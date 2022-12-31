import { defaultLoginFormTypes } from '../types/login';
import { checkEmailAddress, checkRequiredFiled } from './misc';

export const checkValidateLoginForm = (form: defaultLoginFormTypes) => {
    const formData = form;

    const errorMessages = {
        email: {
            message: '',
            field: ''
        },
        password: {
            message: '',
            field: ''
        },
    };
    
    errorMessages.email = checkEmailAddress(formData.email, 'form.email_address');
    errorMessages.password = checkRequiredFiled(formData.password, 'form.password');
    return errorMessages;
};