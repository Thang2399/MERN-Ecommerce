import login from './login';
import home from './home';
import cart from './cart';

const services = {
    ...login,
    ...home,
    ...cart
};

export default services;