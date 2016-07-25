// (function(){
// //canvas会初始化宽度为300像素和高度为150像素
// 如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。
  var canvas = document.getElementById("square");
  var ctx = canvas.getContext("2d");
  //fillRect(x, y, width, height)矩形起始点坐标x,y 矩形长宽
  // context.fillRect(50, 50, 100, 100);
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (30, 30, 55, 50);

  ctx.beginPath();
  ctx.moveTo(20,20);
  ctx.lineTo(200,20);
  ctx.lineTo(120,120);
  ctx.closePath(); // draws last line of the triangle
  ctx.stroke();

  // ctx.strokeRect(x,y,w,h)//使用当前的绘画样式,描绘一个矩形
  ctx.strokeRect(0,0,200,200)
  var text = ctx.measureText("foo0")
  var str = ''
  for(var i in text){
    str += i + ':' + text[i] +'/n'
  }
  //ctx.fillText(text,x,y,maxWidth) 超出maxWidth则会缩小字体 或缩放
  ctx.fillText('在(x,y)位置绘制填充文本',200,200,200)
  ctx.strokeText('在(x,y)位置绘制描边文本',200,220,200)
  ctx.strokeText(text,200,240 )
  //measureText(text) text需要测量的文本 返回TextMetrics对象
  //Canvas中              TextMetrics 接口表示文本的尺寸

  // ctx.clearRect(10, 10, 100, 100);
  //(x,y)为起点 范围为weight,height所有像素变透明
  //并擦除之前绘制的所有内容
  ctx.beginPath();
  ctx.moveTo(75,50);
  ctx.lineTo(100,75);
  ctx.lineTo(100,25);
  ctx.fill();


  //arc(x, y, radius, startAngle, endAngle, anticlockwise)
  //画一个以(x,y)为圆心，radius为半径的圆或圆弧，从startAngle到
  //endAngle默认以顺时针来生成
  ctx.clearRect(0,0,1000,1000)
  ctx.beginPath();
  ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
  ctx.moveTo(110,75);
  ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
  ctx.moveTo(65,65);
  ctx.arc(60,65,5,0,Math.PI,true);  // 左眼
  ctx.moveTo(95,65);
  ctx.arc(90,65,5,0,Math.PI,true);  // 右眼
  ctx.stroke();
  ctx.clearRect(0,0,1000,1000)

  //quadraticCurveTo(cp1x, cp1y, x, y)
  //绘制二次贝塞尔曲线，x,y为结束点，cp1x,cp1y为控制点。
  // 二次贝尔赛曲线
    ctx.beginPath();
    ctx.moveTo(75,25);
    ctx.quadraticCurveTo(25,25,25,62.5);
    ctx.quadraticCurveTo(25,100,50,100);
    ctx.quadraticCurveTo(50,120,30,125);
    ctx.quadraticCurveTo(60,120,65,100);
    ctx.quadraticCurveTo(125,100,125,62.5);
    ctx.quadraticCurveTo(125,25,75,25);
    ctx.stroke();
    // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
// 绘制三次贝塞尔曲线，x,y为结束点，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二。
// //三次曲线
    ctx.beginPath();
    ctx.moveTo(75,40);
    ctx.bezierCurveTo(75,37,70,25,50,25);
    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
    ctx.bezierCurveTo(20,80,40,102,75,120);
    ctx.bezierCurveTo(110,102,130,80,130,62.5);
    ctx.bezierCurveTo(130,62.5,130,25,100,25);
    ctx.bezierCurveTo(85,25,75,37,75,40);
    ctx.fill();
    roundedRect(ctx,200,200,20,20,5)
// })()

  //绘制圆角矩形
    function roundedRect(ctx,x,y,width,height,radius){
      ctx.beginPath();
      ctx.moveTo(x,y+radius);
      ctx.lineTo(x,y+height-radius);
      ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
      ctx.lineTo(x+width-radius,y+height);
      ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
      ctx.lineTo(x+width,y+radius);
      ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
      ctx.lineTo(x+radius,y);
      ctx.quadraticCurveTo(x,y,x,y+radius);
      ctx.stroke();
    }
    //Path2D对象用来缓存和记录绘画命令，这样你将能快速地回顾路径
