define(function(require, exports, module){
	require('common');
	require('/static/lib/layer/1.6.0/layer.min.js');
	//require('/static/lib/layer/1.6.0/skin/layer.css');
	require('../../../lib/jquery/plugin/jquery.scrollbar');
	require('../../../css/jquery.scrollbar.css');
	require('/static/component/base/placeholder/placeholder.js');
	require('jwplayer');
	require('/static/page/course/common/autocomplete.js');
	var verifyCode = require('../../common/verify-code.js');

	var store = require("store");
	function Store(name){
		this.name=name;
		this.data=null;
	}
	Store.prototype={
		reset:function(){
			this.data=null;
		},
		set:function(key,data){
			if(data===undefined){
				this.data=key;
			}
			else{
				this.data=this.data||{};
				this.data[key]=data;
			}
		},
		prev:function(data){
			$.extend(data,this.data);
		},
		extendMethod:function(name,fun){
			if(!this.name||typeof this[name]!="function") return ;
			this["_"+name]=this[name];
			this[name]=function(){
				this["_"+name].call(this);
				fun.call(this);
			}
		},
		success:$.noop
	}

	var remote={
		qa:new Store("qa"),
		note:new Store("note")
	}
	exports.remote=remote;
$(function(){
	if(!OP_CONFIG.userInfo){//判断当前用户是否登
		$(document).on("shown",function(e){
    		var $target;
    		if(($target=$(e.target)).hasClass("rl-modal")){
    			$target.find("[data-dismiss]").remove();//.end().find("a:contains('忘记密码')").remove();
    			$(".modal-backdrop").off("click");
    		}
    	});

		if(typeof thePlayer=="object") thePlayer.play(false);
	    require.async('login_sns', function(login){
	        login.init();
	    });
    }

	$('.detaillist').perfectScrollbar({
		wheelSpeed: 20,
		wheelPropagation: false
	});

	//var chapterlist={
	//	show:function(){
	//		var $title=$('.chaptername'),
	//			$list=$("#sectionlist");
	//	  	$title.css({'background':'#262f33','z-index':1001,'color':'#fff'});
	//	  	//$('.chaptername').find('span').removeClass('borderstyle');
	//	  	if( $list.hasClass('hide') ) {
	//	      	$list.removeClass('hide');
	//	      	//判断当前正在学习的元素距离父容器的高度，如果超过则scrollTop到一定的位置
	//	      	var listHeight = $("#sectionlist b").parent('a').position().top;
	//			if(listHeight >= 450){
	//				$('.detaillist').scrollTop(listHeight);
	//				$('.detaillist').perfectScrollbar('update');//同步滚动条插件的scrollTop值
	//			}
	//		 	//$('#video_mark').css('height',$height);
	//	      	$('#video_mark').fadeIn();
	//			if(typeof thePlayer!="undefined"){
	//	     		if(thePlayer.getState() == 'PLAYING'){
	//		   	 		thePlayer.pause();
	//	      		}
	//			}
	//    	}
	//	},
	//	hide:function(){
	//		$('#sectionlist').addClass('hide');
	//		$('#video_mark').fadeOut();
	//		$('.chaptername').css({'background':'','z-index':'','color':''});
	//		if(typeof thePlayer != 'undefined'&&thePlayer.getState()=="PAUSED"){
	//			thePlayer.play();
	//		}
	//	}
	//}
	//$('.chaptername').on('click',function(e){
	//	e.preventDefault();
	//  	$("#sectionlist").is(":visible")? chapterlist.hide() : chapterlist.show();
	//});
	//$('#video_mark').click(function(){
	//	chapterlist.hide();
	//});

	//ListData

	var GetListData={
		pl:require("/static/page/course/common/ajax-pl-list.js")({
			container:$('#plLoadListData'),
			params:{
				mid:pageInfo.mid
			}
		}),
		mate:require("/static/page/course/common/ajax-otherscode-list.js")({
			container:$('#mateLoadListData'),
			params:{
				mid:pageInfo.mid
			}
		}),
		qa:require("/static/page/course/common/ajax-discuss-list.js")({
			container:$('#qaLoadListData'),
			params:{
				mid:pageInfo.mid
			}
		}),
		note:require("/static/page/course/common/ajax-note-list.js")({
			container:$('#noteLoadListData'),
			params:{
				mid:pageInfo.mid
			},
			def:{ //template compalie pre define
				"media_id":pageInfo.mid,
				mediaType:'video' //required in diffrent page; 'video','code','ceping'
			}
		}),
		wiki:require("/static/page/course/common/ajax-wiki-list.js")({
			container:$('#wikiLoadListData'),
			params:{
				mid:pageInfo.mid
			}
		})
	};
	var initFun = {
		qa:function(){

		}
	};
	exports.tabList=GetListData;


	//页面载入时就渲染uedit,原来是以问答页面载入才渲染
	(function(){
		var ue=UE.getEditor("discuss-editor",{initialFrameHeight:160,autoHeight: true,autoFloatEnabled:false,autoClearinitialContent:true,initialStyle:'p{line-height:1.5em;font-size:13px;color:#444}'});
		ue.ready(function() {
			//设置编辑器的内容
			//ue.setContent('hello');
			//ue.focus();
			ue.setHeight(160);
		});
	})()
	var postData=window.postData={
		mid:pageInfo.mid,
		picture_url:'',
		picture_time:0
	}
	//tab切换
	var tabs = $('.course-menu a');
	tabs.one("click",function(e){
		//data loader
		var $this = $(this),id;
	 	//(typeof shot !='undefined')&&shot.reset()
		id = $(this).attr('id');
		id = id.substring(0,id.length-4);//sub the 'Menu' 4 char;
		initFun[id] && initFun[id]();
		GetListData[id] && GetListData[id].load();
    }).on("click",function(e){

    	var $this=$(this),
    		id;
    	e.preventDefault();
    	//(typeof shot !='undefined')&&shot.reset();
    	if($this.attr('id')=='wikiMenu'&&OP_CONFIG.userInfo.usertype>1) {//toggle create wiki button
		 	$('#js-create-wiki').show()
		}
		else{
			$('#js-create-wiki').hide()
	 	}
	 	if($this.hasClass("active")) return ;

	 	$this.parent().siblings().find(".active").removeClass("active");
	 	$this.addClass("active");
	 	id=$this.attr("id");
	 	id=id.substring(0,id.length-4);//sub the 'Menu' 4 char;
	 	$("#"+id+"-content").siblings(".list-tab-con").hide().end().show();
	 	store.set('ctb',$this.parent().index());
    });

    var tabIndex = 0;
    if(tabs.length > parseInt(store.get('ctb'))){
    	tabIndex = parseInt(store.get('ctb'));
    }
    tabs.eq(tabIndex).trigger("click");


	//placeholder rewrite
	if(!("placeholder" in document.createElement("input"))){
		$(".js-placeholder").each(function() {
			var $this = $(this);
			$this.val($this.attr('placeholder'));
		});
		$(document).on("focus",".js-placeholder",function(){
			var $this=$(this);
			if($this.val()==$this.attr("placeholder")){
				$this.val("").removeClass("placeholder");
			}
		})
		.on("blur",".js-placeholder",function(){
			var $this=$(this);
			if(!$this.val().length&&$this.attr("placeholder")){
				$this.addClass("placeholder").val($this.attr("placeholder"));
			}
		});
	}


	//发讨论



	//评论框
	$('#js-pl-input-fake').on({
		focusin: function() {
			$(this).addClass('ipt-fake-focus');
		},
		focusout: function() {
			$(this).removeClass('ipt-fake-focus');
		},
		keyup: function() {
			var len = $.trim($('#js-pl-textarea').val()).length;
			if( len > 300 ){
				$(this).addClass("ipt-fake-error").find('#js-pl-limit').addClass('limit-overflow');
			}
			else{
				$(this).removeClass("ipt-fake-error").find("#js-pl-limit").removeClass('limit-overflow')
			}
			$('#js-pl-limit').text(len);
		}
	})
	//发布评论
    function commentSubmit(checked){
        var $this = $('#js-pl-submit'),verify,
        	$uExpValEl = $('#js-user-mp'),
            val;
        if( $this.hasClass("submit-loading") ) return ;
        val=$.trim( $('#js-pl-textarea').val() );
        if(val.length < 5 || val == $("#js-pl-textarea").attr('placeholder')){
            layer.msg('输入不能小于5个字符', 2, -1);
            return ;
        }
        if(val.length > 300){
            layer.msg('输入不能超过300个字', 2, -1);
            return;
        }

        // 对用户经验值判断，经验值不满50不能发评论
        if($uExpValEl.length && +$uExpValEl.text() < 50){
        	layer.msg('您的经验值未满50，不能发表评论！', 2, -1);
            return false;
        }


		if($('.pl-input-btm .verify-code-around').length!==0){
			var verifyVal = $.trim(verifyCode.getResult('.pl-input-btm .verify-code'));
			if(verifyVal.length==0){
				$('.pl-input-btm .verify-code').trigger('fail',"请输入验证码");
				return ;
			}else{
				$('.pl-input-btm .verify-code').trigger('succ');
				verify = verifyVal;
			}
		}

        $this.addClass("submit-loading").val("发布中...");
        var obj = {
			verify:verify,
            content:val,
            mid:pageInfo.mid
        };
        if(checked){obj.checked = 1}
        $.ajax({
            url: "/course/docomment",
            type: "post",
            dataType: "json",
            data: obj,
            success: function(data){
				if(data.data==1&&data.result==-1){
					verifyCode.renderVerifyCodeBlock('.pl-input-btm .verify-code','/course/getcoursecommentcode');
				}else if(data.result==-103002){
					$('.pl-input-btm .verify-code').trigger('fail',data.msg);
				}else if(data.result == -103008){
                    var $maybe = $("#maybe-wenda");
                    $maybe.show().addClass("show");
                    $("#qaMenu").click();
                    $("#plMenu").click();
                }else if(data.result == 0){
                    layer.msg('发布成功!', 2, -1);
                    $("#js-pl-textarea").val('').blur();
                    $('#js-pl-limit').text(0);
					$('.pl-input-btm .verify-code').trigger('succ').html('');
                    GetListData.pl.load();
                }
                else{
                    layer.msg(data.msg, 2, -1);
                }

            },
            complete: function(){
                $this.removeClass("submit-loading").val("发表评论");
            }
        })
    }
	$('#js-pl-submit').click(function(){
		commentSubmit(false);
	});
    //引导问答弹出框中得点击事件
    $("#wenda-ok").on("click", function(){
        var content = $.trim( $('#js-pl-textarea').val() );
        $('#js-pl-textarea').val("");
        $("#qaMenu").click();
        $("#maybe-wenda").removeClass("show").hide();
        UE.getEditor("discuss-editor").setContent(content);
        $("#js-qa-title").focus();
        // 弹出提问框
        $('.op.question').trigger('click');
    });
    $("#wenda-no").on("click", function(){
        commentSubmit(true);
        $("#maybe-wenda").removeClass("show").slideUp("fast");
    });


	//笔记框
	$('#js-note-input-fake').on({
		focusin: function() {
			$(this).addClass('ipt-fake-focus')
		},
		focusout: function() {
			$(this).removeClass('ipt-fake-focus');
		},
		keyup: function() {
			var len = $.trim($('#js-note-textarea').val()).length;
			if(len > 1000) {
				$(this).addClass('ipt-fake-error');
				$('#js-note-limit').addClass('limit-overflow');
			}
			else{
				$(this).removeClass('ipt-fake-error');
				$('#js-note-limit').removeClass('limit-overflow');
			}
			$('#js-note-limit').text(len);
		}
	});


	$("#js-note-textarea").on("keyup change",function(){
		$('#js-note-text-counter').find('em').text($.trim($(this).val()).length);//how to handle space?
	});

	//截图动作
   	$('.shot-btn').on('click',function(){
	   shot.screenShot()
	})



	/*换一换同学*/
	var getUser=function(){
	  	$.post('/course/classmates', {cid:course_id, total:6}, function(data){
			$('#js-class-mate').empty();
			var html='';
			$(data).each(function(i, user) {
				html+=[
						'<a class="mate-avator" href="/space/u/uid/',user.uid,'" target="_blank">',
							'<img src="',user.portrait,'" title="',user.nickname,'"',
						' \/></a>'
				].join("");
				//console.log(html);
				//$('<li><h3><a href="/space/u/uid/'+user.uid+'" target="_blank">'+user.nickname+'</a></h3><em>'+user.job_title+'</em></li>').appendTo($('.users'));
			});
			$('#js-class-mate').html(html);
	   	});
	};

	getUser();

	$('.js-ch-mate').click(function(e){
		e.preventDefault();
		getUser();
	});


	$("#js-note-textarea").on("keyup change",function(){
		var $this=$(this);
		$("#js-note-text-counter em").text($.trim($this.val()).length);
	});
	//下载统计
	$('.downlist a').click(function(){
		var id=$(this).attr("data-id");
		$.ajax({
			url:"/course/ajaxdownloadlog",
			type:"post",
			data:{
				id:id
			}
		})
	})


	//verify code
    $(document).on("click",".verify-code-around",function(){
        var $img=$(this).prev("img");
        $img.attr("src",$img.attr("src").replace(/\?\S*/,"?"+Math.random()));
    });

    //toggle follow course;
    $('.js-btn-follow').click(function(e){
    	var $this = $(this),
    		url = '/space/ajaxfollow',
    		followed;
    	if($this.hasClass('follow-submiting')) return ;
    	if($this.hasClass('course-followed')) {
    		url = '/space/ajaxfollowcancel';
    		followed = 1;
    	}
    	$this.addClass('follow-submiting');

    	$.ajax({
			type: "post",
			url: url,
			dataType:"json",
			data: {
				course_id:$this.attr('data-id')
			},
			success: function(res) {
				if(res.result==0) {
					if(followed) {
						$this.removeClass('course-followed').addClass('course-follow').attr('title', '关注此课程')
						.find('.icon').removeClass('icon-heart-revert').addClass('icon-heart');
						$this.find('em').text('关注');
					}else{
						$this.removeClass('course-follow').addClass("course-followed").attr('title', '已关注')
						.find('.icon').removeClass('icon-heart').addClass('icon-heart-revert');
						$this.find('em').text('已关注');
					}
				}
				else {
					layer.msg('操作失败，请稍后再试', 1, 1);
				}
			},
			error: function() {
				layer.msg('网络错误，请稍后再试', 1, 1);
        	},
        	complete: function() {
        		$this.removeClass('follow-submiting');
        	}
		});
    	e.preventDefault();
    });

    //toggle note content
    $('#noteLoadListData').on('click', '.js-toggle-content', function(e) {
    	var $this = $(this),
    		state = $this.attr('data-state');
    	if(state === 'expanded') {
    		$this
    		.text('[ 查看全文 ]')
    		.attr('data-state','collapsed')
    		.parent().css({
    			position: 'absolute'
    		})
    		.closest('.js-notelist-content').css({
    			maxHeight: '168px' //28*6
    		});
    	}
    	else {
    		$this
    		.text('[ 收起全文 ]')
    		.attr('data-state','expanded')
    		.parent().css({
    			position: 'static'
    		})
    		.closest('.js-notelist-content').css({
    			maxHeight: 'none'
    		});
    	}
    	e.preventDefault();
    });
	//笔记，问答pop;
	$('.section-list .notes').on('click',function(){
		if(window.thePlayer && window.thePlayer.getState()!="PAUSED"&& window.thePlayer.getState()!="IDLE"){
			thePlayer.pause();
		}
		$('.note-pop').css('display','block');
	});
	$('.note-pop .pop-title span').on('click',function(){
		if(window.thePlayer && window.thePlayer.getState()=="PAUSED"){
			thePlayer.play();
		}
		$('.note-pop').css('display','none');
	});
	$('.section-list .question').on('click',function(){
		if(window.thePlayer && window.thePlayer.getState()!="PAUSED"&& window.thePlayer.getState()!="IDLE"){
			thePlayer.pause();
		}
		$('.qa-pop').css('display','block');
	});
	$('.qa-pop .pop-title span').on('click',function(){
		if(window.thePlayer  && window.thePlayer.getState()=="PAUSED"){
			thePlayer.play()
		}
		$('.qa-pop').css('display','none');
	});


	//相关课程
	(function(){
		if($('.course-about-tit span').length!==0){
			$('.course-about-tit span').each(function(i,n){
				var index= i;
				$(this).on('click',function(){
					if($(this).hasClass('on')){
						return ;
					}else{
						$(this).parent().find('span.on').removeClass('on');
						$(this).addClass('on');
						$('.course-about .con-wrap').css('display','none').eq(index).fadeIn();
					}
				});
			});
			$('.course-about-tit span').eq(0).click();
		}
	})();




////分享
var chaptername=$(".section-list h3").text();   //章名称
	//console.log(chaptername);
var html="我正在慕课网学习一门很不错的课程【"+chaptername+""+"】,分享给想学习实用IT技能的同学!";    //节名称
var imgPic = $('#coursePic img')[0].src;
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":html,"bdMini":"2","bdMiniList":false,"bdPic":imgPic,"bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

});//$(function(){}) end
});
