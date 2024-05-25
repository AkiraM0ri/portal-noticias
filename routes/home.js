const controller = require(__filename.replace('routes', 'controllers'))

routes.get('', controller.home)

module.exports = routes