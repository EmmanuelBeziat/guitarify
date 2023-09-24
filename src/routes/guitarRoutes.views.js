import { GuitarController, BrandController, StringsController, TuningController } from '../controllers/index.js'

export const guitarRoutes = app => {
	const guitar = new GuitarController()
	/* const brand = new BrandController()
	const strings = new StringsController()
	const tuning = new TuningController() */

	app.addHook('onRequest', async (request, reply) => {
		/* try {
			await request.jwtVerify(token)
		}
		catch (error) {
			reply.send(error)
		} */
	})

	/* app.get('/', async (request, reply) => {
		try {
			const list = await guitar.list()
			reply.view('views/dashboard.ejs', { guitars: list })
		}
		catch (error) {
			console.error(error);
			reply.code(500).send('An error occurred while fetching the guitar list')
		}
	}) */

	app.get('/guitar', async (request, reply) => {
		const list = await guitar.list()
		reply.send(list)
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

		reply.view('views/guitar/create.ejs', {
			brands: await brands.list(),
			tunings: tuningsAsNumber,
			strings: stringsAsBrands
		})
	}) */

	app.post('/guitar', async (request, reply) => {
		const data = await guitar.create(request)
		reply.send({ meta: { code: 201, message: 'Guitar sucessfully created' }, data })
	})

	app.get('/guitar/:uuid', async (request, reply) => {
		const data = await guitar.show(request)
		if (!guitar) {
			reply.send({ meta: { code: 404, message: 'Guitar not found' } })
		}
		else {
			// reply.view('views/guitar/show.ejs', { guitar: await guitar.show(uuid) })
			reply.send(data)
		}
	})

	app.patch('/guitar/:uuid', async (request, reply) => {
		const data = await guitar.update(request)
		reply.send({ meta: { code: 200, message: 'Guitar successfully updated' }, data })
	})

	app.delete('/guitar/:uuid', async (request, reply) => {
		await guitar.delete(request)
		reply.send({ meta: { code: 200, message: 'Guitar successfully deleted' } })
	})
}
