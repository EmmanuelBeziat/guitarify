import { db } from '../database.js'
import { RecordNotFound } from '../classes/errors/RecordNotFound.js'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

class Song {
	constructor () {
		this.tableName = 'Songs'
	}

	list () {
		return db.prepare(`SELECT * FROM ${this.tableName}`).all()
	}

	show (uuid) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE uuid = ?`).get(uuid)
		if (stmt === undefined) {
			throw new RecordNotFound('Song doesn’t exist')
		}
		return stmt
	}

	create (query) {
		const stmt = db.prepare(`INSERT INTO ${this.tableName} VALUES (NULL, @uuid, @url, @songKey, @tuningId,@createdAt, @modifiedAt, @userId)`)
		const info = stmt.run({
				uuid: uuidv4(),
				url: query.url,
				songKey: query.songKey,
				tuningId: query.tuningId,
				createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				modifiedAt: '',
				userId: query.userId,
			})
		return info
	}

	update (uuid, query) {
		const params = []
		Object.entries(query).forEach(item => params.push(`${item[0]} = '${item[1]}'`))
		const stmt = db.prepare(`UPDATE ${this.tableName} SET ${params.join(', ')} WHERE uuid = (@uuid)`)
		const info = stmt.run({ uuid })
		return info
	}

	delete (uuid) {
		return db.prepare(`DELETE FROM ${this.tableName} WHERE uuid = ?`).run(uuid)
	}
}

export default new Song()
