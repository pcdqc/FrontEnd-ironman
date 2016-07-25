onLoad(function() {
  for(var i=0; i<document.images.length;i++) {
    var img = document.images[i] //HTMLCollection对象
    var rollover = img.getAttribute("data-rollover");
    if(!rollover) continue;
    //确保将翻转的图片缓存起来
    (new Image()).src = rollover;

    //定义一个属性来标识默认的图片URL
    img.setAttribute("data-rollout",img.src);

    //注册时间处理函数来创建翻转效果
    img.onmouseover = function(){
      this.src = this.getAttribute("data-rollover");
    };
    img.onmouseout = function(){
      this.src = this.getAttribute("data-rollout");
    }
  }
})
