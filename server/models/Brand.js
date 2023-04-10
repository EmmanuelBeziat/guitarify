import { db } from '../database.js'
import { RecordNotFound } from '../classes/errors/RecordNotFound.js'
import dayjs from 'dayjs'

class Brand {
	constructor () {
		this.tableName = 'GuitarBrands'
	}

	list () {
		return db.prepare(`SELECT * FROM ${this.tableName}`).all()
	}

	show (id) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id)
		if (stmt === undefined) {
			throw new RecordNotFound('Brand doesn’t exist')
		}
		return stmt
	}

	create (query) {
		const stmt = db.prepare(`INSERT INTO ${this.tableName} VALUES (NULL, @name, @createdAt, @picture)`)
		const info = stmt.run({
				name: query.name,
				createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				picture: query.picture || '',
			})
		return info
	}

	update (id, query) {
		const params = []
		Object.entries(query).forEach(item => params.push(`${item[0]} = '${item[1]}'`))
		const stmt = db.prepare(`UPDATE ${this.tableName} SET ${params.join(', ')} WHERE id = (@id)`)
		const info = stmt.run({ id })
		console.log(info)
		return info
	}

	delete (id) {
		return db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id)
	}
}

export default new Brand()
