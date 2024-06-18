import Navbar from '../../components/navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '@/constants';
import services from '@/services';
import { useEffect } from 'react';
import { authRoutesArr, privateRoutesArr, USER_ROUTES } from '@/routes/constants';
import { useDispatch } from 'react-redux';
import { setUserCommonInfor } from '@/store/common';

export default function PublicLayout(): JSX.Element {
    const accessToken = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN);
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGetUserInfor = async () => {
        try {
            const res = await services.getUserInfor();
            const data = res.data;
            dispatch(setUserCommonInfor({
                role: data.role,
                id: data._id,
                email: data.email,
                userName: data.userName
            }));
        } catch (err) {
            console.log('err', err);
            dispatch(setUserCommonInfor({
                role: '',
                id: '',
                email: '',
                userName: ''
            }));
        }
    };

    const handleNavigateRoute = () => {
        //     private routes
        const isPrivateRoute = privateRoutesArr.includes(pathname);
        if (isPrivateRoute && !accessToken) {
            navigate(USER_ROUTES.DEFAULT);
            return;
        }
        //     auth routes
        const isAuthRoute = authRoutesArr.includes(pathname);
        if (isAuthRoute && accessToken) {
            navigate(USER_ROUTES.DEFAULT);
            return;
        }
    };

    useEffect(() => {
        handleNavigateRoute();
        if (accessToken) {
            handleGetUserInfor();
        }
    }, [ pathname, accessToken ]);

    return (
        <div className={'w-full h-screen relative'}>
                <div className={'fixed top-0 left-0 w-full z-20'}>
                    <Navbar/>
                </div>

                <div className={'w-full p-24 overflow-auto'}>
                    <Outlet />
                </div>
        </div>
    );
}
