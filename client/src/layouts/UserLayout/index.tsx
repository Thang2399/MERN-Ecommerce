import { Outlet } from 'react-router-dom';
import UserSidebar from '@/components/base/UserSidebar';

export default function UserLayout(): JSX.Element {
    return (
        <div className={'flex gap-8 h-full border rounded-xl'}>
                <div className={'w-1/4 h-full'}>
                    <UserSidebar />
                </div>

                <div className={'w-3/4 h-full py-6 pr-4'}>
                    <Outlet />
                </div>
        </div>
    );
}
