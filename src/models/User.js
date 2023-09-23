import { db } from '../utils/database.js'
import { passwordHash } from '../utils/hash.js'
import { RecordNotFound } from '../classes/errors/index.js'
import { v4 as uuidv4 } from 'uuid'

class User {
	constructor () {
		this.tableName = 'users'
	}

	async list () {
		const list = await db[this.tableName].findMany()

		if (!list.length) {
			throw new RecordNotFound('No record found')
		}

		return list
	}

	async show (uuid) {
		const data = await db[this.tableName].findUnique({
			where: { uuid }
		})

		if (!data) {
			throw new RecordNotFound('User doesn’t exist')
		}

		return data
	}

	async showByIdentifier (identifier) {
		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

		if (identifier.includes('@')) {
			return await db[this.tableName].findUnique({
				where: { email: identifier }
			})
		}

		else if (uuidRegex.test(identifier)) {
			return await db[this.tableName].findUnique({
				where: { uuid: identifier }
			})
		}

		else {
			return await db[this.tableName].findUnique({
				where: { username: identifier }
			})
		}
	}

	async create (query) {
		const user = await db[this.tableName].create({
			data: {
				uuid: uuidv4(),
				username: query.username,
				email: query.email,
				password: passwordHash(query.password)
			}
		})
		return user
	}

	async update (uuid, query) {
		return await db[this.tableName].update({
			where: { uuid },
			data: {
				...query,
				password: query.password ? passwordHash(query.password) : undefined,
			}
		})
	}

	async delete (uuid) {
		return await db[this.tableName].delete({
			where: { uuid }
		})
	}
}

export default new User()
