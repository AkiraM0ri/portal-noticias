const controller = require(__filename.replace('routes', 'controllers'))

routes.post('/auth/register', controller.register)
routes.post('/auth/login', controller.login)

module.exports = routes