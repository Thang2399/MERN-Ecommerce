import mongoose from 'mongoose';
import { USER_GENDER, USER_ROLE } from '../constant/index.js';

const userSchema = mongoose.Schema({
	userName: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phoneNumber: { type: String, required: true, unique: true },
	role: { type: String, required: true, default: USER_ROLE.USER },
	gender: { type: String, required: true, default: USER_GENDER.MALE },
	dateOfBirth: { type: Date }
});

const UserSchema = mongoose.model('UserSchema', userSchema);

export default UserSchema;
