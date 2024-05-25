const controller = require(__filename.replace('routes', 'controllers'))
const middleware = require(__filename.replace('routes', 'middlewares'))

routes.get('/register', controller.registerUser)
routes.get('/login', controller.loginUser)
routes.get('/profile', middleware.checkToken, controller.profileData)
routes.get('/logout', middleware.checkToken, controller.logout)

module.exports = routes