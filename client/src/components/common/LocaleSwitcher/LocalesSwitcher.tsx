import React, { useState, useEffect } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';

import supportsLanguagesArr from '../../../config/supported_loacles';
import { supportsLanguagesArrTypes } from '@/types';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { changeLanguage } from '@/store/home';
import Image from '../../base/Image';
import { Tooltip } from '@mui/material';
import './LocaleSwitcher.scss';
import { FiCheck } from 'react-icons/fi';

interface ILocaleTooltip {
    getCurrentLanguageItem: () => void,
    languages: supportsLanguagesArrTypes
}

const LocaleTooltip: React.FC<ILocaleTooltip> = ({ getCurrentLanguageItem, languages }) => {
    const dispatch = useDispatch();

    const handleChangeLanguage = (language: string) => {
        dispatch(changeLanguage(language));
        getCurrentLanguageItem();
    };

    return (
        <div
            className={'rounded text-black bg-light'}>
            {supportsLanguagesArr.map((item: supportsLanguagesArrTypes) => (
                <div
                    key={item.code}
                    onClick={() => handleChangeLanguage(item.code)}
                    className={
                        `flex items-center cursor-pointer py-2 px-4 ${languages.code === item.code ? 'bg-dark text-white' : 'bg-light text-black'} first:rounded-t last:rounded-b hover:bg-dark hover:text-white first:border-b`
                    }>
                    <div className={`mr-2 text-base ${languages.code === item.code ? 'opacity-100' : 'opacity-0'}`}>
                        <FiCheck />
                    </div>
                    <div className={'mr-2 w-8 h-8 flex justify-center items-center'}>
                        <Image imgUrl={item.flag}/>
                    </div>
                    <h5 className={'text-sm'}>{item.language}</h5>
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
        <div className={'locale-switcher-container'}>
            <Tooltip
                title={
                <LocaleTooltip
                    getCurrentLanguageItem={getCurrentLanguageItem}
                    languages={languages}/>
            }
            >
                <div data-test={'locale-switcher'} className={'flex items-center justify-between cursor-pointer text-white font-light w-fit bg-dark p-2 rounded gap-2'}>
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-7 h-7'}>
                            <Image imgUrl={languages.flag}/>
                        </div>
                        <h5 className={'uppercase'}>{languages.code}</h5>
                    </div>

                    <RiArrowDownSFill/>
                </div>
            </Tooltip>
        </div>

    );
}
