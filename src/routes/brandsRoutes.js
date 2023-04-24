import { BrandController } from '../controllers/index.js'

export const brandsRoutes = app => {
	const brands = new BrandController()

	app.get('/brands', brands.list)

	app.post('/brands', (request, reply) => {
		const data = brands.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Brand sucessfully created' }, data })
	})

	app.get('/brand/:id', brands.show)
	app.patch('/brand/:id', brands.update)
	app.delete('/brand/:id', brands.delete)
}
