import auth from './auth';
import home from './home';
import cart from './cart';

const services = {
    ...auth,
    ...home,
    ...cart
};

export default services;