import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

import Navbar from './components/base/Navbar';
import Cart from './components/home/Cart';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export default function App(): JSX.Element {
    const showCart = useSelector(
        (state: RootState) => state.homePageReducer.showCart,
    );

    return (
        <div className={'w-full h-screen'}>
            <div className={'fixed top-0 left-0 w-full z-50'}>
                <Navbar/>
            </div>
            <div className={'w-full h-full'}>
                <BrowserRouter>
                    <Routes>
                        {routes.map((route: any) => (
                            <Route
                                path={route.path}
                                element={<route.element/>}
                                key={route.element}
                            />
                        ))}
                    </Routes>

                    {showCart && (
                        <div
                            className={
                                'absolute top-0 left-0 h-full w-screen bg-black bg-opacity-40'
                            }>
                            <Cart/>
                        </div>
                    )}
                </BrowserRouter>
            </div>
            


        </div>
    );
}
