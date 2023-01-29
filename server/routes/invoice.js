import express from 'express';
import { verifyToken } from '../utils/index.js';

import { getListInvoices, getSingleInvoice, createInvoice, getListInvoicesFromEmail } from '../controller/invoice.js';

const router = express.Router();

router.get('/list-all', verifyToken, getListInvoices);
router.get('/:id', verifyToken, getSingleInvoice);
router.get('/', verifyToken, getListInvoicesFromEmail);
router.post('/', createInvoice);

export default router;
