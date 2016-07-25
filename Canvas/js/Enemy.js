updata(){
  this.x -= this.speed;//speed为位偏移量
  this.y += this.speed;

  //例子从左边离开视界
  if(this.x < -10) {
    this.x = map.width + 10 + Math.random() * 30;
  }
  //粒子从底部离开视界
  if(this.y > map.height + 10) {
    this.y = -10 + Math.random() * -30;
  }
}
