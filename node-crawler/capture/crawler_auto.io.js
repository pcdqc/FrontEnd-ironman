const cheerio = require('cheerio')
const install = require('superagent-charset');
const request = require('superagent');
superagent = install(request);
const { saveFETitle ,closeDB,getArticleTitle,saveArticle } = require('./db.js')
const async = require('async')
const mongoose = require('mongoose')
let URLS = []; //抓取的分页链接
let urlMain = 'https://aotu.io/';
let titles = [],
  index = 0;
  
let concurrenceCount = 0; //concurrence num
/**
 * main start
 */
main();


function mainTwo(arr) {
 
  let len = arr.length,urls =[];
  for( let i=0;i<len;i++) {
    urls.push(arr[i].url)
  }
  /**
   * get article title
   * @param urls {string} urls 
   * @param 5 {number} maxConcurrence 
   */
  async.mapLimit(urls, 5, function(url, cb){
    fetchArticleUrl(url,cb)
  }, function(err, res) {
    console.log(err)
    new Promise((resolve,reject) => {
      res.map(function(res){
        if(typeof res == 'string') return ''
        let $ = cheerio.load(res[1]);
        $('.mod-main a').each(function (idx, element) {
          let $element = $(element);
          let titleObj = {
            'url': $element.attr('href'),
            'text': $element.text() == '' ? $element.attr('href') : $element.text()
          }
          URLS.push(titleObj)
          saveArticle(titleObj)
        });
      });
      resolve();
    }).then(()=>{
      console.log('get Article Dne');
      closeDB();
    }).catch((err) => {
      console.log(err);
    })
  })
  
}
/**
 * get movie url with async
 * @param {string} url 
 * @param {function} cb 
 */
function fetchArticleUrl(url, cb) {
  concurrenceCount++;
  getArticle(url,cb);
}
/**
 * get url we needed
 * @param {*} url 
 * @param {*} i seq
 */
//TODO: 错误处理一定是必须的 流程每一步会有什么结果 都应该做处理
function getArticle(url, cb) {
  let _this = this;
  superagent.get(urlMain+url).end( function (err, res){
    if(!res) {
      cb(null,[url,'res is null']) 
      return;
    }
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    let error;
    console.log(urlMain+url)
    if (statusCode!== 200) {
      error = new Error('Request Failed.\n'+ `Status Code: ${statusCode}`);
      cb(null, [url, 'not Found']);
      return;
    }
    // else if (!/^application\/json/.test(contentType)) {
    //   error = new Error('Invalid content-type.\n' +
    //                     `Expected application/json but received ${contentType}`);
    // }
    if (error) {
      console.error(error.message);
      cb(null, [url, 'has Error']);
      // consume response data to free up memory
      res.resume();
      return;
    }

    concurrenceCount--;
    cb(null, [url ,res.text])
  })
  
}




/**
 * 获取url 存储到数据库
 */
function main() {
  superagent.get(urlMain).end( function (err, res){
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    let error;
    if (statusCode!== 200) {
      error = new Error('Request Failed.\n'+ `Status Code: ${statusCode}`);
    }
    // else if (!/^application\/json/.test(contentType)) {
    //   error = new Error('Invalid content-type.\n' +
    //                     `Expected application/json but received ${contentType}`);
    // }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }
    let $ = cheerio.load(res.text);
    getAjaxData($,1)
  })
}
function getAjaxData($,index) {
  let url = `https://aotu.io/fragments/index/${++index}/`
  superagent.get(url)
    .end((err, res) => {
      const { statusCode } = res;
      if(statusCode == 200){
         getAjaxData($,index)
         doneAjax(cheerio.load(res.text))
      }else{
        mainTwo(URLS)
      };
    })
}
function doneAjax($){
  $('.mod-post a').each(function (idx, element) {
    let $element = $(element);
    let titleObj = {
      url: $element.attr('href')
    }
    URLS.push(titleObj)
    saveFETitle(titleObj)
    // return titleObj
  });
}

