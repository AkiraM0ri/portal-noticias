const User = require("../models/User.js")

// realiza o login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body

  if( !email || !password) return res.render('login', { msg: "Ausencia de campos", alert: "erro" })
  
  // verifica se o usuario existe 
  const verifyUserExists = await userExists({ email })
  if(!verifyUserExists.exists) return res.render('login', { msg: "Cadastre-se", alert: "erro" })
    
  const userData = verifyUserExists.data.user

  // verifica se as senhas batem
  const checkPass = await bcrypt.compare(password, userData.password)
  if(!checkPass) return res.render('login', { msg: "Senha ou email invalido", alert: "erro" })
  
  try {
    // token jwt + secret
    const secret = process.env.secret

    const token = jwt.sign({
      id: userData.id
    }, secret)

    res.cookie('token', token, { httpOnly: true });
    res.cookie('authenticated', true, { httpOnly: true });
    
    res.redirect('/')
  } catch (error) {
    res.render('login', {msg: 'Algo deu errado, por favor tente mais tarde', alert: "erro" })
  }
}

// cadastra um user novo
exports.register = async (req, res) => {
  const { name, email, password, confirmpass } = req.body

  if(!name || !email || !password || !confirmpass) return res.render('register', { msg: "Ausencia de campos", alert: "erro" })
  
  // verifica se as senhas sao igual
  if(password !== confirmpass) return res.render('register', { msg: "As senhas estão diferentes", alert: "erro" })

  // verifica se existe o usuario
  const verifyUserExists = await userExists({ email })

  if(verifyUserExists.exists) return res.render('register', { msg: "Usuario já existe, tente outro email", alert: "erro" })

  // criptografa a senha do user, e salva os dados no mongo
  const salt = await bcrypt.genSalt(12)
  const passHash = await bcrypt.hash(password, salt)
  
  const registerUser = await User({
    name,
    email,
    password: passHash
  })

  try {
    await registerUser.save() 
    
    return res.render('register', {msg: 'Usuario cadastrado!!', alert: "success"});
  } catch (error) {
    res.render('register', {msg: 'Algo deu errado', alert: "erro"});
  }
}

// verifica se o usuario existe pelo email
async function userExists (findWhere, exclude) {
  const data = {}

  try {
    data.user = await User.findOne(findWhere, exclude) 
  } catch (error) {}

  if(data.user) {
    return {
      exists: true,
      data
    }
  }

  return { exists: false }
}