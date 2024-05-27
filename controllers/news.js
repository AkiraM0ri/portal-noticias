const News = require("../models/News.js")

exports.newsRender = async (req, res) => {
  const isAuthenticated = req.cookies.authenticated
  res.render('newsPage', { isAuthenticated });
}

// cadastra uma noticia nova
exports.postNews = async (req, res) => {
  const isAuthenticated = req.cookies.authenticated 
  const { type, title, imageLink, journalistsName } = req.body;
  console.log("🚀 ~ exports.postNews= ~ type:",  type, title, imageLink, journalistsName)

  if (!type || !title || !imageLink || !journalistsName) {
    return res.render('newsPage', { 
      isAuthenticated: isAuthenticated,
      msg: "Todos os campos são obrigatórios", 
      alert: "erro" 
    });
  }

  const newNews = await News({ type, title, imageLink, journalistsName });

  try {
    await newNews.save()

    res.render('newsPage', {
      isAuthenticated: isAuthenticated,
      msg: "Noticia cadastrada",
      alert: "success" 
    })

  } catch (error) {
    console.log("🚀 ~ exports.postNews= ~ error:", error)
    return res.render('newsPage', { 
      isAuthenticated: isAuthenticated,
      msg: "Algo deu errado, tente mais tarde.", 
      alert: "erro"
    });
  }
}
