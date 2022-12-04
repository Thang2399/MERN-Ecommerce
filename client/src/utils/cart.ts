import { userInformation } from '../types';
import { REGEX } from '../constants';

export const checkRequiredFiled = (data: string, field: string) => {
    const errorMessage = {
        message: '',
        field: ''
    };

    if (!data || data === '') {
        errorMessage.message = 'error_messages.filed_required';
        errorMessage.field = field;
    }

    return errorMessage;
};

export const checkEmailAddress = (data: string, field: string) => {
    const errorMessage = checkRequiredFiled(data, field);

    if (errorMessage.message === '' && !REGEX.EMAIL_VALIDATE.test(data)) {
        errorMessage.message = 'error_messages.wrong_email_validate';
    }

    return errorMessage;
};


export const checkValidateForm = async (form: userInformation) => {
    const formData = form;

    const errorMessage = {
        firstName: {
            message: '',
            field: ''
        },
        lastName: {
            message: '',
            field: ''
        },
        phoneNumber: {
            message: '',
            field: ''
        },
        emailAddress: {
            message: '',
            field: ''
        }
    };

    errorMessage.firstName = checkRequiredFiled(formData.firstName, 'form.first_name');
    errorMessage.lastName = checkRequiredFiled(formData.lastName, 'form.last_name');
    errorMessage.phoneNumber = checkRequiredFiled(formData.phoneNumber, 'form.phone_number');
    errorMessage.emailAddress = checkEmailAddress(formData.emailAddress, 'form.email_address');


    return errorMessage;
};