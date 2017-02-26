var Trianglify = require('trianglify');

var gold = 1.61803
var gold_inv = 0.61803
var scale = 88

var trend = 0
var last = Math.random() * 50

function getNext() {
  if (trend === 0) { //向上
    if (last<61) {
      last = last+0.05
      return last
    } else {
      trend = 1
      last = last-0.05
      return last
    }
  } else{ //向下
    if (last>0) {
      last = last-0.05
      return last
    } else {
      trend = 0
      last = last+0.05
      return last
    }
  }
}


function render(seed) {
  if (window.innerWidth < 600) {
    scale = Math.min(window.innerWidth, window.innerHeight) / (gold^5)
  } else {
    scale = Math.min(window.innerWidth, window.innerHeight) / (gold^8)
  }
  var next = getNext()
  var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: scale,
      variance: next,
      seed: 'niln1'
  });

  pattern.canvas(document.getElementById('c'));
}

render()

var time = 200.03
// setInterval(render, time)
setTimeout(function() {return setInterval(render, time/gold)}, 10000);
setTimeout(function() {return setInterval(render, time/gold_inv)}, 13000);
