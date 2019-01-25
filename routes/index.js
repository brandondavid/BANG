// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('index', {link: 'http://www.synergistech.com/bang-leader.html'})
})

router.get('/docs', (req, res) => {
	res.redirect('/redoc')
})

router.get('/redoc', (req, res) => {
	res.render('redoc', {text: 'REDOC!!'})
})


module.exports = router
