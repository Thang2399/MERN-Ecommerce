import { userAddress, userInformation } from '../types/cart';
import { REGEX } from '../constants';
import { checkEmailAddress, checkRequiredFiled } from './misc';


export const checkValidateFormUserInfo = (form: userInformation) => {
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
export const checkValidateFormUserAddress = (form: userAddress) => {
    const formData = form;

    const errorMessage = {
        country: {
            message: '',
            field: ''
        },
        city: {
            message: '',
            field: ''
        },
        district: {
            message: '',
            field: ''
        },
        streetAddress: {
            message: '',
            field: ''
        }
    };

    errorMessage.country = checkRequiredFiled(formData.country, 'form.country');
    errorMessage.city = checkRequiredFiled(formData.city, 'form.city');
    errorMessage.district = checkRequiredFiled(formData.district, 'form.district');
    errorMessage.streetAddress = checkRequiredFiled(formData.streetAddress, 'form.street_address');

    return errorMessage;
};
