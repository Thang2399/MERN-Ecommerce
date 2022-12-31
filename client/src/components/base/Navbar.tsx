import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../store';
import LocalesSwitcher from '../common/LocalesSwitcher';
import Logo from '../common/Logo';
import InputTextField from './InputTextField';

import { FaUserCircle } from 'react-icons/fa';
import CartNavbarIcon from '../navbar/CartNavbarIcon';
import LoginIcon from '../navbar/LoginIcon';

export default function Navbar(): JSX.Element {
    const [ searchValue, setSearchValue ] = useState<string>('');

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={'bg-black flex items-center px-3 py-2'}>
            <div className={'mr-4'}>
                <Logo/>
            </div>
            <div className={'w-1/3 mr-4'}>
                <InputTextField
                    value={searchValue}
                    handleChange={handleChange}
                    inputName={'searchValue'}
                    type={'text'}
                    placeholder={'home_page.search_box_placeholder'}
                />
            </div>
            <div className={'mr-4'}>
                <LocalesSwitcher/>
            </div>

            <CartNavbarIcon />

            <LoginIcon />
        </div>
    );
}
