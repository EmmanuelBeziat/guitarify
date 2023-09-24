import { PlaylistController } from '../controllers/index.js'

export const playlistRoutes = app => {
	const playlist = new PlaylistController()

	app.get('/playlist', async (request, reply) => {
		const list = await playlist.list()
		reply.send(list)
	})

	app.post('/playlist', async (request, reply) => {
		const data = await playlist.create(request)
		reply.send({ meta: { code: 201, message: 'Playlist created' }, data })
	})

	app.get('/playlist/:uuid', async (request, reply) => {
		const data = await playlist.show(request)
		reply.send(data)
	})

	app.patch('/playlist/:uuid', async (request, reply) => {
		const data = await playlist.update(request)
		reply.send({ meta: { code: 200, message: 'Playlist updated' }, data})
	})

	app.delete('/playlist/:uuid', async (request, reply) => {
		await playlist.delete(request)
		reply.send({ meta: { code: 200, message: 'Playlist deleted' }})
	})

	app.post('/playlist/insert', async (request, reply) => {
		await playlist.insert(request)
		reply.send({ meta: { code: 201, message: 'Song added' }})
	})

	app.delete('/playlist/remove', async (request, reply) => {
		await playlist.remove(request)
		reply.send({ meta: { code: 200, message: 'Song removed' }})
	})
}
