import { guitarsRoutes, brandsRoutes, stringsRoutes, tuningsRoutes, songsRoutes, usersRoutes, authRoutes } from '../routes/index.js'
import { RecordNotFound } from './errors/RecordNotFound.js'

export class Router {
	constructor () {
		this.apiURL = '/'
	}

	routes (app) {
		guitarsRoutes(app)
		brandsRoutes(app)
		stringsRoutes(app)
		tuningsRoutes(app)
		songsRoutes(app)
		usersRoutes(app)
		authRoutes(app)

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
	}
}
