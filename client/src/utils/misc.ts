import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS, REGEX } from '../constants';

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
        if (currentLanguage === COMMON_CONSTANTS.VN) {
            const convertPrice = changeMoney(moneyData, currentLanguage);
            if (convertPrice) {
                return {
                    price: convertPrice.price,
                    currency: convertPrice.currency,
                };
            }
        } else {
            return {
                price: formatMoney(moneyData),
                currency
            };
        }
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