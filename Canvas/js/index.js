const canvas = document.getElementById('world');
canvas.width = window.innerWidth > 1000 ? 1000 : window.innerWidth;
canvas.height = window.innerHeight;

function createEnemy(numEnemy) {
  enemys = [];
  for(let i=0; i < numEnemy; i++) {
    const x = Math.random() * map.width + map.width;
    const y = Math.random() * map.height;
    enemys.push(new Enemy({x,y}));
  }
}
