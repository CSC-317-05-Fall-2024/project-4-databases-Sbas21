/* Establish the DB connection pool here. */
import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();
const config = {
    connectionString: process.env.CONNECTION_STRING
};
export const pool = new pg.Pool(config);