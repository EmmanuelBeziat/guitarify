import { db } from '../utils/database.js'
import { RecordNotFound } from '../classes/errors/index.js'
import { v4 as uuidv4 } from 'uuid'

class Playlist {
	constructor () {
		this.tableName = 'playlists'
		this.playlistRelation = 'playlistsongs'
	}

	async list () {
		const list = await db[this.tableName].findMany()

		if (!list.length) {
			throw new RecordNotFound('No records found')
		}

		return list
	}

	async show (uuid) {
		const playlist = await db[this.tableName].findUnique({
			where: { uuid: uuid }
		})

		if (playlist === undefined) {
			throw new RecordNotFound('Playlist doesn’t exist')
		}

		return playlist
	}

	async create (query) {
		const uuid = uuidv4()
		return await db[this.tableName].create({
			data: {
				uuid,
				name: query.name,
				userId: parseInt(query.userId),
			}
		})
	}

	async update (uuid, query) {
		return await db[this.tableName].update({
			where: { uuid },
			data: query
		})
	}

	async delete (uuid) {
		return await db[this.tableName].delete({
			where: { uuid }
		})
	}

	async insert (playlist, song) {
		if (this.existingRecord(playlist, song).length) {
			throw new Error('This song is already in that playlist')
		}

		return await db[this.playlistRelation].create({
			data: {
				playlistId: playlist,
				songId: song,
			}
		})
	}

	async remove (playlist, song) {
		return await db[this.playlistRelation].deleteMany({
			where: {
				playlistId: playlist,
				songId: song,
			}
		})
	}

	async existingRecord (playlist, song) {
		return await db[this.playlistRelation].findMany({
			where: {
				playlistId: playlist,
				songId: song,
			}
		})
	}
}

export default new Playlist()
