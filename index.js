// dependencias e variaveis globais
global.express = require('express') 
global.routes = express.Router()
global.bcrypt = require('bcrypt')
global.jwt = require('jsonwebtoken')
global = require('dotenv').config()

const cookieParser = require('cookie-parser');
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const port = '3000'

// conexao com o banco
require('./database/database.js')

// interpreta os forms em json
app.use(bodyParser.urlencoded({ extended: false }));

// faz com que o express interprete json no body da requisicao
app.use(express.json({limit: '20mb'}))

// Configuracao do cookie-parser
app.use(cookieParser());

// usando as rotas
const allRoutes = fs.readdirSync(path.resolve('routes')) 
allRoutes.forEach(file => app.use( require(path.resolve('routes', file))))

// rotas dos arquivos estaticos 
const staticPath = path.resolve('public');

// configurando o handlebars, partials e arquivos estaticos
app.use(express.static(staticPath));
hbs.registerPartials(__dirname + '/views/layouts', function (err) {});
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

// servidor
app.listen(port, () => {
  console.log('servidor aberto na porta ' + port)
})
