import React, { useState, useEffect } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';

import supportsLanguagesArr from '../../config/supported_loacles';
import { supportsLanguagesArrTypes } from '@/types';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { changeLanguage } from '@/store/home';
import Image from '../base/Image';
import { Tooltip } from '@mui/material';

interface ILocaleTooltip {
    getCurrentLanguageItem: () => void
}

const LocaleTooltip: React.FC<ILocaleTooltip> = ({ getCurrentLanguageItem }) => {
    const dispatch = useDispatch();

    const handleChangeLanguage = (language: string) => {
        dispatch(changeLanguage(language));
        getCurrentLanguageItem();
    };

    return (
        <div
            className={'rounded-md text-white'}>
            {supportsLanguagesArr.map((item: supportsLanguagesArrTypes) => (
                <div
                    key={item.code}
                    onClick={() => handleChangeLanguage(item.code)}
                    className={
                        'flex items-center cursor-pointer py-2 px-4 first:rounded-t-md last:rounded-b-md hover:bg-gray-300 hover:text-black first:border-b'
                    }>
                    <div className={'mr-2 w-8 h-8 flex justify-center items-center'}>
                        <Image imgUrl={item.flag}/>
                    </div>
                    <h5 className={'text-base'}>{item.language}</h5>
                </div>
            ))}
        </div>
    );
};

export default function LocalesSwitcher(): JSX.Element {
    const currentLanguageCode = useSelector(
        (state: RootState) => state.homePageReducer.currentLanguage,
    );

    const [ languages, setLanguages ] = useState<supportsLanguagesArrTypes>({
        code: '',
        language: '',
        flag: '',
    });

    const getCurrentLanguageItem = () => {
        const currentLanguage: supportsLanguagesArrTypes | undefined =
            supportsLanguagesArr.find(
                (item: supportsLanguagesArrTypes) => item.code === currentLanguageCode
            );
        setLanguages({
            ...languages,
            code: currentLanguage?.code || '',
            language: currentLanguage?.language || '',
            flag: currentLanguage?.flag || '',
        });
    };

    useEffect(() => {
        getCurrentLanguageItem();
    }, [ currentLanguageCode ]);

    return (
        <>
            <Tooltip title={<LocaleTooltip getCurrentLanguageItem={getCurrentLanguageItem}/>}>
                <div data-test={'locale-switcher'} className={'flex items-center justify-between cursor-pointer text-white font-light w-48 bg-gray-700 p-2 rounded-lg'}>
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-10 h-10'}>
                            <Image imgUrl={languages.flag}/>
                        </div>
                        <h5 className={'text-lg'}>{languages.language}</h5>
                    </div>

                    <RiArrowDownSFill/>
                </div>
            </Tooltip>
        </>

    );
}
