import { GuitarController, BrandController, StringsController, TuningController, SongController, UserController } from '../controllers/index.js'
import { RecordNotFound } from './errors/RecordNotFound.js'

export class Router {
	constructor () {
		this.apiURL = '/'
		this.guitars = new GuitarController()
		this.brands = new BrandController()
		this.strings = new StringsController()
		this.tunings = new TuningController()
		this.songs = new SongController()
		this.users = new UserController()
	}

	routes (app) {
		const opts = {
			schema: {
				queryString: {
					code: { type: 'string' }
				}
			}
		}

		app.get(`${this.apiURL}guitars`, this.guitars.list)
		app.post(`${this.apiURL}guitars`, this.guitars.create)
		app.get(`${this.apiURL}guitar/:uuid`, this.guitars.show)
		app.patch(`${this.apiURL}guitar/:uuid`, this.guitars.update)
		app.delete(`${this.apiURL}guitar/:uuid`, this.guitars.delete)

		app.get(`${this.apiURL}brands`, this.brands.list)
		app.post(`${this.apiURL}brands`, this.brands.create)
		app.get(`${this.apiURL}brand/:id`, this.brands.show)
		app.patch(`${this.apiURL}brand/:id`, this.brands.update)
		app.delete(`${this.apiURL}brand/:id`, this.brands.delete)

		app.get(`${this.apiURL}strings`, this.strings.list)
		app.post(`${this.apiURL}strings`, this.strings.create)
		app.get(`${this.apiURL}strings/:id`, this.strings.show)
		app.patch(`${this.apiURL}strings/:id`, this.strings.update)
		app.delete(`${this.apiURL}strings/:id`, this.strings.delete)

		app.get(`${this.apiURL}tunings`, this.tunings.list)
		app.post(`${this.apiURL}tunings`, this.tunings.create)
		app.get(`${this.apiURL}tuning/:uuid`, this.tunings.show)
		app.patch(`${this.apiURL}tuning/:uuid`, this.tunings.update)
		app.delete(`${this.apiURL}tuning/:uuid`, this.tunings.delete)

		app.get(`${this.apiURL}songs`, this.songs.list)
		app.post(`${this.apiURL}songs`, this.songs.create)
		app.get(`${this.apiURL}song/:uuid`, this.songs.show)
		app.patch(`${this.apiURL}song/:uuid`, this.songs.update)
		app.delete(`${this.apiURL}song/:uuid`, this.songs.delete)

		app.get(`${this.apiURL}users`, this.users.list)
		app.post(`${this.apiURL}users`, this.users.create)
		app.get(`${this.apiURL}user/:uuid`, this.users.show)
		app.patch(`${this.apiURL}user/:uuid`, this.users.update)
		app.delete(`${this.apiURL}user/:uuid`, this.users.delete)

		app.setErrorHandler((error, req, res) => {
			if (error instanceof RecordNotFound) {
				res.statusCode = 404
				console.error(error)
			}
			res.statusCode = 500
			return {
				error: error.message
			}
		})

		/* App.vite.global = {
			guitars: Object.keys(guitars),
			tunings: Object.keys(tunings),
			strings: Object.keys(strings),
			songs: Object.keys(songs),
		} */

		/* app.vite.get('/user/:guid')
		app.vite.get('/guitar/:guid')
		app.vite.get('/tuning/:guid')
		app.vite.get('/strings/:guid')
		app.vite.get('/song/:guid') */
	}
}
