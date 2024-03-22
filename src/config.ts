import dotenv from 'dotenv';

dotenv.config();

export const DB_URL : string = process.env.DB_URL as string;
export const FRONTEND_URL : string = process.env.FRONTEND_URL as string;
export const PORT : string = process.env.PORT as string;
