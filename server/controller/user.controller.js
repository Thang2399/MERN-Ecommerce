import UserSchema from '../model/user.js';
import { HTTP_RESPONSE_MESSAGE, HTTP_STATUS } from '../constant/index.js';
import { comparePassword, generateOtp, hashPassword, sendEmail } from '../utils/index.js';
import jwt from 'jsonwebtoken';

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
			return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_RESPONSE_MESSAGE.LOGIN.WRONG_USER_EMAIL_OR_PASSWORD });
		}
	} catch (err) {
		console.log('err', err);
		return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_RESPONSE_MESSAGE.LOGIN.WRONG_USER_EMAIL_OR_PASSWORD });
	}
};

export const forgotPassword = async (req, res) => {
	try {
		const specificUser = await UserSchema.findOne({ email: req.body.email });
		if (specificUser) {
			const specificEmail = specificUser.email;
			const otp = generateOtp();

			const subject = 'The Fake Shop reset password otp';
			const text = `Your reset password OTP: ${otp}`;

			const sendEmailRes = await sendEmail(specificEmail, subject, text, res);
			if (sendEmailRes === HTTP_STATUS.SUCCESS) {
				const hashOtp = await hashPassword(otp.toString());
				await UserSchema.findByIdAndUpdate(specificUser._id, {
					otp: hashOtp
				}, { new: true });

				return res.status(HTTP_STATUS.SUCCESS).json({ message: HTTP_RESPONSE_MESSAGE.FORGET_RESET_PASSWORD.SEND_EMAIL_SUCCESS });
			} else {
				return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: HTTP_RESPONSE_MESSAGE.FORGET_RESET_PASSWORD.SEND_EMAIL_FAIL });
			}
		} else {
			return res.status(HTTP_STATUS.NOT_FOUND).json({ message: HTTP_RESPONSE_MESSAGE.LOGIN.USER_NOT_EXIST });
		}
	} catch (err) {
		console.error(err);
		return res.status(HTTP_STATUS.SERVER_ERROR).json({ message: HTTP_RESPONSE_MESSAGE.SERVER_ERROR });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const specificUser = await UserSchema.findOne({ email: req.body.email });
		const otp = req.body.otp;
		const newPassword = req.body.newPassword;

		if (specificUser) {
			const specificUserOtp = specificUser.otp;
			const compareOtp = await comparePassword(otp, specificUserOtp);
			if (compareOtp) {
				const specificUserId = specificUser._id;
				const newHashPassword = await hashPassword(newPassword);

				await UserSchema.findByIdAndUpdate(specificUserId, {
					password: newHashPassword,
					otp: ''
				}, { new: true });

				return res.status(HTTP_STATUS.SUCCESS).json({ message: HTTP_RESPONSE_MESSAGE.AUTHENTICATION.UPDATE_SUCCESS });
			} else {
				return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: HTTP_RESPONSE_MESSAGE.FORGET_RESET_PASSWORD.WRONG_OTP });
			}
		} else {
			return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: HTTP_RESPONSE_MESSAGE.AUTHENTICATION.WRONG_EMAIL });
		}
	} catch (err) {
		console.error(err);
		return res.status(HTTP_STATUS.SERVER_ERROR).json({ message: HTTP_RESPONSE_MESSAGE.SERVER_ERROR });
	}
};
