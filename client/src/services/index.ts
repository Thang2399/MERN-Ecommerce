import authService from './auth.service';
import homeService from './home.service';
import cartService from './cart.service';
import invoiceService from './invoice.service';

const services = {
    ...authService,
    ...homeService,
    ...cartService,
    ...invoiceService
};

export default services;