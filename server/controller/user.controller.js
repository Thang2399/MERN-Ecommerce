import UserSchema from '../model/user.js';
import { HTTP_RESPONSE_MESSAGE, HTTP_STATUS } from '../constant/index.js';
import { comparePassword, hashPassword } from '../utils/index.js';

import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const signUpUser = async (req, res) => {
	try {
		const userBody = req.body;

		userBody.password = await hashPassword(userBody.password);

		const newUser = await UserSchema(userBody);

		await newUser.save();
		const response = {
			message: HTTP_RESPONSE_MESSAGE.AUTHENTICATION.CREATE_SUCCESS,
			status: HTTP_STATUS.CREATE_SUCCESS,
			data: {
				_id: newUser._id,
				userName: newUser.userName,
				userEmail: newUser.email,
				userRole: newUser.role,
				userPhoneNumber: newUser.phoneNumber
			}
		};
		return res.status(HTTP_STATUS.CREATE_SUCCESS).json(response);
	} catch (err) {
		// console.log(err);
		console.log('err', err);
		const convertedError = JSON.stringify(err);
		return res.status(HTTP_STATUS.BAD_REQUEST).send(convertedError);
	}
};

export const loginUser = async (req, res) => {
	try {
		const specificUser = await UserSchema.findOne({ email: req.body.email });

		const comparePasswordResult = await comparePassword(req.body.password, specificUser.password);
		if (specificUser && comparePasswordResult) {
			const token = await jwt.sign(
				{
					_id: specificUser._id,
					email: specificUser.email,
					phoneNumber: specificUser.phoneNumber,
					role: specificUser.role,
					userName: specificUser.userName
				},
				process.env.MONGOOSE_CONNECTION,
				{ expiresIn: '1d' }
			);

			const response = {
				message: HTTP_RESPONSE_MESSAGE.LOGIN.LOGIN_SUCCESS,
				status: HTTP_STATUS.CREATE_SUCCESS,
				data: {
					_id: specificUser._id,
					userName: specificUser.userName,
					userEmail: specificUser.email,
					userRole: specificUser.role,
					userPhoneNumber: specificUser.phoneNumber,
					accessToken: token
				}
			};

			return res.status(HTTP_STATUS.CREATE_SUCCESS).json(response);
		} else {
			return res.status(HTTP_STATUS.UNAUTHORIZED).json({ mesage: HTTP_RESPONSE_MESSAGE.LOGIN.WRONG_USER_EMAIL_OR_PASSWORD });
		}
	} catch (err) {
		console.log('err', err);
		return res.status(HTTP_STATUS.UNAUTHORIZED).json({ mesage: HTTP_RESPONSE_MESSAGE.LOGIN.WRONG_USER_EMAIL_OR_PASSWORD });
	}
};

export default router;