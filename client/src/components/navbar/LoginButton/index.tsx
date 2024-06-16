import React from 'react';
import Typography from '../../base/Typography';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '@/constants';
import { useDispatch } from 'react-redux';
import { setShowToastMessage, setUserCommonInfor } from '@/store/common';
import Button from '../../base/Button';
import { Avatar, Tooltip } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const logoutOptions = [
    {
        label: 'home_page.login_icon.my_account',
        redirectPath: '/my-account',
        isLogoutItem: false,
        dataTest: 'my_account'
    },
    {
        label: 'home_page.login_icon.invoice_history',
        redirectPath: '/invoice-history',
        isLogoutItem: false,
        dataTest: 'invoice_history'
    },
    {
        label: 'home_page.login_icon.admin_dashboard',
        redirectPath: '/admin',
        isLogoutItem: false,
        dataTest: 'admin_dashboard'
    },
    {
        label: 'home_page.login_icon.logout',
        redirectPath: '/logout',
        isLogoutItem: true,
        dataTest: 'logout'
    }
];

const TooltipOptionComponent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onMenuItemClick = (redirectPath: string, isLogoutItem: boolean) => {
        if (!isLogoutItem) {
            navigate(redirectPath);
        } else {
            setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, '');
            dispatch(setUserCommonInfor({
                    role: '',
                    id: '',
                    email: '',
                }));
            dispatch(setShowToastMessage({
                    show: true,
                    message: 'home_page.logout_message',
                    type: 'success'
                }));
            navigate('/');
        }
    };

    return (
        <>
            <div className={'rounded-md'}>
                {logoutOptions.map(item => {
                    return (
                        <div key={item.label}
                             className={'cursor-pointer w-56 py-2 px-4 first:rounded-t-md last:rounded-b-md hover:bg-gray-300 hover:text-black border-b last:border-0'}
                             onClick={() => onMenuItemClick(item.redirectPath, item.isLogoutItem)}
                            data-test={item.dataTest}
                        >
                            <Typography content={item.label} className={'font-light capitalize'}/>
                        </div>
                    );
                })}
            </div>

        </>
    );
};

export default function LoginButton(): JSX.Element {
    const navigate = useNavigate();

    const accessToken = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN);


    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className={'text-white'}>
            <div className={''}>
                {
                    !accessToken
                    ? (
                        <div className={'w-fit h-full'}>
                            <Button
                                handleClick={handleLogin}
                                content={'home_page.login_icon.login'}
                                buttonClassName={'bg-gray-800 h-full'}
                                typoClassName={'text-lg font-light'}
                                dataTest={'navigate-to-login-btn'}
                            />
                        </div>
                        )
                    : (
                            <Tooltip
                                title={<TooltipOptionComponent />}
                                className={'cursor-pointer'}
                            >
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                    <span data-test={'userNameText'}>T</span>
                                </Avatar>
                            </Tooltip>

                        )
                }
            </div>

        </div>
    );
}
