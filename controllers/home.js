exports.home = async (req, res) => {
  const token = req.cookies.token 
  let isAuthenticated = false;

  if (token) {
    try {
      const secret = process.env.secret

      jwt.verify(token, secret);
      isAuthenticated = true;
    } catch (err) {
      isAuthenticated = false;
    }
  }

  res.render('home', { isAuthenticated });
}