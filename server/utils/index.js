import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
	const hashedPassword = await bcrypt.hash(password, 15);
	return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
	const result = await bcrypt.compare(plainPassword, hashedPassword);
	return result;
};

export const generateAccessToken = async () => {}
