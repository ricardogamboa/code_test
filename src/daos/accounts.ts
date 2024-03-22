import { QueryResult } from 'pg';

import { dbPool } from '../db/client.js';
import Account from '../types/account.types.js';

export const getDBAccountByUserEmail = async (userEmail: string): Promise<QueryResult<Account>> => {
  try {
    return dbPool.query<Account>(
      'SELECT * FROM accounts WHERE "userEmail" = $1',
      [userEmail]
    );
  }
  catch (error) {
    //TODO: use a logger
    console.log(error);
    throw error;
  }  
}

export const insertDBAccount = async (account: Account): Promise<QueryResult> => {
  try {
    return dbPool.query(
      'INSERT INTO accounts("userEmail", balance) VALUES ($1, $2)',
      [account.userEmail, account.balance.toString()]
    );
  }
  catch (error) {
    //TODO: use a logger
    console.log(error);
    throw error;
  }
}
