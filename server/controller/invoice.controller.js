import InvoiceSchema from '../model/invoice.js';
import { HTTP_STATUS } from '../constant/index.js';
import { customAlphabet } from 'nanoid';

export const getListInvoices = async (req, res) => {
	try {
		const listInvoicesRes = await InvoiceSchema.find();

		if (listInvoicesRes) {
			return res.status(HTTP_STATUS.SUCCESS).json(listInvoicesRes);
		}
	} catch (err) {
		return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
	}
};

export const getSingleInvoice = async (req, res) => {
	try {
		const { id } = req.params;

		if (id) {
			const singleInvoice = await InvoiceSchema.findById(id);

			return res.status(HTTP_STATUS.SUCCESS).json(singleInvoice);
		}
	} catch (err) {
		return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
	}
};

export const createInvoice = async (req, res) => {
	try {
		const body = req.body;
		const nanoid = customAlphabet('1234567890abcdef', 10);
		const invoiceId = `#${nanoid()}`;

		const schema = { ...body, invoiceId };
		const newInvoice = await InvoiceSchema.create(schema);

		await newInvoice.save();
		return res.status(HTTP_STATUS.CREATE_SUCCESS).json(newInvoice);
	} catch (err) {
		return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
	}
};

export const getListInvoicesFromEmail = async (req, res) => {
	console.log('req', req);
	try {
		const userEmail = req.query.email;

		const listInvoices = await InvoiceSchema.find({ emailAddress: userEmail });

		return res.status(HTTP_STATUS.SUCCESS).json(listInvoices);
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(err);
	}
};
