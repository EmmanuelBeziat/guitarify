import { db } from '../utils/database.js'
import { RecordNotFound, RecordIncomplete } from '../classes/errors/index.js'

class Strings {
	constructor () {
		this.tableName = 'guitarstrings'
	}

	async list () {
		return await db[this.tableName].findMany({
			orderBy: [
				{ brand: 'asc' },
				{ model: 'asc' }
			]
		})
	}

	async show (id) {
		const string = await db[this.tableName].findUnique({
			where: { id: parseInt(id) }
		})

		if (string === undefined) {
			throw new RecordNotFound('Strings doesn’t exist')
		}

		return string
	}

	async create (query) {
		return await db[this.tableName].create({
			data: {
				brand: query.brand,
				model: query.model,
				gauge: query.gauge,
			}
		})
	}

	async update (id, query) {
		return await db[this.tableName].update({
			where: { id: parseInt(id) },
			data: query
		})
	}

	async delete (id) {
		return await db[this.tableName].delete({
			where: { id: parseInt(id) }
		})
	}
}

export default new Strings()
