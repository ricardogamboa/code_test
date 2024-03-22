
import Account from '../types/account.types.js';
import Transaction from '../types/transaction.types.js';
import accountSeeds from './accounts-api-large.json' assert { type: 'json' };
import transactionSeeds from './transactions-api-large.json' assert { type: 'json' };
import { dbPool } from './client.js';
import { insertDBAccount } from '../daos/accounts.js'
import { insertDBTransaction } from '../daos/transactions.js';

export const initDB = async () => {
  try {
    // Create tables
    console.log('Creating tables');
    await dbPool.query(`CREATE TABLE accounts(
      "userEmail" VARCHAR(255) NOT NULL PRIMARY KEY,
      "balance" NUMERIC NOT NULL DEFAULT 0,
      "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
    )`);
  
    await dbPool.query(`CREATE TABLE transactions(
      "id" SERIAL PRIMARY KEY,
      "userEmail" VARCHAR(255),
      "amount" NUMERIC NOT NULL DEFAULT 0,
      "type" VARCHAR(10) NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT fk_accounts
        FOREIGN KEY("userEmail")
        REFERENCES accounts("userEmail")
    )`);

    // Insert seed data, assuming accounts balance matches transactions amounts
    console.log('Inserting Account data');
    for (const account of accountSeeds) {
      try {
        await insertDBAccount(account as Account);
      }
      catch (error) {
        console.log(`Duplicated account: ${account.userEmail}`);
      }
    }

    console.log('Inserting Transaction data');
    for (const transaction of transactionSeeds) {
      await insertDBTransaction(transaction as Transaction);
    }

    // Create Store Procedure
    // TODO: have a monthly balance so we don't need to calculate all transactions
    console.log('Creating SP');
    await dbPool.query(`CREATE OR REPLACE PROCEDURE insert_transaction(userEmail varchar(255), amount numeric, type varchar(10))
    LANGUAGE plpgsql AS
    $$
    DECLARE
    accountRec accounts%ROWTYPE;
    totalSend NUMERIC;
    totalReceive NUMERIC;
    BEGIN
      SELECT * INTO STRICT accountRec FROM accounts WHERE accounts."userEmail" = userEmail FOR UPDATE;

      IF type = 'send' AND accountRec.balance < amount THEN
        RAISE 'Insufficient balance';
      END IF;

      INSERT INTO transactions("userEmail", amount, type) VALUES (userEmail, amount, type);

      SELECT sum(transactions.amount) as total INTO totalSend FROM transactions
      WHERE transactions."userEmail" = userEmail AND transactions.type = 'send';

      SELECT sum(transactions.amount) as total INTO totalReceive FROM transactions
      WHERE transactions."userEmail" = userEmail AND transactions.type = 'receive';

      UPDATE accounts SET balance = (totalReceive - totalSend), updated_at = NOW() WHERE accounts."userEmail" = userEmail;
      COMMIT;
    END;
    $$`);
  } catch (error) {
    console.log(error);
    // Using this as a hack to avoid checks when running the server for second time
    // ideally we use something like 'CREATE TABLE IF NOT EXISTS' or a migration tool
  }
}
