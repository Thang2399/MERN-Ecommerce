import React, { useState, useEffect } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';

import supportsLanguagesArr from '../../config/supported_loacles';
import { supportsLanguagesArrTypes } from '../../types/index';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { changeLanguage } from '../../store/home';
import Image from '../base/Image';

export default function LocalesSwitcher(): JSX.Element {
    const currentLanguageCode = useSelector(
        (state: RootState) => state.homePageReducer.currentLanguage,
    );

    const dispatch = useDispatch();

    const [ showSubmenu, setShowSubmenu ] = useState<boolean>(false);
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


    const handleChangeLanguage = (language: string) => {
        dispatch(changeLanguage(language));
        getCurrentLanguageItem();
    };


    const onShowSubmenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowSubmenu(true);
    };

    const onHideSubmenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowSubmenu(false);
    };

    return (
        <div
            className={'w-40 text-white font-light relative'}
            onMouseOver={onShowSubmenu}
            onMouseLeave={onHideSubmenu}>
            <div className={'flex items-center cursor-pointer'}>
                <div className={'mr-2 w-8 h-8 flex justify-center items-center'}>
                    <Image imgUrl={languages.flag}/>
                </div>
                <h5 className={'text-lg mr-2'}>{languages.language}</h5>
                <div>
                    <RiArrowDownSFill/>
                </div>
            </div>

            {showSubmenu && (
                <div
                    className={
                        'bg-black/80 rounded-md absolute text-white'
                    }>
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
            )}
        </div>
    );
}
