import { BrandController } from '../controllers/index.js'

export const brandRoutes = app => {
	const brand = new BrandController()

	app.get('/brand', async (request, reply) => {
		const list = await brand.list()
		reply.send(list)
	})

	app.post('/brand', async (request, reply) => {
		const data = await brand.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Brand sucessfully created' }, data })
	})

	app.get('/brand/:id', async (request, reply) => {
		const data = await brand.show(request)
		reply.send(data)
	})

	app.patch('/brand/:id', async (request, reply) => {
		const data = await brand.update(request)
		reply.send({ meta: { code: 200, message: 'Brand successfully updated' }, data })
	})

	app.delete('/brand/:id', async (request, reply) => {
		await brand.delete(request)
		reply.send({ meta: { code: 200, message: 'Brand sucessfully deleted' }})
	})
}
