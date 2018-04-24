/**
 * start mongodb
 * mongod --dbpath ./(some module)
 *  show dbs   //useful cmd
  > use test
  > show collections
  > db.cats.find()
 */
const mongoose = require('mongoose')
let mongoUrl = 'mongodb://localhost:27017/test'

mongoose.connect(mongoUrl,function(){
  console.log('connect success');
});


function Model(Factory, name){
  return  Item = mongoose.model(name, Factory)
}
let Title = mongoose.model('Title', {
  title: String,
  url: String
});
function saveDBTitle(item) {
  let tempItem = new Title(item)
  tempItem.save(function(err) {
    if (err) {
      console.error(err)
    };
  })
}
let BtLink = mongoose.model('BtLink', {
  bt: String,
  title: String
});
function saveDBBtLink(item) {
  let tempItem = new BtLink(item)
  tempItem.save(function(err) {
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
  closeDB: closeDB
};



