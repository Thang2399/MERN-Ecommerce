import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '../constants';

export const getCookieData = (name: string) => {
    return getCookie(name);
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