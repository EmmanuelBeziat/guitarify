import { db } from '../utils/database.js'
import { RecordNotFound } from '../classes/errors/index.js'

class Mastery {
	constructor () {
		this.tableName = 'songmastery'
	}

	async list () {
		return await db[this.tableName].findMany({
			orderBy: {
				id: 'asc',
			},
		})
	}

	async show (id) {
		const mastery = await db[this.tableName].findUnique({
			where: { id: parseInt(id) },
		})

		if (!mastery) {
			throw new RecordNotFound('Mastery doesn’t exist')
		}

		return mastery
	}

	async create (query) {
		return await db[this.tableName].create({
			data: {
				name: query.name,
			},
		})
	}

	async update (id, query) {
		return await db[this.tableName].update({
			where: { id: parseInt(id) },
			data: query,
		})
	}

	async delete (id) {
		return await db[this.tableName].delete({
			where: { id: parseInt(id) }
		})
	}
}

export default new Mastery()
