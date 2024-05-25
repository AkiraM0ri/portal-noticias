// verifica se o token e valido
exports.checkToken = (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
    return res.redirect('/login');
  }
  
  try {
    const secret = process.env.secret

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user
      next()
    })
  } catch (error) {
    return res.status(400).json({ msg: "token invalido" })
  }
}