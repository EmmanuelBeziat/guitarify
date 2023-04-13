import Database from 'better-sqlite3'

export const db = new Database(process.env.API_DATABASE, { fileMustExist: true })
