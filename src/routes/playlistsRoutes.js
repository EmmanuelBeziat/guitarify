import { PlaylistController } from '../controllers/index.js'

export const playlistsRoutes = app => {
	const playlists = new PlaylistController()

	app.get('/playlists', async (request, reply) => {
		const playlistsList = await playlists.list()
		reply.send(playlistsList)
	})

	app.post('/playlists', async (request, reply) => {
		const playlist = await playlists.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Playlist sucessfully created' }, playlist })
	})

	app.get('/playlist/:id', async (request, reply) => {
		const playlist = await playlists.show(request)
		reply.send(playlist)
	})

	app.patch('/playlist/:id', async (request, reply) => {
		const playlist = await playlists.update(request)
		reply.send({ meta: { code: 200, message: 'Playlist successfully updated' }, playlist})
	})

	app.delete('/playlist/:id', async (request, reply) => {
		await playlists.delete(request)
		reply.send({ meta: { code: 200, message: 'Playlist successfully deleted' }})
	})
}
