const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')

//get
router.get('/:resource', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource Not Found' })
		return
	}

	controller.get(req.query)
	.then(data => {
		res.status(200).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

//getById
router.get('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource Not Found' })
		return
	}

	controller.getById(req.params.id)
	.then(data => {
		if (data){
			res.status(200).json(data)
		}
		else {
			res.status(404).json({ ERROR: 'ID not found' })
		}
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

//getPropertyById
router.get('/:resource/:id/:property', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource Not Found' })
		return
	}

	controller.getPropertyById(req.params.id, req.params.property)
	.then(data => {
		if (Object.entries(data).length){
			res.status(200).json(data)
		}
		else {
			res.status(404).json({ ERROR: 'Property not found' })
		}
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

//post
router.post('/:resource', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource Not Found' })
		return
	}

	controller.post(req.body)
	.then(data => {
		res.status(201).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

//put
router.put('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource Not Found' })
		return
	}

	controller.put(req.params.id, req.body)
	.then(data => {
		res.status(201).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

//delete
router.delete('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource Not Found' })
		return
	}

	controller.delete(req.params.id)
	.then(data => {
		res.status(205).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

module.exports = router