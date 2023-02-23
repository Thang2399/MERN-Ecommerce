import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import Typography from '../base/Typography';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setShowToastMessage, setUserCommonInfor } from '../../store/common';

const loginOptions = [
    {
        label: 'home_page.login_icon.sign_up',
        redirectPath: '/signup',
        isLogoutItem: false,
    },
    {
        label: 'home_page.login_icon.login',
        redirectPath: '/login',
        isLogoutItem: false,
    }
];

const logoutOptions = [
    {
        label: 'home_page.login_icon.my_account',
        redirectPath: '/my_account',
        isLogoutItem: false,
    },
    {
        label: 'home_page.login_icon.invoice_history',
        redirectPath: '/invoice_history',
        isLogoutItem: false,
    },
    {
        label: 'home_page.login_icon.logout',
        redirectPath: '/logout',
        isLogoutItem: true,
    }
];

export default function LoginIcon(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [ showSubmenu, setShowSubmenu ] = useState<boolean>(false);
    const [ submenuOption, setSubmenuOption ] = useState<{label: string, redirectPath: string, isLogoutItem: boolean}[]>(loginOptions);
    
    const accessToken = useSelector((state: RootState) => state.commonReducer.userCommonInfor.accessToken);

    const checkUserLogin = () => {
        console.log('check run');
       if (accessToken) {
           setSubmenuOption(logoutOptions);
       } else {
           setSubmenuOption(loginOptions);
       }
    };

    useEffect(() => {
        checkUserLogin();
    }, [ accessToken ]);

    const onShowSubmenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowSubmenu(true);
    };

    const onHideSubmenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowSubmenu(false);
    };
    
    const onMenuItemClick = async (redirectPath: string, isLogoutItem: boolean) => {
        if (!isLogoutItem) {
            await navigate(redirectPath);
        } else {
            setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, '');
            setCookie(COMMON_CONSTANTS.USER_ID, '');
            setCookie(COMMON_CONSTANTS.USER_ROLE, '');
            setCookie(COMMON_CONSTANTS.USER_EMAIL, '');
            await dispatch(setUserCommonInfor({
                    accessToken: '',
                    role: '',
                    id: '',
                    email: '',
                }));
            await dispatch(setShowToastMessage({
                    show: true,
                    message: 'home_page.logout_message',
                    type: 'success'
                }));
            await navigate('/');
        }
    };

    return (
        <div className={'text-white ml-4 relative w-48'}
             onMouseOver={onShowSubmenu}
             onMouseLeave={onHideSubmenu}>
            <div
                className={'flex items-center cursor-pointer transition delay-500 text-3xl w-1/3'}
            >
                {accessToken ? <FaUserAlt /> : <AiOutlineUser/> }

                <div>
                    {showSubmenu
                        ? <MdOutlineArrowDropUp/>
                        : <MdOutlineArrowDropDown/>
                    }
                </div>
            </div>

            {showSubmenu && (
                <div className={'bg-black/80 rounded-md absolute'}>
                    {submenuOption.map(item => {
                        return (
                            <div key={item.label}
                                 className={'cursor-pointer w-56 py-2 px-4 first:rounded-t-md last:rounded-b-md hover:bg-gray-300 hover:text-black border-b last:border-0'}
                                 onClick={() => onMenuItemClick(item.redirectPath, item.isLogoutItem)}>
                                <Typography content={item.label} className={'font-light'}/>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}
