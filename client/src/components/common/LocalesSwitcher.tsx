import React, { useState, useEffect } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';

import supportsLanguagesArr from '../../config/supported_loacles';
import { supportsLanguagesArrTypes } from '../../types/index';

import i18next from 'i18next';
import { getCookieData } from '../../utils/misc'; 
import { COMMON_CONSTANTS } from '../../constants';
import { setCookie } from 'typescript-cookie';

export default function LocalesSwitcher(): JSX.Element {
	const currentLanguageCode: string | null | undefined =
		getCookieData(COMMON_CONSTANTS.I18NEXT) || COMMON_CONSTANTS.VN;
    
    const handleChangeLanguage = (language: string) => {
        i18next.changeLanguage(language);
		setCookie( COMMON_CONSTANTS.I18NEXT, language );
		getCurrentLanguageItem();
	}
	
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
	}, [currentLanguageCode]);
	

	const [languages, setLanguages] =
		useState<supportsLanguagesArrTypes>({
			code: '',
			language: '',
			flag: ''
		});

	const [showSubmenu, setShowSubmenu] = useState<boolean>(false);

	const onShowSubmenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowSubmenu(true);
	};

    const onHideSubmenu = ( e: React.MouseEvent<HTMLDivElement> ) =>{
        e.preventDefault();
		setShowSubmenu(false);
    }

	return (
		<div
			className={'w-40 text-white font-light relative'}
			onMouseOver={onShowSubmenu}
			onMouseLeave={onHideSubmenu}>
			<div className={'flex items-center cursor-pointer'}>
				<h2 className={'text-3xl mr-2'}>{languages.flag}</h2>
				<h5 className={'text-lg mr-2'}>{languages.language}</h5>
				<div>
					<RiArrowDownSFill />
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
								'flex items-center cursor-pointer py-2 px-4 first:rounded-t-md last:rounded-b-md hover:bg-gray-300 hover:text-black'
							}>
							<h1 className={'text-2xl mr-3'}>{item.flag}</h1>
							<h5 className={'text-base'}>{item.language}</h5>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
