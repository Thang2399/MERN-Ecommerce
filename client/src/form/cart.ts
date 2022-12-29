import {
    userAddress,
    userAddressFormErrorMessages,
    userInforFormErrorMessages,
    userInforFormType, userInformation,
    userPaymentFormType
} from '../types/cart';

export const userInformationForm: userInformation = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: ''
};

export const userInformationFormErrorMessage: userInforFormErrorMessages = {
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

export const userAddressForm: userAddress = {
    country: '',
    city: '',
    district: '',
    streetAddress: '',
};

export const userAddressFormErrorMessage: userAddressFormErrorMessages = {
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

export const userPaymentForm: userPaymentFormType = {
    isCodMethod: true,
    discountCode: '',
    cardNumber: '',
    cardHolderName: '',
    cardSecurityCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
};

export const userInforForm: userInforFormType = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    city: '',
    district: '',
    streetAddress: '',
    isShipToHome: true,
    isCodMethod: true,
    discountCode: '',
    cardNumber: '',
    cardHolderName: '',
    cardSecurityCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: ''
};
