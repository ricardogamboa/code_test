import { Router } from 'express';
import transactionsRouter from './transactions.js';
import accountsRouter from './accounts.js';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/accounts', accountsRouter);

export default router;
