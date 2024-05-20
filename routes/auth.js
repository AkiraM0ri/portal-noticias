const controller = require(__filename.replace('routes', 'controllers'))
const middleware = require(__filename.replace('routes', 'middlewares'))

routes.get('/user/:id', middleware.checkToken, controller.userData)
routes.post('/auth/register', controller.register)
routes.post('/auth/login', controller.login)

module.exports = routes