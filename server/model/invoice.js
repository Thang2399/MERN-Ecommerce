import mongoose from 'mongoose';
import { INVOICE_STATUS } from '../constant/invoice.js';

const invoiceSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	emailAddress: { type: String, required: true },
	country: { type: String, required: true },
	city: { type: String, required: true },
	district: { type: String, required: true },
	streetAddress: { type: String, required: true },
	isShipToHome: { type: Boolean, required: true },
	isCodMethod: { type: Boolean, required: true },
	discountCode: { type: String },
	invoiceId: { type: String, required: true },
	totalPrice: { type: String, required: true },
	listBoughtItems: { type: Array, required: true },
	invoiceStatus: { type: String, required: true, default: INVOICE_STATUS.RECEIVED_ORDER }
});

const InvoiceSchema = mongoose.model('InvoiceSchema', invoiceSchema);

export default InvoiceSchema;
