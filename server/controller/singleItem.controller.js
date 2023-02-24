import SingleItemSchema from '../model/singleItem.js';
import { HTTP_STATUS } from '../constant/index.js';

export const getListItems = async (req, res) => {
	try {
		const listItemsRes = await SingleItemSchema.find();

		if (listItemsRes) {
			return res.status(HTTP_STATUS.SUCCESS).json(listItemsRes);
		}
	} catch (err) {
		return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
	}
};

export const getSingleItem = async (req, res) => {
	try {
		const { id } = req.params;

		if (id) {
			const singleItem = await SingleItemSchema.findById(id);

			return res.status(HTTP_STATUS.SUCCESS).json(singleItem);
		}
	} catch (err) {
		return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
	}
};

export const createItem = async (req, res) => {
	try {
		const body = req.body;

		const newItem = new SingleItemSchema(body);

		// store new item in database
		await newItem.save();
		return res.status(HTTP_STATUS.CREATE_SUCCESS).json(newItem);
	} catch (err) {
		return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
	}
};
