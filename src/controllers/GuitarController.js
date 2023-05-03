import Guitar from '../models/Guitar.js'

export class GuitarController {
	list () {
		return Guitar.list()
	}

	get (uuid) {
		return Guitar.get(uuid)
	}

	show (uuid) {
		return Guitar.show(uuid)
	}

	create (request) {
		return Guitar.create({ ...request.query })
	}

	update (request) {
		return Guitar.update(request.params.uuid, { ...request.query })
	}

	delete (request) {
		return Guitar.delete(request.query.uuid)
	}
}
