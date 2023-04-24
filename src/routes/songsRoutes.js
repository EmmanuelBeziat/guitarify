import { SongController } from '../controllers/index.js'

export const songsRoutes = app => {
	const songs = new SongController()

	app.get('/songs', songs.list)

	app.post('/songs', (request, reply) => {
		const data = songs.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Song sucessfully created' }, data })
	})

	app.get('/song/:uuid', songs.show)
	app.patch('/song/:uuid', songs.update)
	app.delete('/song/:uuid', songs.delete)
}
