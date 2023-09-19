import { db } from '../utils/database.js'
import { RecordNotFound, RecordIncomplete } from '../classes/errors/index.js'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

class Guitar {
	constructor () {
		this.tableName = 'guitars'
	}

	async list (userId = 1) {
		const guitars = await db[this.tableName].findMany({
			where: { userId: parseInt(userId) },
			include: {
				brand: true,
				strings: true,
				tuning: true
			}
		})

		if (!guitars) {
      throw new RecordNotFound('No guitars found for this user')
    }

    guitars.forEach(guitar => {
      if (!guitar.brand || !guitar.strings || !guitar.tuning) {
        throw new RecordIncomplete('Incomplete guitar data')
      }
    })

		return guitars
	}

	async show (uuid) {
		const guitar = await db[this.tableName].findUnique({
			where: { uuid },
			include: {
				brand: true,
				strings: true,
				tuning: true
			}
		})

		if (!guitar) {
      throw new RecordNotFound('Guitar doesn’t exist')
    }

    if (!guitar.brand || !guitar.strings || !guitar.tuning) {
      throw new RecordIncomplete('Incomplete guitar data')
    }

		return guitar
	}

	async create (query) {
		const uuid = uuidv4()
		const data = {
				uuid,
				brandId: parseInt(query.brandId),
				model: query.model,
				serialNumber: query.serialNumber,
				numberOfStrings: parseInt(query.numberOfStrings),
				lastStringChange:  dayjs(query.lastStringChange).toISOString() || '',
				tuningId: parseInt(query.tuningId),
				stringsId: parseInt(query.stringsId),
				userId: parseInt(query.userId) || 1,
				picture: query.picture || '',
				informations: query.informations || '',
				yearProduction: dayjs(query.yearProduction).toISOString(),
		}
		console.log(data)
		return await db[this.tableName].create({
			data
		})
	}

	async update (uuid, query) {
		return await db[this.tableName].update({
			where: { uuid },
			data: {
				...query,
				brandId: query.brandId ? parseInt(query.brandId) : undefined,
				numberOfStrings: query.numberOfStrings ? parseInt(query.numberOfStrings) : undefined,
				tuningId: query.tuningId ? parseInt(query.tuningId) : undefined,
				stringsId: query.stringsId ? parseInt(query.stringsId) : undefined,
				userId: query.userId ? parseInt(query.userId) : undefined,
			}
		})
	}

	async delete (uuid) {
		return await db[this.tableName].delete({
			where: { uuid }
		})
	}
}

export default new Guitar()
