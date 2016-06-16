class Level1 extends Level{
  start() {
    // let cloud6 = new Background('cloud6', 'clouds/bigcloud3', {opacity: .5, movement: 'sidescroll', speed: -.8, framerate: 80, height: 453, width: 1053, position: { x: 500, y: 0 }})
    // let cloud7 = new Background('cloud7', 'clouds/bigcloud2', {opacity: .5, movement: 'sidescroll', speed: -.6, framerate: 80, height: 453, width: 1053, position: { x: 200, y: -100 }})
    // let mountains = new Background('mountains', 'mountains-beach7', {position: {y: 50,x: 0},height: world.height})
    // let cloud1 = new Background('cloud1', 'clouds/bigcloud1', {opacity: .5, /*movement: 'sidescroll', speed: -.7, framerate: 80, */height: 453, width: 1053, position: { x: 900, y: -130 }})
    // let cloud3 = new Background('cloud3', 'clouds/bigcloud3', {opacity: .5, movement: 'sidescroll', speed: -.6, framerate: 80, height: 453, width: 1053, position: { x: 200, y: -146 }})
    // let cloud4 = new Background('cloud4', 'clouds/bigcloud4', {opacity: .5, /*movement: 'sidescroll', speed: -.5, framerate: 80, */height: 453, width: 1053, position: { x: 900, y: -200 }})
    // let cloud5 = new Background('cloud5', 'clouds/bigcloud5', {opacity: .5, /*movement: 'sidescroll', speed: -.9, framerate: 80, */height: 453, width: 1053, position: { x: 0, y: -250 }})
    // let watertiny = new Background('watertiny', 'tiny-waves4', { movement: 'roll', radius: 8, position: { x: -20, y: 478 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -2.3})
    // let waterlittle = new Background('waterlittle', 'little-waves', { movement: 'roll', radius: 9, position: { x: -20, y: 482 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -1.8})
    // let water0 = new Background('water0', 'waves12', { movement: 'roll', radius: 10, position: { x: -20, y: 486 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -1.4})
    // let water1 = new Background('water1', 'waves10', { movement: 'roll', radius: 12, position: { x: -20, y: 492 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -1})
    // let water2 = new Background('water2', 'waves9',  { movement: 'roll', radius: 16, position: { x: -20, y: 500 }, framerate: 60, width: 1240, height: 47, speed: 0.14, start: -0.5})
    // let water3 = new Background('water3', 'waves7',  { movement: 'roll', radius: 22, position: { x: -20, y: 510 }, framerate: 60, width: 1240, height: 47, speed: 0.14})
    this.scenes = [new Scene1, new Scene2, new Scene3]
    this.level = '1'
    super.start(1)
    // super.start()
    document.getElementById("world").className = 'devblocks'
  }
}


//POSSIBLE SUNSET CODE
// var colors = new Array(
//   [125,167,190],
//   [135,140,177],
//   [135,140,177],
//   [155,226,254],
//   [155,226,254],
//   [103,209,251],
//   [103,209,251],
//   [125,167,190]
// );
//
// var step = 0;
// //color table indices for:
// // current color left
// // next color left
// // current color right
// // next color right
// var colorIndices = [0,1,2,3];
//
// //transition speed
// var gradientSpeed = 0.002;
//
// function updateGradient()
// {
//
//
//
// var c0_0 = colors[0];
// var c0_1 = colors[1];
// var c1_0 = colors[2];
// var c1_1 = colors[3];
//
// var istep = 1 - step;
// var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
// var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
// var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
// var color1 = "rgb("+r1+","+g1+","+b1+")";
//
// var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
// var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
// var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
// var color2 = "rgb("+r2+","+g2+","+b2+")";
//
// document.getElementById('world').style.background = "linear-gradient(to bottom, "+color1+" 0%, "+color2+" 70%)"
//
//   step += gradientSpeed;
//   if ( step >= 1 )
//   {
//     step %= 1;
//     let c = colors.shift()
//     colors.push(c)
//     let d = colors.shift()
//     colors.push(d)
//
//   }
// }
//
// setInterval(updateGradient,50);
