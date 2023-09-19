import Brand from '../models/Brand.js'

export class BrandController {
	list () {
		return Brand.list()
	}

	show (request) {
		return Brand.show(request.params.id, { ...request.query })
	}

	create (request) {
		return Brand.create({ ...request.query })
	}

	update (request) {
		return Brand.update(request.params.id, { ...request.query })
	}

	delete (request) {
		return Brand.delete(request.query.id)
	}
}
