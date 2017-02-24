var Trianglify = require('trianglify');

function render(seed) {
  var gold = 1.61803
  var gold_inv = 0.61803
  var scale = 88
  if (window.innerWidth < 600) {
    scale = Math.min(window.innerWidth, window.innerHeight) / (gold^5)
  } else {
    scale = Math.min(window.innerWidth, window.innerHeight) / (gold^8)
  }
  console.log(scale)
  var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: scale+Math.random()*scale*gold/10,
      variance: Math.random()*.66*.88*.33,
      seed: 'niln1'
  });

  pattern.canvas(document.getElementById('c'));
}

render()
var time = 618.03
setInterval(render, time)
setTimeout(setInterval(render, time/gold), time/gold);
setTimeout(setInterval(render, time/gold_inv), time/gold_inv);
