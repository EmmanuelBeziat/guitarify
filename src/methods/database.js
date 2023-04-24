import Database from 'better-sqlite3'

/**
 * Connect to the database
 */
export const db = new Database(process.env.API_DATABASE, { fileMustExist: true })
