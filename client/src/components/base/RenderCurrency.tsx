import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { COMMON_CONSTANTS } from '@/constants';
import Typography from '@/components/base/Typography';
import { convertMoney } from '@/utils/misc';
import React from 'react';
import { singleItemTypes } from '@/types/home';

interface IRenderCurrency {
    currency?: string,
    price: string
}

const RenderCurrency: React.FC<IRenderCurrency> = ({ currency = '$', price }) => {
    const currentLanguageCode = useSelector((state: RootState) => state.homePageReducer.currentLanguage,
    );

    return (
        <>
            {/*{currentLanguageCode === COMMON_CONSTANTS.EN && (*/}
            {/*    <>*/}
            {/*        <Typography*/}
            {/*            content={currency && convertMoney(price, currency, currentLanguageCode)?.currency || currency}*/}
            {/*            needTranslate={false}*/}
            {/*            className={'mr-1'}*/}
            {/*        />*/}
            {/*    </>*/}
            {/*)}*/}
            <Typography
                content={currency && convertMoney(price, currency, currentLanguageCode)?.currency || currency}
                needTranslate={false}
                className={'mr-1'}
            />

            <Typography
                content={price && convertMoney(price, currency, currentLanguageCode)?.price || price}
                className={'text-2xl font-semibold'}
                needTranslate={false}
            />
            {/*{currentLanguageCode === COMMON_CONSTANTS.VN && (*/}
            {/*    <>*/}
            {/*        <Typography*/}
            {/*            content={currency && convertMoney(price, currency, currentLanguageCode)?.currency || currency}*/}
            {/*            needTranslate={false}*/}
            {/*            className={'ml-1'}*/}
            {/*        />*/}
            {/*    </>*/}
            {/*)}*/}
        </>
    );
};

export default RenderCurrency;
