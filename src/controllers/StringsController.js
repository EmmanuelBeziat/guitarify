import Strings from '../models/Strings.js'

export class StringsController {
	list () {
		return Strings.list()
	}

	show (req) {
		return Strings.show(req.params.id, { ...req.query })
	}

	create (req) {
		return Strings.create({ ...req.query })
	}

	update (req) {
		return Strings.update(req.params.id, { ...req.query })
	}

	delete (req) {
		return Strings.delete(req.query.id)
	}
}
