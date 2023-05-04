import { GuitarController, BrandController, StringsController, TuningController } from '../controllers/index.js'

export const guitarsRoutes = app => {
	const guitars = new GuitarController()
	const brands = new BrandController()
	const strings = new StringsController()
	const tunings = new TuningController()

	app.addHook('onRequest', async (request, reply) => {
		/* try {
			await request.jwtVerify(token)
		}
		catch (error) {
			reply.send(error)
		} */
	})

	app.get('/', (request, reply) => {
		reply.view('views/dashboard.ejs', { guitars: guitars.list() })
	})

	app.get('/guitar/add', (request, reply) => {
		const stringsAsBrands = strings.list().reduce((group, string) => {
				const { brand } = string
				group[brand] = group[brand] ?? []
				group[brand].push(string)
				return group
			}, {})
		const tuningsAsNumber = tunings.list().reduce((group, string) => {
				const { numberOfStrings } = string
				group[numberOfStrings] = group[numberOfStrings] ?? []
				group[numberOfStrings].push(string)
				return group
			}, {})
		reply.view('views/guitars/create.ejs', {
			brands: brands.list(),
			tunings: tuningsAsNumber,
			strings: stringsAsBrands
		})
	})

	app.post('/guitar/add', (request, reply) => {
		const data = guitars.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Guitar sucessfully created' }, data })
	})

	app.get('/guitar/:uuid', (request, reply) => {
		const { uuid } = request.params
		const guitar = guitars.get(uuid)
		if (!guitar) {
			reply.code(404).send({ meta: { code: 404, message: 'Guitar not found' } })
		}
		else {
			reply.view('views/guitars/show.ejs', { guitar: guitars.show(uuid) })
		}
	})
	app.patch('/guitar/:uuid', guitars.update)
	app.delete('/guitar/:uuid', guitars.delete)
}
