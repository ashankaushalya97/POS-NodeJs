import express = require("express");
import customerRouter from './customer-dispatcher';
import itemRouter from './item-dispatcher';

const router = express.Router();
export default router;

router.use(express.json());
router.use('/api/v1/customers/',customerRouter);
router.use('/api/v1/items/',itemRouter);