import { Router } from 'express';
import { createSendTransaction, createReceiveTransaction } from "../controllers/transactions.js";

const transactionsRouter = Router();

transactionsRouter.post('/:userEmail/send', createSendTransaction);
transactionsRouter.post('/:userEmail/receive', createReceiveTransaction);

export default transactionsRouter;
