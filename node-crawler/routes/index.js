module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/')
  })
  // app.use('/comments', require('./comments'))
  app.use('/articles', require('./articles'))
}