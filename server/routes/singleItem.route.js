import express from 'express';

import { getListItems, getSingleItem, createItem } from '../controller/singleItem.controller.js';

const router = express.Router();

router.get('/', getListItems);
router.get('/:id', getSingleItem);
router.post('/', createItem);

export default router;
