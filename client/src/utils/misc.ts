import { getCookie } from 'typescript-cookie';

export const getCookieData = (name: string) => {
    return getCookie(name);
};
