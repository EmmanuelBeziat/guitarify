import Mastery from '../models/Mastery.js'

export class MasteryController {
	list () {
		return Mastery.list()
	}

	show (request) {
		return Mastery.show(request.params.id || request.query.id)
	}

	create (request) {
		return Mastery.create({ ...request.query })
	}

	update (request) {
		return Mastery.update(request.params.id, { ...request.query })
	}

	delete (request) {
		return Mastery.delete(request.params.id || request.query.id)
	}
}
