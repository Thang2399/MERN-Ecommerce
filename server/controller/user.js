import UserSchema from '../model/user.js';
import { HTTP_RESPONSE_MESSAGE, HTTP_STATUS } from '../constant/index.js';
import { comparePassword, hashPassword } from '../utils/index.js';

import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// export const checkExistingData = (payload) => {
// 	const userName = payload.userName;
// 	const email = payload.email;
// 	const phoneNumber = payload.phoneNumber;
// 	// const message = '';
//
// 	console.log('userName', userName);
// 	// check duplicate userName
// 	UserSchema.findOne({ userName }, function (err, user) {
// 		let message = '';
// 		if (err) {
// 			console.log('error', err);
// 			return console.log(err);
// 		}
// 		if (user) {
// 			console.log('user already exists', user);
// 			message = 'Duplicate user';
// 		}
// 		console.log('phoneNumber', phoneNumber);
// 		return message;
// 	});
// };

export const signUpUser = async (req, res) => {
	try {
		console.log('check run');
		const userBody = req.body;

		// await checkExistingData(userBody);
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
		console.log(err);
		return res.status(HTTP_STATUS.BAD_REQUEST).json(err);
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

export const logoutUser = async (req, res) => {
	try {
		const token = req.body.accessToken;
		const response = jwt.sign(token, '');
		console.log('response', response);
	} catch (err) {
		console.log('err', err);
		return res.status(HTTP_STATUS.UNAUTHORIZED).json({ mesage: HTTP_RESPONSE_MESSAGE.LOGIN.UNAUTHORIZED });
	}
};

export default router;
