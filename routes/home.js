const controller = require(__filename.replace('routes', 'controllers'))

routes.get('', controller.home)
routes.get('/register', controller.registerUser)

module.exports = routes