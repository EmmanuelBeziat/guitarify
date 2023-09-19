import Song from '../models/Song.js'

export class SongController {
	list () {
		return Song.list()
	}

	show (request) {
		return Song.show(request.params.uuid, { ...request.query })
	}

	create (request) {
		return Song.create({ ...request.query })
	}

	update (request) {
		return Song.update(request.params.uuid, { ...request.query })
	}

	delete (request) {
		return Song.delete(request.query.uuid)
	}
}
