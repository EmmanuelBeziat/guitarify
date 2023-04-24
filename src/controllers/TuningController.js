import Tuning from '../models/Tuning.js'

export class TuningController {
	list () {
		return Tuning.list()
	}

	show (req) {
		return Tuning.show(req.params.id, { ...req.query })
	}

	create (req) {
		return Tuning.create({ ...req.query })
	}

	update (req) {
		return Tuning.update(req.params.id, { ...req.query })
	}

	delete (req) {
		return Tuning.delete(req.query.id)
	}
}
