import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constant/index.js';

export const hashPassword = async (password) => {
	const hashedPassword = await bcrypt.hash(password, 15);
	return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
	const result = await bcrypt.compare(plainPassword, hashedPassword);
	return result;
};

export const verifyToken = async (req, res, next) => {
	// console.log('req.headers', req.headers);
	const authHeader = req.headers.authorization;
	// console.log('authService header: ', authHeader);

	if (authHeader) {
		let token = '';

		if (authHeader.startsWith('Bearer ')) {
			token = authHeader.substring(7, authHeader.length);
		} else token = authHeader;

		// console.log('token: ', token);
		jwt.verify(token, process.env.MONGOOSE_CONNECTION, (err, user) => {
			if (err) return res.status(403).json('Toke is not valid');
			req.user = user;
			// console.log('user', req.user);
			next();
		});
	} else {
		res.status(HTTP_STATUS.UNAUTHORIZED).json('UNAUTHORIZED');
	}
};
