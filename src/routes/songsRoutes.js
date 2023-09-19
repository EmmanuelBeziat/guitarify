import { SongController } from '../controllers/index.js'

export const songsRoutes = app => {
	const songs = new SongController()

	app.get('/songs', async (request, reply) => {
		const songsList = await songs.list()
		reply.send(songsList)
	})

	app.post('/songs', async (request, reply) => {
		const song = await songs.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Song sucessfully created' }, song })
	})

	app.get('/song/:uuid', async (request, reply) => {
		const song = await songs.show(request)
		reply.send(song)
	})

	app.patch('/song/:uuid', async (request, reply) => {
		const song = await songs.update(request)
		reply.send({ meta: { code: 200, message: 'Song successfully updated' }, song})
	})

	app.delete('/song/:uuid', async (request, reply) => {
		await songs.delete(request)
		reply.send({ meta: { code: 200, message: 'Song successfully deleted' }})
	})
}
