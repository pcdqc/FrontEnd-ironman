const express = require('express');
const utility = require('utility');
const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const url = require('url');

let cnodeUrl = 'https://cnodejs.org/';
// let app = express();

superagent.get(cnodeUrl)
  .end( (err, res) => {
    if(err) return console.error(err);
    let topicsUrls = [];
    let $ = cheerio.load(res.text);

    $('#topic_list .topic_title').each((idx, element)=>{
      let $element = $(element);

      let href = url.resolve(cnodeUrl, $element.attr('href'));
      topicsUrls.push(href);
      
    })
    getPerPage(topicsUrls)
    console.log(topicsUrls);
  })

var ep = new eventproxy();


function getPerPage(topicUrls) {
  topicUrls.forEach(function (topicUrl) {
    superagent.get(topicUrl)
      .end(function (err, res) {
        console.log('fetch ' + topicUrl + ' successful');
        ep.emit('topic_html', [topicUrl, res.text]);
      });
  });
  ep.after('topic_html', topicUrls.length, function (topics) {
    // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
  
    // 开始行动
    topics = topics.map(function (topicPair) {
      // 接下来都是 jquery 的用法了
      var topicUrl = topicPair[0];
      var topicHtml = topicPair[1];
      var $ = cheerio.load(topicHtml);
      return ({
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim(),
      });
    });
  
    console.log('final:');
    console.log(topics);
  });
}
