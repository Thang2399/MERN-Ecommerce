import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Cart from '../../components/home/Cart';
import LoadingIcon from '../../components/common/LoadingIcon';
import ToastMessage from '../../components/common/ToastMessage';
import Navbar from '../../components/navbar';
import { Outlet } from 'react-router-dom';

export default function UserLayout(): JSX.Element {
    const showCart = useSelector(
        (state: RootState) => state.homePageReducer.showCart,
    );

    return (
        <div className={'w-full h-screen relative'}>
                <div className={'fixed top-0 left-0 w-full z-20'}>
                    <Navbar/>
                </div>

                <div className={'w-full h-full'}>
                    <div className={'pt-20 px-20 h-full'}>
                        <Outlet />
                        {showCart && (
                            <div
                                className={
                                    'absolute top-0 left-0 h-full w-screen bg-black bg-opacity-40'
                                }>
                                <Cart/>
                            </div>
                        )}
                    </div>
                </div>

            <LoadingIcon />
            <ToastMessage />
        </div>
    );
}
