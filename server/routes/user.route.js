import express from 'express';

// import { signUpUser, loginUser, getListUsers, getSingleUser, deleteUser } from '../controller/user.controller.js';
import { signUpUser, loginUser } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
// router.get('/', getListUsers);
// router.get('/:id', getSingleUser);
// router.delete('/:id', deleteUser);

export default router;
