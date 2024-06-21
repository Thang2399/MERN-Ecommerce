import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS, REGEX } from '../constants';
import { useTranslation } from 'react-i18next';
import { date } from 'yup';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants/datetime';

export const getCookieData = (name: string) => {
    let result = '';
    const cookieData = getCookie(name);
    const languagesArray = [ 'vn', 'en' ];
    if (cookieData && languagesArray.includes(cookieData)) {
        result = cookieData;
    } else result = 'en';
    return result;
};

export const formatMoney = ( price: string | number ) =>{
    let convertedPrice;
    if (typeof price === 'number') {
        convertedPrice = price;
    } else convertedPrice = parseFloat( price );
    return new Intl.NumberFormat('en-US').format(convertedPrice);
};

export const changeMoney = ( price: string, currentLanguage: string) =>{
    const convertedPrice: number = parseFloat( price );
    const exchangeRate = 23000;
    const result = {
        price: '',
        currency: ''
    };

    if (currentLanguage === COMMON_CONSTANTS.VN) {
        const changedMoney = convertedPrice * exchangeRate;
        return {
            ...result,
            price: formatMoney(changedMoney),
            currency: 'đ',
        };
    }
};

export const convertMoney = (money: string, currency: string, currentLanguage: string) => {
        const moneyData = money;
        // if (currentLanguage === COMMON_CONSTANTS.VN) {
        //     const convertPrice = changeMoney(moneyData, currentLanguage);
        //     if (convertPrice) {
        //         return {
        //             price: convertPrice.price,
        //             currency: convertPrice.currency,
        //         };
        //     }
        // } else {
        //     return {
        //         price: formatMoney(moneyData),
        //         currency
        //     };
        // }
    return {
        price: formatMoney(moneyData),
        currency
    };
    };

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

export const checkPassword = (data: string, field: string) => {
    const errorMessage = checkRequiredFiled(data, field);

    const isPasswordContainAtLeastOneNumber = REGEX.CONTAIN_AT_LEAST_ONE_NUMBER.test(data);

    const isPasswordContainAtLeastOneLetter = REGEX.CONTAIN_AT_LEAST_ONE_LETTER.test(data);

    const isPasswordContainAtLeastOneSpecialCharacter = REGEX.CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER.test(data);

    if (errorMessage.message === ''){
        if (data.length < 8
        || !isPasswordContainAtLeastOneNumber
        || !isPasswordContainAtLeastOneLetter
        || !isPasswordContainAtLeastOneSpecialCharacter){
        errorMessage.message = 'error_messages.wrong_password_validate';
        }
    }

    return errorMessage;
};

export const checkConfirmPassword = (password: string, confirmPassword: string, field: string) => {
    const errorMessage = checkRequiredFiled(confirmPassword, field);

    if (password !== confirmPassword) {
        errorMessage.message = 'error_messages.confirm_password_not_match';
    }

    return errorMessage;
};

export const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

export const formatDateTime = (value: string, format = DATE_TIME_FORMAT.M_DD_YYYY) => {
    return dayjs(value).format(format);
};
