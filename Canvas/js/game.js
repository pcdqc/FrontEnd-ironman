var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//bg
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
}
bgImage.src = "images/bg.png"

//Hero Image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
}
heroImage.src = "images/hero.png";

//Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
}
monsterImage.src = "images/monster.png";

var hero = {
  speed:256
}
var monster = {

};
var monstersCaught = 0;

//handle keyboard controls
var keysDown = {};
addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
},false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
},false);


//Reset the game when the player catches a monster
var reset = function (x,y) {
  if(x && y){
    hero.x = x;
    hero.y = y;
  }else{
    hero.x = canvas.width /2;
    hero.y = canvas.height/2;
  }


  //Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height -64));
};


var update = function (modifier) {
  console.log(modifier)
  if (73 in keysDown) {
    hero.y -= hero.speed * modifier;
  }
  // if( 40 in keysDown) {
  //   hero.y += hero.speed * modifier;
  // }
    if( 75 in keysDown)
      hero.y += hero.speed * modifier;
  if( 74 in keysDown){
    hero.x -=hero.speed * modifier;
  }
  if(76 in keysDown) {
    hero.x += hero.speed * modifier;
  }

  //Are they touching ?
  if (
    hero.x <=(monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y +32)
    ){
    ++monstersCaught;
    reset(hero.x,hero.y);
  }
}

//Draw everything
var render = function () {
  if(bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if(heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if(monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  //Score
  ctx.fillStyle = "rgb(250,250,250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Goblins caught:" + monstersCaught, 32, 32);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
//The main game loop
var main = function () {
  var now = Date.now();

  var delta = now - then;
  update(delta /1000);
  render();

  then = now;

  //Request to do this again
  requestAnimationFrame(main);
}

var then = Date.now();
reset();
main();
