const cheerio = require('cheerio')
const http    = require('http')
const iconv   = require('iconv-lite')
const { saveDBBtLink, saveDBTitle ,closeDB } = require('./db.js')
const async = require('async')
const mongoose = require('mongoose')
let index = 1;
let URLS = [];
// let url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html'
let urlMain = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_';
let titles = [];
let btLink = [];
let concurrenceCount = 0; //concurrence num
/**
 * 获取下载链接
 * @param {string} urls 
 * @param {number} maxConcurrence  最大并发数
 */
function aysncGetBtLink(urls, maxConcurrence) {
  async.mapLimit(urls, maxConcurrence, function(url, callback) {
    fetchUrl(url, callback)
  }, function(err, res) {
    console.log('done')
    closeDB();
  })
}
/**
 * get download url with async
 * @param {string} url 
 * @param {function} callback 
 */
function fetchUrl(url, callback) {
  let delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrenceCount++;
  getBtLink(url)
  setTimeout(function () {
    concurrenceCount--;
    callback(null, url)
  },delay)
}
/**
 * get movie title
 * @param {string} urls 
 * @param {number} maxConcurrence 
 */
function aysncGetTitle(urls, maxConcurrence) {
  async.mapLimit(urls, maxConcurrence, function(url, callback) {
    fetchTitleUrl(url, callback)
  }, function(err, res) {
    aysncGetBtLink(URLS, 5)
  })
}
/**
 * get movie url with async
 * @param {string} url 
 * @param {function} callback 
 */
function fetchTitleUrl(url, callback) {
  let delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrenceCount++;
  getTitle(url)
  setTimeout(function () {
    concurrenceCount--;
    callback(null, url)
  },delay)
}
/**
 * get download url
 * @param {h} url
 * @param {*} n sequence
 */
function getBtLink(url) {
  http.get('http://www.ygdy8.net'+ url.url, function(res) {
    let chunks = [];
    console.log('http://www.ygdy8.net'+ url.url)
    res.on('data', function(chunk) {
      chunks.push(chunk);
    });
    res.on('end', function() {
      let html = iconv.decode(Buffer.concat(chunks), 'gb2312');
      let $ = cheerio.load(html, {decodeEntities: false});
      $('#Zoom td').children('a').each(function (idx, element) {
        let $element = $(element);
        let obj = {
          bt:$element.attr('href'),
          title: url.title
        }
        btLink.push(obj);
        saveDBBtLink(obj)
      })
    })
  })
}
/**
 * get url we needed
 * @param {*} url 
 * @param {*} i seq
 */
function getTitle(url) {
  http.get(url, function(res){
    let chunks = [];
    res.on('data', function(chunk) {
      chunks.push(chunk);
    });

    res.on('end', function() {
      let html = iconv.decode(Buffer.concat(chunks), 'gb2312');
      let $ = cheerio.load(html, {decodeEntities: false});
      $('.co_content8 .ulink').each(function (idx, element) {
        let $element = $(element);
        let titleObj = {
          url: $element.attr('href'),
          title: $element.text()
        }
        URLS.push(titleObj)
         
        saveDBTitle(titleObj)
      })
    })
  })
}

/**
 * main start
 */
function main() {
  console.log('start');
  urlArr = [];
  for(let i =1,len=20;i < len; i++){
    urlArr.push(`${urlMain}${i}.html`)
  }
  console.log(urlArr)
  aysncGetTitle(urlArr, 5);
}

main();
