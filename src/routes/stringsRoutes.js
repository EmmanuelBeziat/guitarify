import { StringsController } from '../controllers/index.js'

export const stringsRoutes = app => {
	const strings = new StringsController()

	app.get('/strings', strings.list)

	app.post('/strings', (request, reply) => {
		const data = strings.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Strings sucessfully created' }, data })
	})

	app.get('/strings/:id', strings.show)
	app.patch('/strings/:id', strings.update)
	app.delete('/strings/:id', strings.delete)
}
