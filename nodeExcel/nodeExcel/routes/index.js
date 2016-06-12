var Excel = require('../public/javascripts/readExcel.js')
module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
  });
  app.get('/excute',function (req, res) {
    var rows = req.query.rows;
    console.log(rows)
    // Excel.mix();
    var time = Excel.start(rows);
    res.send(JSON.stringify({"time":time}))
  })
  app.post('/merge',function (req, res) {
    var data = Excel.merge();
    res.send(JSON.stringify({"data":data}))
  })
};
