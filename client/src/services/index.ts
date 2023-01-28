import authService from './auth.service';
import homeService from './home.service';
import cartService from './cart.service';

const services = {
    ...authService,
    ...homeService,
    ...cartService
};

export default services;