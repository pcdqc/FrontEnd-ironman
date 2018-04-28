/**
 * start mongodb
 * mongod --dbpath ./(some module)
 *  show dbs   //useful cmd
  > use test
  > show collections
  > db.cats.find()
 */
let DB = process.env.DB;
const mongoose = require('mongoose')
let mongoUrl = `mongodb://localhost:27017/${DB}`
console.log(mongoUrl)
mongoose.connect(mongoUrl,function(){
  console.log('connect success');
});

/**
 * 凹凸实验室文章名称 地址
 */
let Auto = mongoose.model('Auto', {
  url: String
});
function saveFETitle(item) {
  let AutoItem = new Auto(item);
  AutoItem.save(function(err) {
    if (err) {
      console.error(err)
    };
  })
}

function getArticleTitle(){
  console.log('getArticleTitle')
  Auto.find({},function(err, res){
    console.log(err)
    console.log(res)
    return res;
  })
}
function getArticleURL(){
  console.log('getArticleURL')
  Article.find({},function(err, res){
    
    return res;
  })
}
let Article = mongoose.model('Article', {
  url: String,
  text: String
});
  
function saveArticle(item){
  let ArticleItem = new Article(item);
  console.log(item)
  ArticleItem.save(function(err) {
    if (err) {
      console.error(err)
    };
  })
}
/**
 * 电影天堂电影名称 链接
 */
let Title = mongoose.model('Title', {
  title: String,
  url: String
});
function saveDBTitle(item) {
  let tempItem = new Title(item);
  tempItem.save(function(err) {
    if (err) {
      console.error(err)
    };
  })
}

/**
 * 电影天堂电影下载链接 相关数据
 */
let BtLink = mongoose.model('BtLink', {
  bt: String,
  title: String,
  details: String
});
function saveDBBtLink(item) {
  let btItem = new BtLink(item)
  btItem.save(function(err) {
    if (err) {
      console.error(err)
    };
  })
}

function closeDB () {
  mongoose.connection.close()
}

module.exports = {
  saveDBTitle: saveDBTitle,
  saveDBBtLink: saveDBBtLink,
  saveFETitle: saveFETitle,
  getArticleTitle: getArticleTitle,
  saveArticle: saveArticle,
  getArticleURL: getArticleURL,
  closeDB: closeDB
};



