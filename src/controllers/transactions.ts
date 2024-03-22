import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { getDBAccountByUserEmail } from '../daos/accounts.js';
import { insertSPTransaction } from '../daos/transactions.js';
import Account from '../types/account.types.js';

export const createSendTransaction = async (req: Request, res: Response): Promise<Response> => {
  const { amount } = req.body;
  try {
    // Validate amount
    const response: QueryResult<Account> = await getDBAccountByUserEmail(req.params.userEmail);
    const { balance } = response.rows[0];
    if (balance < amount) {
      return res.status(400).json("Insufficient balance")
    }
    else {
      await insertSPTransaction({ userEmail: req.params.userEmail, amount: amount, type: 'send'});
	  return res.status(200).json({message: 'Transaction recorded successfully'});
    }
  } catch (error) {
	return res.status(500).json('Internal Server error');
  }
}

export const createReceiveTransaction = async (req: Request, res: Response): Promise<Response> => {
  const { amount } = req.body;

  try {
	await insertSPTransaction({ userEmail: req.params.userEmail, amount: amount, type: 'receive'});
	return res.status(200).json({message: 'Transaction recorded successfully'});
  } catch (error) {
    console.log(error)
	return res.status(500).json('Internal Server error');
  }
}
