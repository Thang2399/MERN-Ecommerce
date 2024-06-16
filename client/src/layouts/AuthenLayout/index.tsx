import Navbar from '../../components/navbar';
import { Outlet } from 'react-router-dom';

export default function AuthenLayout(): JSX.Element {
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
