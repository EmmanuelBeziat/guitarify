import Song from '../models/Song.js'

export class SongController {
	list () {
		return Song.list()
	}

	show (req) {
		return Song.show(req.params.uuid, { ...req.query })
	}

	create (req) {
		return Song.create({ ...req.query })
	}

	update (req) {
		return Song.update(req.params.uuid, { ...req.query })
	}

	delete (req) {
		return Song.delete(req.query.uuid)
	}
}
