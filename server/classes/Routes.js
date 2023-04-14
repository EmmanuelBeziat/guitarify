import { GuitarController, BrandController, StringsController, TuningController, SongController, UserController } from '../controllers/index.js'
import { RecordNotFound } from './errors/RecordNotFound.js'
import { login, logout } from '../methods/auth.js'

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
			}
		}

		app.get('/guitars', this.guitars.list)
		app.post('/guitars', this.guitars.create)
		app.get('/guitar/:uuid', this.guitars.show)
		app.patch('/guitar/:uuid', this.guitars.update)
		app.delete('/guitar/:uuid', this.guitars.delete)

		app.get('/brands', this.brands.list)
		app.post('/brands', this.brands.create)
		app.get('/brand/:id', this.brands.show)
		app.patch('/brand/:id', this.brands.update)
		app.delete('/brand/:id', this.brands.delete)

		app.get('/strings', this.strings.list)
		app.post('/strings', this.strings.create)
		app.get('/strings/:id', this.strings.show)
		app.patch('/strings/:id', this.strings.update)
		app.delete('/strings/:id', this.strings.delete)

		app.get('/tunings', this.tunings.list)
		app.post('/tunings', this.tunings.create)
		app.get('/tuning/:id', this.tunings.show)
		app.patch('/tuning/:id', this.tunings.update)
		app.delete('/tuning/:id', this.tunings.delete)

		app.get('/songs', this.songs.list)
		app.post('/songs', this.songs.create)
		app.get('/song/:uuid', this.songs.show)
		app.patch('/song/:uuid', this.songs.update)
		app.delete('/song/:uuid', this.songs.delete)

		app.get('/users', this.users.list)
		app.post('/users', this.users.create)
		app.get('/user/:uuid', this.users.show)
		app.patch('/user/:uuid', this.users.update)
		app.delete('/user/:uuid', this.users.delete)

		app.post('/login', (req) => {
			const jwt = app.jwt
			return login(req, jwt)
		})
		app.post('/logout', logout)

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
