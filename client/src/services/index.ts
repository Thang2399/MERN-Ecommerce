import authService from './auth.service';
import itemService from './item.service';
import cartService from './cart.service';
import invoiceService from './invoice.service';
import brandService from '@/services/brand.service';
import categoryService from '@/services/category.service';

const services = {
    ...authService,
    ...itemService,
    ...cartService,
    ...invoiceService,
    ...brandService,
    ...categoryService,
};

export default services;
