import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import Typography from '../base/Typography';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
        label: 'home_page.login_icon.setting',
        redirectPath: '/setting',
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
    const [ showSubmenu, setShowSubmenu ] = useState<boolean>(false);
    const [ submenuOption, setSubmenuOption ] = useState<{label: string, redirectPath: string, isLogoutItem: boolean}[]>(loginOptions);
    
    const accessToken = useSelector((state: RootState) => state.commonReducer.userCommonInfor.accessToken);

    const checkUserLogin = () => {
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
    
    const onMenuItemClick = (redirectPath: string, isLogoutItem: boolean) => {
        if (!isLogoutItem) {
            navigate(redirectPath);
        } else {
            console.log('logged out');
        }
    };

    return (
        <div className={'text-white ml-4 relative w-48'}
             onMouseOver={onShowSubmenu}
             onMouseLeave={onHideSubmenu}>
            <div
                className={'flex items-center cursor-pointer transition delay-500 text-3xl w-1/3'}
            >
                <AiOutlineUser/>
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
