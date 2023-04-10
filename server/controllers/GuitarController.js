import Guitar from '../models/Guitar.js'

export class GuitarController {
	list () {
		return Guitar.list()
	}

	show (req) {
		return Guitar.show(req.params.uuid, { ...req.query })
	}

	create (req) {
		return Guitar.create({ ...req.query })
	}

	update (req) {
		return Guitar.update(req.params.uuid, { ...req.query })
	}

	delete (req) {
		return Guitar.delete(req.query.uuid)
	}
}
