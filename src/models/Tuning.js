import { db } from '../utils/database.js'
import { RecordNotFound, RecordIncomplete } from '../classes/errors/index.js'

class Tuning {
	constructor () {
		this.tableName = 'guitartuning'
	}

	async list () {
		return await db[this.tableName].findMany()
	}

	async show (id) {
		const tuning = await db[this.tableName].findUnique({
			where: { id: parseInt(id) }
		})

		if (!tuning) {
			throw new RecordNotFound('Tuning doesn’t exist')
		}

		return tuning
	}

	async create (query) {
		return await db[this.tableName].create({
			data: {
				numberOfStrings: parseInt(query.numberOfStrings),
				name: query.name,
				shortName: query.shortName,
				tuning: query.tuning || ''
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

export default new Tuning()
