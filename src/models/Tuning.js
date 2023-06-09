import { db } from '../methods/database.js'
import { RecordNotFound } from '../classes/errors/RecordNotFound.js'
import dayjs from 'dayjs'

class Tuning {
	constructor () {
		this.tableName = 'GuitarTuning'
	}

	list () {
		return db.prepare(`SELECT * FROM ${this.tableName}`).all()
	}

	show (id) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id)
		if (stmt === undefined) {
			throw new RecordNotFound('Tuning doesn’t exist')
		}
		return stmt
	}

	create (query) {
		const stmt = db.prepare(`INSERT INTO ${this.tableName} VALUES (NULL, @numberOfStrings, @name, @shortName, @tuning)`)
		const info = stmt.run({
				numberOfStrings: query.numberOfStrings,
				name: query.name,
				shortName: query.shortName,
				tuning: query.tuning || ''
			})
		return info
	}

	update (id, query) {
		const params = []
		Object.entries(query).forEach(item => params.push(`${item[0]} = '${item[1]}'`))
		const stmt = db.prepare(`UPDATE ${this.tableName} SET ${params.join(', ')} WHERE id = (@id)`)
		const info = stmt.run({ id })
		return info
	}

	delete (id) {
		return db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id)
	}
}

export default new Tuning()
