import Playlist from '../models/Playlist.js'

export class PlaylistController {
	list () {
		return Playlist.list()
	}

	show (req) {
		return Playlist.show(req.params.id, { ...req.query })
	}

	create (req) {
		return Playlist.create({ ...req.query })
	}

	update (req) {
		return Playlist.update(req.params.id, { ...req.query })
	}

	delete (req) {
		return Playlist.delete(req.query.id)
	}
}
