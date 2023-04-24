import User from '../models/User.js'

export class UserController {
	list () {
		return User.list()
	}

	show (req) {
		return User.show(req.params.uuid, { ...req.query })
	}

	create (req) {
		return User.create({ ...req.query })
	}

	update (req) {
		return User.update(req.params.uuid, { ...req.query })
	}

	delete (req) {
		return User.delete(req.query.uuid)
	}
}
