const express = require('express')
const router = express.Router()

// const checkLogin = require('../middlewares/check').checkLogin



// GET 获取文章列表
router.get('/articles', function (req, res, next) {
  res.send('文章列表')
})

module.exports = router