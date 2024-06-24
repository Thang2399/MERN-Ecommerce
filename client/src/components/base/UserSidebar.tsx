import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { stringToColor } from '@/utils/misc';
import { Avatar } from '@mui/material';
import Typography from '@/components/base/Typography';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { USER_ROUTES } from '@/routes/constants';
import { GoLocation } from 'react-icons/go';
import { MdOutlinePaid } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '@/constants';
import { setShowToastMessage, setUserCommonInfor } from '@/store/common';
import { IoMdKey } from 'react-icons/io';

const sidebarRoutesArr = [
    {
        label: 'my_account_page.label',
        route: USER_ROUTES.MY_ACCOUNT,
        icon: <AiOutlineUser />
    },
    {
        label: 'my_addresses_page.label',
        route: USER_ROUTES.MY_ADDRESS,
        icon: <GoLocation />
    },
    {
        label: 'invoices_history_page.label',
        route: USER_ROUTES.INVOICE_HISTORY,
        icon: <MdOutlinePaid />
    },
    {
        label: 'change_password_page.label',
        route: USER_ROUTES.CHANGE_PASSWORD,
        icon: <IoMdKey />
    },
    {
        label: 'home_page.login_icon.logout',
        route: '',
        icon: <AiOutlineLogout />,
        isLogoutItem: true
    }
];


const UserSidebar: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userCommonInfor = useSelector((state: RootState) => state.commonReducer.userCommonInfor);

    const renderSelectedBackground = (pathname: string, route: string) => {
        if (route && pathname.includes(route)) {
            return 'text-white bg-gray-700/75';
        }
    };

    const handleClickSidebar = (route: string) => {
        if (route) {
            navigate(`${route}`);
        } else {
            setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, '');
            localStorage.removeItem(COMMON_CONSTANTS.REFRESH_TOKEN);
            dispatch(setUserCommonInfor({
                    role: '',
                    id: '',
                    email: '',
                    userName: ''
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
        <div className={'border border-y-0 border-l-0 border-r h-full'}>
            <div className={'flex items-center gap-5 pt-6 pb-5 px-6'}>
                <Avatar
                    sx={{
                        bgcolor: stringToColor(userCommonInfor.userName),
                        width: 88,
                        height: 88
                    }}
                >
                <span data-test={'userNameText'} className={'text-6xl'}>
                    {userCommonInfor.userName[0]}
                </span>
                </Avatar>
                <Typography className={'text-2xl'} content={userCommonInfor.userName}/>
            </div>

            <div className={'mt-5'}>
                {sidebarRoutesArr.map((sidebarItem: any) => {
                return (
                    <div className={'py-2 border border-t border-x-0 border-b-0'} key={sidebarItem.label}>
                        <div
                            className={`py-3 px-2 flex items-center gap-5 cursor-pointer ${renderSelectedBackground(pathname, sidebarItem.route)}`}
                            onClick={() => handleClickSidebar(sidebarItem.route)}
                        >
                            <div className={'text-3xl'}>
                                {sidebarItem.icon}
                            </div>

                            <Typography
                                className={'text-xl capitalize'}
                                content={sidebarItem.label}
                                needTranslate={true}
                            />
                        </div>

                    </div>
                );
                })}
            </div>

        </div>
    );
};

export default UserSidebar;
