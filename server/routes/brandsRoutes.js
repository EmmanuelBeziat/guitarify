import { BrandController } from '../controllers/index.js'

export const brandsRoutes = app => {
	const brands = new BrandController()

	app.get('/brands', brands.list)
	app.post('/brands', brands.create)
	app.get('/brand/:id', brands.show)
	app.patch('/brand/:id', brands.update)
	app.delete('/brand/:id', brands.delete)
}
