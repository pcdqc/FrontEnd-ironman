var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/494'


function filterChapters(html){
	var $ = cheerio.load(html);

	var chapters = $('.learnchapter')
	// [
	// {
	// 	chapterTitle: '',
	// 	videos: [
	// 		title:'',
	// 		id: ''
	// 	]
	// }]
	//期望数据结构
	var courserData = []

	chapters.each(function(item){
		var chapter = $(this)
		var chapterTitle = chapter.find('strong').text()
		var videos = chapter.find('.video').children('li')
		var chapterData = {
			chapterTitle: chapterTitle,
			videos:[]
		}

		videos.each(function(item){
			var video = $(this).find('.studyvideo')
			var videoTitle = video.text();
			var id = video.attr('href').split('video/')[1]

			chapterData.videos.push({
				title: videoTitle,
				id: id
			})
		})
		courserData.push(chapterData)
	})
	return courserData;
}
function printCourserInfo(courserData){
	courserData.forEach(function(item){
		var chapterTitle = item.chapterTitle

		console.log(chapterTitle+'\n')

		item.videos.forEach(function(video){
			console.log(' [' +video.id +']' +video.title + '\n')
		
		})
	})
}

http.get(url, function(res){
	var html = '';

	res.on('data',function(data){
		html += data;
	})

	res.on('end', function(){
		var courserData = filterChapters(html);
		printCourserInfo(courserData)
	})
}).on('error',function(){
	console.log('wrong to get the data!')
})