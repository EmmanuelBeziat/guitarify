import { db } from '../database.js'
import { RecordNotFound } from '../classes/errors/RecordNotFound.js'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

class Guitar {
	constructor () {
		this.tableName = 'Guitars'
	}

	list () {
		return db.prepare(`SELECT * FROM ${this.tableName}`).all()
	}

	show (uuid) {
		const guitar = db.prepare('SELECT * FROM ${this.tableName} WHERE uuid = ?').get(uuid)
		if (guitar === undefined) {
			throw new RecordNotFound(`Guitar doesn’t exist`)
		}
		return guitar
	}

	create (query) {
		const stmt = db.prepare(`INSERT INTO ${this.tableName} VALUES (NULL, @uuid, @brandId, @model, @serialNumber, @numberOfStrings, @lastStringChange, @tuningId, @stringsId, @createdAt, @modifiedAt, @userId, @picture, @informations, @yearProduction)`)
		const info = stmt.run({
				uuid: uuidv4(),
				brandId: query.brandId,
				model: query.model,
				serialNumber: query.serialNumber,
				numberOfStrings: query.numberOfStrings,
				lastStringChange: query.lastStringChange || '',
				tuningId: query.tuningId,
				stringsId: query.stringsId,
				createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				modifiedAt: '',
				userId: query.userId,
				picture: query.picture,
				informations: query.informations || '',
				yearProduction: dayjs(query.yearProduction).format('YYYY-MM-DD HH:mm:ss'),
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

export default new Guitar()
