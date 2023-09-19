import { StringsController } from '../controllers/index.js'

export const stringsRoutes = app => {
	const strings = new StringsController()

	app.get('/strings', async (request, reply) => {
		const stringsList = await strings.list()
		reply.send(stringsList)
	})

	app.post('/strings', async (request, reply) => {
		const stringsSet = await strings.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Strings set sucessfully created' }, stringsSet })
	})

	app.get('/strings/:id', async (request, reply) => {
		const stringsSet = await strings.show(request)
		reply.send(stringsSet)
	})

	app.patch('/strings/:id', async (request, reply) => {
		const stringsSet = await strings.update(request)
		reply.send({ meta: { code: 200, message: 'Strings set successfully updated' }, stringsSet})
	})

	app.delete('/strings/:id', async (request, reply) => {
		await strings.delete(request)
		reply.send({ meta: { code: 200, message: 'Strings set successfully deleted' }})
	})
}
