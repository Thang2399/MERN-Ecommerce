import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from "../constants";

export const getCookieData = (name: string) => {
    return getCookie(name);
};

export const changeMoney = ( price: string, currentLanguage: string ) =>
{
    const convertedPrice: number = parseFloat( price );
    const exchangeRate = 23000;
    const result = {
        price: '',
        currency: ''
    };

    if ( currentLanguage === COMMON_CONSTANTS.VN )
    {
        const changedMoney = convertedPrice / exchangeRate;
        return { ...result, price: changedMoney.toString(), currency: 'VND' };
    } else if ( currentLanguage === COMMON_CONSTANTS.EN )
    {
        const changedMoney = convertedPrice * exchangeRate;
        return { ...result, price: changedMoney.toString(), currency: 'USD' };
    }
};