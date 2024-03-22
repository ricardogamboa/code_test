import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { getDBAccountByUserEmail } from '../daos/accounts.js';

export const getAccountByUserEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult = await getDBAccountByUserEmail(req.params.userEmail);
    return res.status(200).json(response.rows);
  }
  catch (error) {
    return res.status(500).json('Internal Server Error');
  }  
}
