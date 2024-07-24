import React, { useState } from 'react';

import LocalesSwitcher from '../common/LocaleSwitcher/LocalesSwitcher';
import Logo from '../common/Logo';
import InputTextField from '../base/InputTextField';

import CartIcon from './CartIcon';
import LoginButton from './LoginButton';
import ListStores from '@/components/navbar/ListStores/ListStores';
import ListCategories from '@/components/navbar/ListCategories/ListCategories';

export default function Navbar(): JSX.Element {
    const [ searchValue, setSearchValue ] = useState<string>('');

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={'bg-primary flex items-center justify-between px-8 py-3'}>
            <Logo/>
            <div className={'flex gap-2 items-center'}>
                <ListCategories/>
                <ListStores/>
            </div>

            <div className={'w-2/5'}>
                <InputTextField
                    value={searchValue}
                    handleChange={handleChange}
                    inputName={'searchValue'}
                    placeholder={'home_page.search_box_placeholder'}
                />
            </div>

            <div className={'flex items-center gap-5'}>
                <LocalesSwitcher/>
                <CartIcon/>
                <LoginButton/>
            </div>
        </div>
    );
}
