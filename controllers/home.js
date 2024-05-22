exports.home = async (req, res) => {
  res.render('home');
}

exports.registerUser = async (req, res) => {
  console.log('testeee')
  res.render('register');
}