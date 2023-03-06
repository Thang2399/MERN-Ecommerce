import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constant/index.js';
import nodemailer from 'nodemailer';

export const hashPassword = async (password) => {
	const hashedPassword = await bcrypt.hash(password, 15);
	return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
	const result = await bcrypt.compare(plainPassword, hashedPassword);
	return result;
};

export const verifyToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		let token = '';

		if (authHeader.startsWith('Bearer ')) {
			token = authHeader.substring(7, authHeader.length);
		} else token = authHeader;

		jwt.verify(token, process.env.MONGOOSE_CONNECTION, (err, user) => {
			if (err) return res.status(403).json('Toke is not valid');
			req.user = user;
			next();
		});
	} else {
		res.status(HTTP_STATUS.UNAUTHORIZED).json('UNAUTHORIZED');
	}
};

export const generateOtp = () => {
	const randomNumber = Math.floor(100000 + Math.random() * 900000);
	return randomNumber;
};

export const sendEmail = async (email, subject, text, res) => {
	try {
		const transporter = nodemailer.createTransport({
			// host: hostname || IP address connect to
			host: process.env.SEND_EMAIL_HOST,
			port: 465,
			secure: true,
			auth: {
				user: process.env.AUTH_EMAIL_USER,
				pass: process.env.AUTH_EMAIL_PASSWORD
			}
		});

		await transporter.sendMail({
			from: process.env.AUTH_EMAIL_USER,
			to: email,
			subject,
			text
		});

		console.log('Send successfully');

		return HTTP_STATUS.SUCCESS;
	} catch (err) {
		console.log('error sending', err);
		return HTTP_STATUS.BAD_REQUEST;
	}
};
