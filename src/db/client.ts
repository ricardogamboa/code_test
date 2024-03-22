import pg from 'pg';

import { DB_URL } from './../config.js';

const { Pool } = pg;

export const dbPool = new Pool({
  connectionString: DB_URL,
})
