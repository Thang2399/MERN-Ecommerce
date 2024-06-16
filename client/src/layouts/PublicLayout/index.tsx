import Navbar from '../../components/navbar';
import { Outlet } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '@/constants';
import services from '@/services';
import { useEffect } from 'react';

export default function PublicLayout(): JSX.Element {
    const accessToken = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN);
    const pathname = window.location.pathname;

    const handleGetUserInfor = async () => {
        try {
            const res = await services.getUserInfor();
            console.log('handleGetUserInfor res', res);
        } catch (err) {
            console.log('err', err);
        }
    };

    useEffect(() => {
        if (accessToken) {
            handleGetUserInfor();
        }
    });

    return (
        <div className={'w-full h-screen relative'}>
                <div className={'fixed top-0 left-0 w-full z-20'}>
                    <Navbar/>
                </div>

                <div className={'w-full h-full'}>
                    <div className={'pt-20 px-20 h-full'}>
                        <Outlet />
                    </div>
                </div>
        </div>
    );
}
