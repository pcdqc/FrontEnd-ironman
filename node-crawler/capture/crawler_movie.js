const cheerio = require('cheerio')
const install = require('superagent-charset');
const request = require('superagent');
superagent = install(request);
const { saveDBBtLink, saveDBTitle ,closeDB } = require('./db.js')
const async = require('async')
const mongoose = require('mongoose')
let URLS = []; //抓取的分页链接
let urlMain = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_';
let titles = []; 
let btLink = []; //download link
let concurrenceCount = 0; //concurrence num
/**
 * main start
 */
main();

function main() {
  console.log('start');
  urlArr = [];
  for(let i =1,len=150;i < len; i++){
    urlArr.push(`${urlMain}${i}.html`)
  }
  console.log(urlArr)
  /**
   * get movie title
   * @param urls {string} urls 
   * @param 5 {number} maxConcurrence 
   */
  async.mapLimit(urlArr, 5, function(url, cb){
    fetchTitleUrl(url,cb)
  }, function(err, res) {
    new Promise((resolve,reject) => {
      res.map(function(res){
        // let $ = cheerio.load(res, {decodeEntities: false});
        let $ = cheerio.load(res[1]);
        $('.co_content8 .ulink').each(function (idx, element) {
          let $element = $(element);
          let titleObj = {
            url: $element.attr('href'),
            title: $element.text()
          }
          URLS.push(titleObj)
          saveDBTitle(titleObj)
          // return titleObj
        });
      });
      console.log(URLS.length)
      resolve();
    }).then(()=>{
      console.log('get Bt link');
      aysncGetBtLink(URLS,5)
    }).catch((err)=>{
      console.log(err)
    })
  })
}
/**
 * get movie url with async
 * @param {string} url 
 * @param {function} cb 
 */
function fetchTitleUrl(url, cb) {
  concurrenceCount++;
  getTitle(url,cb);
}
/**
 * get url we needed
 * @param {*} url 
 * @param {*} i seq
 */
function getTitle(url, cb) {
  let _this = this;
  superagent.get(url).charset('gb2312').end( function (err, res){
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
    concurrenceCount--;
    cb(null, [url ,res.text])
  })
  
}


/**
 * 获取下载链接
 * @param {string} urls 
 * @param {number} maxConcurrence  最大并发数
 */
function aysncGetBtLink(urls, maxConcurrence) {

  async.mapLimit(urls, maxConcurrence, function(url, cb) {
    fetchUrl(url, cb)
  }, function(err, res) {
    
    async.series([function(callback){
      result = res.map((res)=>{
        try{
          let $ = cheerio.load(res[1]);
          let obj = {
            bt:$('#Zoom td a').attr('href'),
            title: res[0].title,
            details: $('#Zoom').html()
          }
          btLink.push(obj);
          saveDBBtLink(obj);
        } catch (err){
          console.log(err)
        }
        // return (btLink)
      })
      console.log('save Done')
      callback(null,'save done!')
    }, function(callback){
      // closeDB();
      callback(null, 'close DB')
    }], function (err, res){
      console.log(res)
    })
    
  })
}
/**
 * get download url with async
 * @param {string} url 
 * @param {function} cb 
 */
function fetchUrl(url, cb) {
  concurrenceCount++;
  getBtLink(url,cb)
  console.log('current concurrence number is '+ concurrenceCount)
}

/**
 * get download url
 * @param {h} url
 * @param {*} n sequence
 */
function getBtLink(url,cb) {
  superagent.get('http://www.ygdy8.net'+ url.url).charset('gb2312').end(function (err, res) {
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
    concurrenceCount--;
    cb(null, [url ,res.text])
  })
}
