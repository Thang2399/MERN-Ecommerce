import mongoose from 'mongoose';
import {USER_ROLE} from '../constant';

const userSchema = mongoose.Schema( {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    role: {type: String, required: true, default: USER_ROLE.USER}
});

const UserSchema = mongoose.model('UserSchema', userSchema);

export default UserSchema;