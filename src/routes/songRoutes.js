import { SongController } from '../controllers/index.js'

export const songRoutes = app => {
	const song = new SongController()

	app.get('/song', async (request, reply) => {
		const list = await song.list()
		reply.send(list)
	})

	app.post('/song', async (request, reply) => {
		const data = await song.create(request)
		reply.send({ meta: { code: 201, message: 'Song sucessfully created' }, data })
	})

	app.get('/song/:uuid', async (request, reply) => {
		const data = await song.show(request)
		reply.send(data)
	})

	app.patch('/song/:uuid', async (request, reply) => {
		const data = await song.update(request)
		reply.send({ meta: { code: 200, message: 'Song successfully updated' }, data})
	})

	app.delete('/song/:uuid', async (request, reply) => {
		await song.delete(request)
		reply.send({ meta: { code: 200, message: 'Song successfully deleted' }})
	})
}
