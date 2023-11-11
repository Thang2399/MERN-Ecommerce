import React, { useState } from 'react';

import LocalesSwitcher from '../common/LocalesSwitcher';
import Logo from '../common/Logo';
import InputTextField from '../base/InputTextField';

import CartIcon from './CartIcon';
import LoginButton from './LoginButton';

export default function Navbar(): JSX.Element {
    const [ searchValue, setSearchValue ] = useState<string>('');

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={'bg-black flex items-center justify-between px-8 py-3'}>
            <Logo/>

            <div className={'w-1/3'}>
                <InputTextField
                    value={searchValue}
                    handleChange={handleChange}
                    inputName={'searchValue'}
                    type={'text'}
                    placeholder={'home_page.search_box_placeholder'}
                />
            </div>
            <div className={'flex items-center gap-3'}>
                <LocalesSwitcher/>
                <div className={'flex items-center gap-5'}>
                    <CartIcon />
                    <LoginButton />
                </div>

            </div>
        </div>
    );
}
