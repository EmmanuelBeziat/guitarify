import User from '../models/User.js'

export class UserController {
	list () {
		return User.list()
	}

	show (request) {
		return User.show(request.params.uuid, { ...request.query })
	}

	create (request) {
		return User.create({ ...request.query })
	}

	update (request) {
		return User.update(request.params.uuid, { ...request.query })
	}

	delete (request) {
		return User.delete(request.query.uuid)
	}
}
