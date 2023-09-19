import { db } from '../utils/database.js'
import { passwordHash } from '../utils/hash.js'
import { RecordNotFound, RecordIncomplete } from '../classes/errors/index.js'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'


class User {
	constructor () {
		this.tableName = 'users'
	}

	async list () {
		return await db[this.tableName].findMany()
	}

	async show (uuid) {
		const user = await db[this.tableName].findUnique({
			where: { uuid }
		})

		if (user === undefined) {
			throw new RecordNotFound('User doesn’t exist')
		}

		return user
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
