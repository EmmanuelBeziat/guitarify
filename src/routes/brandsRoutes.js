import { BrandController } from '../controllers/index.js'

export const brandsRoutes = app => {
	const brands = new BrandController()

	app.get('/brands', async (request, reply) => {
		const brandsList = await brands.list()
		reply.send(brandsList)
	})

	app.post('/brands', async (request, reply) => {
		const brand = await brands.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Brand sucessfully created' }, brand })
	})

	app.get('/brand/:id', async (request, reply) => {
		const brand = await brands.show(request)
		reply.send(brand)
	})

	app.patch('/brand/:id', async (request, reply) => {
		const brand = await brands.update(request)
		reply.send({ meta: { code: 200, message: 'Brand successfully updated' }, brand })
	})

	app.delete('/brand/:id', async (request, reply) => {
		await brands.delete(request)
		reply.send({ meta: { code: 200, message: 'Brand sucessfully deleted' }})
	})
}
