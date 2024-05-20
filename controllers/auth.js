const User = require("../models/User.js")

exports.userData = async (req, res) => {
  const userId = req.params.id

  // verifica se o usuario existe 
  const verifyUserExists = await userExists({ userId }, '-password')
  if(!verifyUserExists.exists) return res.status(404).json({ erro: "usuario nao encontrado" })

  const userData = verifyUserExists.data 
  
  res.status(200).json(userData)
}

// realiza o login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body
  console.log("🚀 ~ exports.login= ~ req.body:", req.body)

  if( !email || !password) return res.status(422).json({ erro: "ausencia de campos" })
  
  // verifica se o usuario existe 
  const verifyUserExists = await userExists({ email })
  if(!verifyUserExists.exists) return res.status(400).json({ erro: "senha ou email invalido" })
    
  const userData = verifyUserExists.data.user

  // verifica se as senhas batem
  const checkPass = await bcrypt.compare(password, userData.password)
  if(!checkPass) return res.status(400).json({ erro: "senha ou email invalido" })
  
  try {
    // token jwt + secret
    const secret = process.env.secret

    const token = jwt.sign({
      id: userData.id
    }, secret)

    res.status(201).json({msg: 'Login realizado com sucesso', token: token})
  } catch (error) {
    res.status(500).json({msg: 'Algo deu errado, por favor tente mais tarde'})
  }
}

// regista um user novo
exports.register = async (req, res) => {
  const { name, email, password, confirmpass } = req.body
  console.log("🚀 ~ exports.register= ~ req.body:", req.body)

  if(!name || !email || !password || !confirmpass) return res.status(422).json({ erro: "ausencia de campos" })
  
  // verifica se as senhas sao igual
  if(password !== confirmpass) return res.status(404).json({ erro: "as senhas sao diferentes" })

  // verifica se existe o usuario
  const verifyUserExists = await userExists({ email })

  if(verifyUserExists.exists) return res.status(409).json({ erro: "usuario ja existe" })

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

    res.status(201).json({msg: 'Usuario criado com sucesso!'})
  } catch (error) {
    res.status(500).json({msg: 'Algo deu errado'})
  }
}

// verifica se o usuario existe pelo email
async function userExists (findWhere, exclude = false) {
  const data = {}

  if(exclude) data.user = await User.findOne(findWhere, exclude) 
  else data.user = await User.findOne(findWhere)   

  if(data.user) {
    return {
      exists: true,
      data
    }
  }

  return { exists: false }
}