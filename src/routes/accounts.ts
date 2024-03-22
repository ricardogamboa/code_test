import { Router } from 'express';
import { getAccountByUserEmail } from "../controllers/accounts.js";

const accountsRouter = Router();

accountsRouter.get('/:userEmail', getAccountByUserEmail);

export default accountsRouter;
