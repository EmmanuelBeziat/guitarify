import { db } from '../utils/database.js'
import { RecordNotFound, RecordIncomplete } from '../classes/errors/index.js'

class Brand {
	constructor () {
		this.tableName = 'guitarbrands'
	}

	async list () {
		return await db[this.tableName].findMany({
			orderBy: {
				name: 'asc',
			},
		})
	}

	async show (id) {
		const brand = await db[this.tableName].findUnique({
			where: { id: parseInt(id) },
		})

		if (!brand) {
			throw new RecordNotFound('Brand doesn’t exist')
		}

		return brand
	}

	async create (query) {
		return await db[this.tableName].create({
			data: {
				name: query.name,
				picture: query.picture || '',
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

export default new Brand()
