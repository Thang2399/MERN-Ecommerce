import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { COMMON_CONSTANTS } from '@/constants';
import Typography from '@/components/base/Typography';
import { convertMoney } from '@/utils/misc';
import React from 'react';
import { singleItemTypes } from '@/types/home';

interface IRenderCurrency {
    item: singleItemTypes
}

const RenderCurrency: React.FC<IRenderCurrency> = ({ item }) => {
    const currentLanguageCode = useSelector((state: RootState) => state.homePageReducer.currentLanguage,
    );

    return (
        <>
            {currentLanguageCode === COMMON_CONSTANTS.EN && (
                <>
                    <Typography
                        content={item.currency && convertMoney(item.price, item.currency, currentLanguageCode)?.currency || item.currency}
                        needTranslate={false}
                        className={'mr-1'}
                    />
                </>
            )}
            <Typography
                content={item.price && convertMoney(item.price, item.currency, currentLanguageCode)?.price || item.price}
                className={'text-2xl font-semibold'}
                needTranslate={false}
            />
            {currentLanguageCode === COMMON_CONSTANTS.VN && (
                <>
                    <Typography
                        content={item.currency && convertMoney(item.price, item.currency, currentLanguageCode)?.currency || item.currency}
                        needTranslate={false}
                        className={'ml-1'}
                    />
                </>
            )}
        </>
    );
};

export default RenderCurrency;
