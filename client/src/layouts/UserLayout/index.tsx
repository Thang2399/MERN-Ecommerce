import { Outlet } from 'react-router-dom';
import UserSidebar from '@/components/base/UserSidebar';

export default function UserLayout(): JSX.Element {
    return (
        <div className={'flex gap-10 h-full border rounded-xl'}>
                <div className={'w-1/4 h-full'}>
                    <UserSidebar />
                </div>

                <div className={'w-3/5 py-6'}>
                    <Outlet />
                </div>
        </div>
    );
}
