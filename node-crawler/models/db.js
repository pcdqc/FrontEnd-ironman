let DB = process.env.DB;
const mongoose = require('mongoose')
let mongoUrl = `mongodb://localhost:27017/autoio`
mongoose.connect(mongoUrl,function(){
  console.log('connect success');
});

let Article = mongoose.model('Article', {
  url: String,
  text: String
});
module.exports = {
  getArticleURL:  () => {
    console.log('getArticleURL')
    Article.find({},function(err, res){
      return res;
    })
  },
};


