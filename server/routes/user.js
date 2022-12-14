import express from 'express';

// import { signUpUser, loginUser, getListUsers, getSingleUser, deleteUser } from '../controller/user.js';
import { signUpUser, loginUser, logoutUser } from '../controller/user.js';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
// router.get('/', getListUsers);
// router.get('/:id', getSingleUser);
// router.delete('/:id', deleteUser);

export default router;
