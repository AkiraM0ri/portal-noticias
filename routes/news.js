const controller = require(__filename.replace('routes', 'controllers'))
const middleware = require(path.resolve('middlewares', 'user.js'))

routes.get('/newsPage', middleware.checkToken, controller.newsRender)
routes.post('/news', middleware.checkToken, controller.postNews)

module.exports = routes