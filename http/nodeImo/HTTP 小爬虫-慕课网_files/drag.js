(function($)
{
    $.extend({

        mouseCoords:function(ev){
            if(ev.pageX || ev.pageY){
                return {x:ev.pageX, y:ev.pageY};
            }
            return {
                x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y:ev.clientY + document.body.scrollTop  - document.body.clientTop
            };
        },

        getStyle:function(obj,styleName)
        {
            return obj.currentStyle ? obj.currentStyle[styleName] : document.defaultView.getComputedStyle(obj,null)[styleName];
        }
    });


    $.fn.dragDrop = function(options)
    {
        var opts = $.extend({},$.fn.dragDrop.defaults,options);

        return this.each(function(){

            var bDraging = false;

            var moveEle = $(this);

            var focuEle = opts.focuEle ? $(opts.focuEle,moveEle) : moveEle ;
            if(!focuEle || focuEle.length<=0)
            {
                alert('focuEle is not found! the element must be a child of '+this.id);
                return false;
            }

            var dragParams = {initDiffX:'',initDiffY:'',moveX:'',moveY:''};


            //moveEle.css({'position':'fixed','left':'0','top':'0'});


            focuEle.bind('mousedown',function(e){

                bDraging = true;

                moveEle.css({'cursor':'move'});

                if(moveEle.get(0).setCapture)
                {
                    moveEle.get(0).setCapture();
                }

                dragParams.initDiffX = $.mouseCoords(e).x - moveEle.position().left;
                dragParams.initDiffY = $.mouseCoords(e).y - moveEle.position().top;
            });

            $(document).bind('mousemove',function(e){
                e.preventDefault();
                //e.stopPropagation();
                if(bDraging)
                {
                    dragParams.moveX = $.mouseCoords(e).x - dragParams.initDiffX;
                    dragParams.moveY = $.mouseCoords(e).y - dragParams.initDiffY;

                    if(opts.fixarea)
                    {
                        if(dragParams.moveX<opts.fixarea[0])
                        {
                            dragParams.moveX=opts.fixarea[0]
                        }
                        if(dragParams.moveX>opts.fixarea[1])
                        {
                            dragParams.moveX=opts.fixarea[1]
                        }

                        if(dragParams.moveY<opts.fixarea[2])
                        {
                            dragParams.moveY=opts.fixarea[2]
                        }
                        if(dragParams.moveY>opts.fixarea[3])
                        {
                            dragParams.moveY=opts.fixarea[3]
                        }
                    }

                    if(opts.dragDirection=='all')
                    {
                        moveEle.css({'left':dragParams.moveX,'top':dragParams.moveY});
                    }
                    else if (opts.dragDirection=='vertical')
                    {
                        moveEle.css({'top':dragParams.moveY});
                    }
                    else if(opts.dragDirection=='horizontal')
                    {
                        moveEle.css({'left':dragParams.moveX});
                    }


                    if(opts.callback)
                    {
                        opts.callback.call(opts.callback,dragParams);
                    }
                }
            });

            $(document).bind('mouseup',function(e){
                bDraging=false;
                moveEle.css({'cursor':'default'});
                if(moveEle.get(0).releaseCapture)
                {
                    moveEle.get(0).releaseCapture();
                }
            });
        });
    };

    //Ä¬ÈÏÅäÖÃ
    $.fn.dragDrop.defaults =
    {
        focuEle:null,
        callback:null,
        dragDirection:'all',
        fixarea:null
    };

})(jQuery);


//// test
//$(function(){
//    $('#dragDiv').dragDrop({fixarea:[0,$('#dragContainer').width()-50,0,$('#dragContainer').height()-50],callback:function(params){
//        $('#span1').text('X:'+params.moveX+' Y:'+params.moveY);
//    }});
//    $('#dragDiv1').dragDrop();
//});
