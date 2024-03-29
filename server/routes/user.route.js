import express from 'express';

// import { signUpUser, loginUser, getListUsers, getSingleUser, deleteUser } from '../controller/user.controller.js';
import { signUpUser, loginUser, forgotPassword, resetPassword } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
// router.get('/', getListUsers);
// router.get('/:id', getSingleUser);
// router.delete('/:id', deleteUser);

export default router;
