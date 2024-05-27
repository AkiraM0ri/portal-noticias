const News = require("../models/News.js")

exports.home = async (req, res) => {
  let isAuthenticated = req.cookies.authenticated;
  const news = await getNews()
  
  res.render('home', {...news, isAuthenticated});
}

// Função para encontrar a notícia mais recente do tipo 1
async function getNews() {
  try {
    // Buscar a notícia mais recente do tipo 1
    const mostRecentType1 = await News.findOne({ type: 1 }).sort({ date: -1 }).exec();
  
    // Buscar as 3 notícias mais recentes do tipo 2
    const threeRecentType2 = await News.find({ type: 2 }).sort({ date: -1 }).limit(3).exec();
    
    // Buscar as 8 notícias mais recentes do tipo 3
    const eightRecentType3 = await News.find({ type: 3 }).sort({ date: -1 }).limit(8).exec();
    
    // Buscar as 3 notícias mais recentes do tipo 4
    const threeRecentType4 = await News.find({ type: 4 }).sort({ date: -1 }).limit(3).exec();

    // buscar todas as noticias recentes
    const allRecentsNews = await News.find().sort({ date: -1 }).exec();

    return {
      type1: mostRecentType1,
      type2: threeRecentType2,
      type3: eightRecentType3,
      type4: threeRecentType4,
      all: allRecentsNews
    };
  } catch (error) {
    console.error('Erro ao buscar a notícia mais recente do tipo 1:', error);
    throw error;
  }
}