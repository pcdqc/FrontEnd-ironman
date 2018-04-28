var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var url = require('url') 

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function(err, res) {
    if (err) {
        return console.error(err)
    }
    // 存放标题url的数组
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    //获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, el) {
        if (idx < 40) {
            var $el = $(el);
            var href = url.resolve(cnodeUrl, $el.attr('href'));
            topicUrls.push(href);           
        }
    });
    //并发连接数的计数器
    var concurrencyCount = 0;
    var fetch = function (url, callback) {
        console.time('  耗时');
        concurrencyCount++;
        superagent.get(url).end( function (err, res) {
            console.log('并发数:', concurrencyCount--, 'fetch', url);
            //var $ = cheerio.load(res.text);
            callback(null, [url, res.text]);
        });

    }
    async.mapLimit(topicUrls, 11, function (topicUrl, callback) {
        fetch(topicUrl, callback);
        console.timeEnd("  耗时");
    }, function (err, result) {
        result = result.map( function (pair) {
            var $ = cheerio.load(pair[1]);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: pair[0],
                comment1: $('.reply_content').eq(0).text().trim(),
                author1: $('.reply_author').eq(0).text().trim() || "评论不存在",    
            });
        });
        console.log('final:\n',result);
    });
});


