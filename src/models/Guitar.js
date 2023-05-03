import { db } from '../methods/database.js'
import { RecordNotFound } from '../classes/errors/RecordNotFound.js'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

class Guitar {
	constructor () {
		this.tableName = 'Guitars'
	}

	list () {
		const userId = '1'
		const query = `SELECT ${this.tableName}.*,
				GuitarBrands.name AS brand,
				GuitarStrings.brand AS stringsBrand,
				GuitarStrings.model AS stringsModel,
				GuitarStrings.gauge AS stringsGauge,
				GuitarTuning.tuning AS tuning,
				GuitarTuning.name AS tuningName
			FROM ${this.tableName}
			INNER JOIN GuitarBrands ON GuitarBrands.id = ${this.tableName}.brandId
			INNER JOIN GuitarStrings ON GuitarStrings.id = ${this.tableName}.stringsId
			INNER JOIN GuitarTuning ON GuitarTuning.id = ${this.tableName}.tuningId
			WHERE userId = ?`
		return db.prepare(query).all(userId)
	}

	get (uuid) {
		return db.prepare(`SELECT uuid FROM ${this.tableName} WHERE uuid = ?`).get(uuid)
	}

	show (uuid) {
		const query = `SELECT ${this.tableName}.*,
				GuitarBrands.name AS brand,
				GuitarStrings.brand AS stringsBrand,
				GuitarStrings.model AS stringsModel,
				GuitarStrings.gauge AS stringsGauge,
				GuitarTuning.tuning AS tuning,
				GuitarTuning.name AS tuningName
			FROM ${this.tableName}
			INNER JOIN GuitarBrands ON GuitarBrands.id = ${this.tableName}.brandId
			INNER JOIN GuitarStrings ON GuitarStrings.id = ${this.tableName}.stringsId
			INNER JOIN GuitarTuning ON GuitarTuning.id = ${this.tableName}.tuningId
			WHERE uuid = ?`
		const guitar = db.prepare(query).get(uuid)
		if (guitar === undefined) {
			throw new RecordNotFound(`Guitar doesn’t exist`)
		}
		return guitar
	}

	create (query) {
		const uuid = uuidv4()
		const stmt = db.prepare(`INSERT INTO ${this.tableName} VALUES (NULL, @uuid, @brandId, @model, @serialNumber, @numberOfStrings, @lastStringChange, @tuningId, @stringsId, @createdAt, @modifiedAt, @userId, @picture, @informations, @yearProduction)`)
		const info = stmt.run({
			uuid,
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

		return { info, object: this.show(uuid) }
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
