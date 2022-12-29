import express from 'express';

import { getListInvoices, getSingleInvoice, createInvoice } from '../controller/invoice.js';

const router = express.Router();

router.get('/', getListInvoices);
router.get('/:id', getSingleInvoice);
router.post('/', createInvoice);

export default router;
