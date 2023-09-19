import { db } from '../utils/database.js'
import { RecordNotFound, RecordIncomplete } from '../classes/errors/index.js'
import { v4 as uuidv4 } from 'uuid'

class Song {
	constructor () {
		this.tableName = 'songs'
	}

	async list () {
		return await db[this.tableName].findMany()
	}

	async show (uuid) {
		const song = await db[this.tableName].findUnique({
			where: { uuid }
		})

		if (song === undefined) {
			throw new RecordNotFound('Song doesn’t exist')
		}

		return song
	}

	async create (query) {
		const song = await db[this.tableName].create({
			data: {
				uuid: uuidv4(),
				url: query.url,
				tuningId: parseInt(query.tuningId),
				songKey: query.songKey,
				masteryId: parseInt(query.masteryId),
				tablatureURL: query.tablatureUrl || ''
			}
		})
		return song
	}

	async update (uuid, query) {
		return await db[this.tableName].update({
			where: { uuid },
			data: {
				...query,
				tuningId: query.tuningId ? parseInt(query.tuningId) : undefined,
				masteryId: query.masteryId ? parseInt(query.masteryId) : undefined
			}
		})
	}

	async delete (uuid) {
		return await db[this.tableName].delete({
			where: { uuid }
		})
	}
}

export default new Song()
