//注册函数f,当文档载入完成时执行这个函数f
//如果文档已经载入完成，尽快以异步方式执行它
function onLoad(f){
  if(onLoad.loaded)
    window.setTimeout(f,0);
  else if(window.addEventListener)
    window.addEventListener("load",f,false);
  else if(window.attachEvent)
    window.attachEvent("onload",f);
}
//给onLoad设置一个标志,用来指示文档是否载入完成
onLoad.loaded = false;
//注册一个函数，当文档载入完成时设置这个标志
onLoad(function(){onLoad.loaded = true;});
