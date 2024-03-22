import { QueryResult } from 'pg';

import { dbPool } from '../db/client.js';
import Transaction from '../types/transaction.types.js';

export const insertSPTransaction = async (transaction: Transaction): Promise<QueryResult> => {
  try {
    return dbPool.query(
      'CALL insert_transaction($1, $2, $3)',
      [transaction.userEmail, transaction.amount.toString(), transaction.type]
    );
  }
  catch (error) {
    //TODO: use a logger
    console.log(error);
    throw error;
  }
}

export const insertDBTransaction = async (transaction: Transaction): Promise<QueryResult> => {
  try {
    return dbPool.query(
      'INSERT INTO transactions("userEmail", amount, type) VALUES ($1, $2, $3)',
      [transaction.userEmail, transaction.amount.toString(), transaction.type]
    );
  }
  catch (error) {
    //TODO: use a logger
    console.log(error);
    throw error;
  }
}


