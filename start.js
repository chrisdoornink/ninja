const floor = 550
const world = {height: 600, width: 1200}
let hero = null
let solids = []
setTimeout(() => {
  hero = new Hero('bob-the-hero','hero solid',100,510)
  // let mountains3 = new Background('mountains3', 'mountains3', {movement: 'sidescroll', speed: -0.3, framerate: 60})
  // let mountains2 = new Background('mountains2', 'mountains2', {movement: 'sidescroll', speed: -0.5, framerate: 60})
  // let mountains1 = new Background('mountains1', 'mountains1', {movement: 'sidescroll', speed: -0.8, framerate: 60})
  // let trees4 = new Background('trees4', 'trees4', {movement: 'sidescroll', speed: -5, framerate: 15})
  // let trees3 = new Background('trees3', 'trees3', {movement: 'sidescroll', speed: -10, framerate: 15})
  // let trees2 = new Background('trees2', 'trees2', {movement: 'sidescroll', speed: -15, framerate: 15})
  // let trees1 = new Background('trees1', 'trees1', {movement: 'sidescroll', speed: -20, framerate: 13})
  // let train = new Background('train', 'train', {})
  let cloud6 = new Background('cloud6', 'clouds/bigcloud3', {opacity: .5, movement: 'sidescroll', speed: .8, framerate: 80, height: 453, width: 1053, position: { x: 500, y: 0 }})
  let cloud7 = new Background('cloud7', 'clouds/bigcloud2', {opacity: .5, movement: 'sidescroll', speed: .6, framerate: 80, height: 453, width: 1053, position: { x: 200, y: -100 }})
  let cloud2 = new Background('cloud2', 'clouds/bigcloud2', {opacity: .5, movement: 'sidescroll', speed: -.8, framerate: 80, height: 453, width: 1053, position: { x: 100, y: -30 }})

  let mountains = new Background('mountains', 'mountains', {
    position: {
      y: 100,
      x: 0
    },
    height: world.height
  })
  let cloud1 = new Background('cloud1', 'clouds/bigcloud1', {opacity: .5, movement: 'sidescroll', speed: -.4, framerate: 80, height: 453, width: 1053, position: { x: 900, y: -130 }})
  let cloud3 = new Background('cloud3', 'clouds/bigcloud3', {opacity: .5, movement: 'sidescroll', speed: -.2, framerate: 90, height: 453, width: 1053, position: { x: 200, y: -146 }})
  let cloud4 = new Background('cloud4', 'clouds/bigcloud4', {opacity: .5, movement: 'sidescroll', speed: -.4, framerate: 90, height: 453, width: 1053, position: { x: 900, y: -200 }})
  let cloud5 = new Background('cloud5', 'clouds/bigcloud5', {opacity: .5, movement: 'sidescroll', speed: -.5, framerate: 40, height: 453, width: 1053, position: { x: 0, y: -250 }})
  let watertiny = new Background('watertiny', 'tiny-waves4', { movement: 'roll', radius: 8, position: { x: -20, y: 478 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -2.3})
  let waterlittle = new Background('waterlittle', 'little-waves', { movement: 'roll', radius: 9, position: { x: -20, y: 482 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -1.8})
  let water0 = new Background('water0', 'waves12', { movement: 'roll', radius: 10, position: { x: -20, y: 486 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -1.4})
  let water1 = new Background('water1', 'waves10', { movement: 'roll', radius: 12, position: { x: -20, y: 492 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -1})
  let water2 = new Background('water2', 'waves9',  { movement: 'roll', radius: 16, position: { x: -20, y: 500 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -0.5})
  let water3 = new Background('water3', 'waves7',  { movement: 'roll', radius: 22, position: { x: -20, y: 510 }, framerate: 60, width: 1240, height: 47, speed: 0.14})
  let beach1 = new Background('beach1', 'main-grass', {
    position: {
      y: 100,
      x: 0
    },
    height: world.height
  })
  let plants1 = new Background('plants1', 'foreground-shrubs', {
    position: {
      y: 100,
      x: 0
    },
    height: 500,
    foreground: true
  })
  let ledge1 = new Landscape('ledge1', 'solid ledge', {
    bottom: '50px',
    left: '200px',
    width: '80px',
    height: '70px'
  })
  let ledge2 = new Landscape('ledge2', 'solid ledge sticky-right', {
    bottom: '50px',
    left: '320px',
    width: '40px',
    height: '140px'
  })
  let ledge3 = new Landscape('ledge3', 'solid ledge sticky-left', {
    bottom: '190px',
    left: '460px',
    width: '40px',
    height: '90px'
  })
  let ledge4 = new Landscape('ledge4', 'solid ledge jump-through death-right death-left', {
    bottom: '350px',
    left: '330px',
    width: '350px',
    height: '10px'
  })
  let ledge5 = new Landscape('ledge5', 'solid ledge sticky-bottom', {
    bottom: '470px',
    left: '400px',
    width: '210px',
    height: '5px'
  })
  let ledge6 = new Landscape('ledge6', 'solid ledge sticky-bottom', {
    bottom: '470px',
    left: '700px',
    width: '370px',
    height: '5px'
  })
  let ledge7 = new Landscape('ledge7', 'solid ledge', {
    bottom: '50px',
    left: '800px',
    width: '50px',
    height: '270px'
  })
  let ledge8 = new Landscape('ledge8', 'solid ledge', {
    bottom: '50px',
    left: '940px',
    width: '30px',
    height: '180px'
  })

  var baddieCounter = 0
  function baddieGen() {
    baddieCounter =+ 1

    new Baddie(new Date().getTime(), 'baddie', 600, 100)
    console.count('baddie');
  }
  // setInterval (baddieGen, 500)
  let baddie1 = new Baddie('sven', 'baddie', 500, 200, {start: 'right', pattern: 'strict'})
  let baddie2 = new Baddie('grant', 'baddie', 400, 200, {start: 'left', pattern: 'strict'})
  let baddie3 = new Baddie('hunter', 'baddie', 500, 510)

}, 300)

var colors = new Array(
  [125,167,190],
  [135,140,177],
  [135,140,177],
  [155,226,254],
  [155,226,254],
  [103,209,251],
  [103,209,251],
  [125,167,190]
);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{



var c0_0 = colors[0];
var c0_1 = colors[1];
var c1_0 = colors[2];
var c1_1 = colors[3];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

document.getElementById('world').style.background = "linear-gradient(to bottom, "+color1+" 0%, "+color2+" 70%)"

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    let c = colors.shift()
    colors.push(c)
    let d = colors.shift()
    colors.push(d)

  }
}

setInterval(updateGradient,50);
