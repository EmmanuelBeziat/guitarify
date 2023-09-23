import Tuning from '../models/Tuning.js'

export class TuningController {
	list () {
		return Tuning.list()
	}

	show (request) {
		return Tuning.show(request.params.id || request.query.id)
	}

	create (request) {
		return Tuning.create({ ...request.query })
	}

	update (request) {
		return Tuning.update(request.params.id, { ...request.query })
	}

	delete (request) {
		return Tuning.delete(request.params.id || request.query.id)
	}
}
