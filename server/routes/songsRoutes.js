import { SongController } from '../controllers/index.js'

export const songsRoutes = app => {
	const songs = new SongController()

	app.get('/songs', songs.list)
	app.post('/songs', songs.create)
	app.get('/song/:uuid', songs.show)
	app.patch('/song/:uuid', songs.update)
	app.delete('/song/:uuid', songs.delete)
}
