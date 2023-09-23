import Playlist from '../models/Playlist.js'

export class PlaylistController {
	list () {
		return Playlist.list()
	}

	show (req) {
		return Playlist.show(req.params.uuid || req.query.uuid)
	}

	create (req) {
		return Playlist.create({ ...req.query })
	}

	update (req) {
		return Playlist.update(req.params.uuid, { ...req.query })
	}

	delete (req) {
		return Playlist.delete(req.params.uuid || req.query.uuid)
	}

	insert (req) {
		return Playlist.insert(req.query.playlist, req.query.song)
	}

	remove (req) {
		return Playlist.remove(req.query.playlist, req.query.song)
	}
}
