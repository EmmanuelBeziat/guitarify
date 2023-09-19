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

	app.get('/', async (request, reply) => {
		try {
			const guitarsList = await guitars.list()
			reply.view('views/dashboard.ejs', { guitars: guitarsList })
		}
		catch (error) {
			console.error(error);
			reply.code(500).send('An error occurred while fetching the guitars list')
		}
	})

	app.get('/guitar/list', async (request, reply) => {
		const guitarsList = await guitars.list()
		reply.send(guitarsList)
	})

	/* app.get('/guitar/add', async (request, reply) => {
		const stringsAsBrands = await strings.list().reduce((group, string) => {
				const { brand } = string
				group[brand] = group[brand] ?? []
				group[brand].push(string)
				return group
			}, {})

		const tuningsAsNumber = await tunings.list().reduce((group, string) => {
				const { numberOfStrings } = string
				group[numberOfStrings] = group[numberOfStrings] ?? []
				group[numberOfStrings].push(string)
				return group
			}, {})

		reply.view('views/guitars/create.ejs', {
			brands: await brands.list(),
			tunings: tuningsAsNumber,
			strings: stringsAsBrands
		})
	}) */

	app.post('/guitar', async (request, reply) => {
		const guitar = await guitars.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Guitar sucessfully created' }, guitar })
	})

	app.get('/guitar/:uuid', async (request, reply) => {
		const guitar = await guitars.show(request)
		if (!guitar) {
			reply.code(404).send({ meta: { code: 404, message: 'Guitar not found' } })
		}
		else {
			// reply.view('views/guitars/show.ejs', { guitar: await guitars.show(uuid) })
			reply.send(guitar)
		}
	})

	app.patch('/guitar/:uuid', async (request, reply) => {
		const guitar = await guitars.update(request)
		reply.send({ meta: { code: 200, message: 'Guitar successfully updated' }, guitar })
	})

	app.delete('/guitar/:uuid', async (request, reply) => {
		await guitars.delete(request)
		reply.send({ meta: { code: 200, message: 'Guitar successfully deleted' } })
	})
}
