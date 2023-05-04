import { db } from '../methods/database.js'
import { RecordNotFound } from '../classes/errors/RecordNotFound.js'
import dayjs from 'dayjs'

class Strings {
	constructor () {
		this.tableName = 'GuitarStrings'
	}

	list () {
		return db.prepare(`SELECT * FROM ${this.tableName} ORDER BY brand, model`).all()
	}

	show (id) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id)
		if (stmt === undefined) {
			throw new RecordNotFound('Strings doesn’t exist')
		}
		return stmt
	}

	create (query) {
		const stmt = db.prepare(`INSERT INTO ${this.tableName} VALUES (NULL, @brand, @model, @gauge)`)
		const info = stmt.run({
				brand: query.brand,
				model: query.model,
				gauge: query.gauge,
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

export default new Strings()
