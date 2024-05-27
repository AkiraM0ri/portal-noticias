const User = require("../models/User.js")

// pagina de cadastro
exports.registerUser = async (req, res) => {
  res.render('register');
}

// pagina de login
exports.loginUser = async (req, res) => {
  res.render('login');
}

// perfil do usuario logado
exports.profileData = async (req, res) => {
  const userId = req.user.id

  // verifica se o usuario existe 
  const verifyUserExists = await userExists({_id: userId }, '-password -email -_id -__v')
  if(!verifyUserExists.exists) return res.status(404).json({ erro: "usuario nao encontrado" })

  const userData = {
    user: verifyUserExists.data.user,
    isAuthenticated: true
  }

  res.render('profile', userData)
}

// encerra a sessao de um usuario
exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('authenticated');
  console.log('deslogou')
  res.redirect('/');
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