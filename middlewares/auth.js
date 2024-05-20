// verifica se o token e valido
exports.checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if(!token) {
    return res.status(401).json({ erro: "acesso negado" })
  }
  
  try {
    const secret = process.env.secret

    jwt.verify(token, secret)

    next()
  } catch (error) {
    return res.status(400).json({ msg: "token invalido" })
  }
}