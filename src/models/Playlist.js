import { db } from '../utils/database.js'
import { RecordNotFound } from '../classes/errors/index.js'

class Playlist {
	constructor () {
		this.tableName = 'playlist'
	}

	async list () {
		return await db[this.tableName].findMany()
	}

	async show (id) {
		const playlist = await db[this.tableName].findUnique({
			where: { id: parseInt(id) }
		})

		if (playlist === undefined) {
			throw new RecordNotFound('Playlist doesn’t exist')
		}

		return playlist
	}

	async create (query) {
		const playlist = await db[this.tableName].create({
			data: query
		})
		return playlist
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

export default new Playlist()
