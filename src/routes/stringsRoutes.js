import { StringsController } from '../controllers/index.js'

export const stringsRoutes = app => {
	const strings = new StringsController()

	app.get('/strings', async (request, reply) => {
		const list = await strings.list()
		reply.send(list)
	})

	app.post('/strings', async (request, reply) => {
		const data = await strings.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Strings set sucessfully created' }, data })
	})

	app.get('/strings/:id', async (request, reply) => {
		const data = await strings.show(request)
		reply.send(data)
	})

	app.patch('/strings/:id', async (request, reply) => {
		const data = await strings.update(request)
		reply.send({ meta: { code: 200, message: 'Strings set successfully updated' }, data})
	})

	app.delete('/strings/:id', async (request, reply) => {
		await strings.delete(request)
		reply.send({ meta: { code: 200, message: 'Strings set successfully deleted' }})
	})
}
