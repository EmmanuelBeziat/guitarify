import Strings from '../models/Strings.js'

export class StringsController {
	list () {
		return Strings.list()
	}

	show (request) {
		return Strings.show(request.params.id || request.query.id)
	}

	create (request) {
		return Strings.create({ ...request.query })
	}

	update (request) {
		return Strings.update(request.params.id, { ...request.query })
	}

	delete (request) {
		return Strings.delete(request.params.id || request.query.id)
	}
}
