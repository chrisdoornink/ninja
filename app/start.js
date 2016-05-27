const floor = 550
const world = {height: 600, width: 1200}
let solids = []
let blinds = []
let actionItems = []
let hero = new Hero('bob-the-hero','hero solid',50,510)

class Scene1 extends Scene{
  build() {
    this.sceneBackgrounds.push(new Background('facade', 'facades/level2-test17', {position: {y: 0,x: 0},height: world.height}))
    this.sceneBackgrounds.push(new Background('fire', 'fire4', {position: {y: 442,x: 900}, height: 200, width: 200, animationClass: 'fire'}))
    this.sceneBackgrounds.push(new Background('drawbridge-and-lever', 'facades/level2-drawbridge/drawbridge-and-lever', {position: {y: 434,x: 766}, height: 166, width: 434, animationClass: 'drawbridge'}))
    this.foreground = new Background('shrubs1', 'foreground-shrubs2', {position: {y: 15,x: 0},height: 600,foreground: true, sceneSpecific: true})
    this.ledges.push(new Landscape('ledge0', 'solid ledge', {bottom: '50px', left: '-20px',width: '22px', height: '600px'}))
    this.ledges.push(new Landscape('ledge1', 'solid ledge', {bottom: '50px', left: '200px',width: '80px', height: '70px'}))
    this.ledges.push(new Landscape('ledge2', 'solid ledge sticky-right', {bottom: '50px', left: '320px',width: '40px', height: '140px'}))
    this.ledges.push(new Landscape('ledge3', 'solid ledge sticky-left', {bottom: '190px', left: '460px',width: '40px', height: '90px'}))
    this.ledges.push(new Landscape('ledge4', 'solid ledge jump-through death-right death-left', {bottom: '350px', left: '330px',width: '350px', height: '10px'}))
    this.ledges.push(new Landscape('ledge5', 'solid ledge sticky-bottom', {bottom: '470px', left: '400px',width: '710px', height: '5px'}))
    this.ledges.push(new Landscape('lever', 'solid ledge sticky-bottom', {bottom: '160px', left: '773px',width: '18px', height: '5px',action: 'lowerDrawbridge'}))
    this.ledges.push(new Landscape('drawbridge-closed', 'solid ledge', {bottom: '50px', left: '1188px',width: '20px', height: '100px'}))
    this.ledges.push(new Landscape('ledge6', 'solid ledge', {bottom: '265px', left: '1028px',width: '92px', height: '15px'}))
    this.ledges.push(new Landscape('ledge7', 'solid ledge sticky-right', {bottom: '50px', left: '800px',width: '48px', height: '269px'}))
    this.ledges.push(new Landscape('ledge11', 'solid ledge', {bottom: '319px', left: '800px',width: '10px', height: '89px'}))
    this.ledges.push(new Landscape('ledge8', 'solid ledge', {bottom: '194px', left: '988px',width: '248px', height: '30px'}))
    this.ledges.push(new Landscape('ledge10', 'solid ledge', {bottom: '194px', left: '1180px',width: '18px', height: '330px'}))
    this.ledges.push(new Landscape('ledge9', 'solid ledge next-scene', {bottom: '50px', right: '-20px',width: '10px', height: '500px'}))
    this.ledges.push(new Landscape('blind1', 'blind', {bottom: '50px', left: '530px',width: '30px', height: '50px'}))
    this.baddies.push(new Baddie('Sven', 'baddie', 500, 200, {start: 'right', pattern: 'strict'}))
    this.baddies.push(new Baddie('Grant', 'baddie', 400, 200, {start: 'left', pattern: 'strict'}))
    this.baddies.push(new Baddie('Hunter', 'baddie', 500, 510, {start: 'left', pattern: 'strict', waitTime: 400}))
    this.baddies.push(new Baddie('Steve', 'baddie', 930, 510, {start: 'sleeping'}))
    this.baddies.push(new Baddie('Gunther', 'baddie', 1049, 295))
    this.baddies.push(new Baddie('Edward', 'baddie', 1049, 345))
    this.drawbridgeLowered = false
  }
  lowerDrawbridge(solid) {
    if (this.drawbridgeLowered) {
      return
    }
    this.drawbridgeLowered = true
    this.lever = solid
    //need to animate the ledge lowering when the lever lowers
    document.getElementById('drawbridge-and-lever').classList.add('lower')
    solid.position.y = solid.position.y + 13
    this.leverLower(solid)
    let closedDrawbridge = solids.find((solid) => {return solid.name == 'drawbridge-closed'});
    closedDrawbridge.coordinates[1] = [600, 601]
  }
  leverLower() {
    setTimeout( () => {
      this.lever.coordinates[1] = [this.lever.coordinates[1][0]+1, this.lever.coordinates[1][1]+1]
      hero.setPosition()
      if (this.lever.coordinates[1][0] < 448) {
        this.leverLower()
      }
    }, 150)
  }
}

class Scene2 extends Scene {
  // small house on the very rightwith person washing clothes, facing a tree you need to climb,
  // knock their water over and then they have to go to the well for more
  // while lowering the bucket into the well you can now sneak to the tree
  //climb the tree to reach the top of the small house where you can reach the castles 2nd level
  // on the left side, you can now jump to the top of whatever the left platform is
  // another task should be necessary to open some passageway

  //like the idea of shaking a tree branch and getting some birds to fly up and make noise on the balcony
  //causing the enemies to come out to shoo them away and leave the door open

  //alarm for more guys to come out of castle?
  build() {
    this.ledges.push(new Landscape('well1', 'ledge ', {bottom: '50px', right: '40px',width: '42px', height: '40px'})) //desgin appearances only
    this.ledges.push(new Landscape('house1', 'ledge ', {bottom: '55px', right: '180px',width: '122px', height: '120px'})) //desgin appearances only
    this.ledges.push(new Landscape('castle1', 'ledge ', {bottom: '55px', right: '440px',width: '180px', height: '140px'})) //desgin appearances only
    this.ledges.push(new Landscape('castle2', 'ledge ', {bottom: '200px', right: '440px',width: '180px', height: '120px'})) //desgin appearances only
    this.ledges.push(new Landscape('castle3', 'ledge ', {bottom: '320px', right: '440px',width: '180px', height: '120px'})) //desgin appearances only
    this.ledges.push(new Landscape('house2', 'ledge ', {bottom: '55px', left: '320px',width: '122px', height: '150px'})) //desgin appearances only
    this.ledges.push(new Landscape('house3', 'ledge ', {bottom: '55px', left: '120px',width: '122px', height: '150px'})) //desgin appearances only

    this.sceneBackgrounds.push(new Background('grass', 'main-grass', {position: {y: 100,x: 0},height: world.height}))
    this.ledges.push(new Landscape('sceneWallLeft', 'solid ledge', {bottom: '50px', left: '-20px',width: '22px', height: '600px'}))
    this.ledges.push(new Landscape('sceneWallRight', 'solid ledge', {bottom: '50px', right: '-20px',width: '22px', height: '600px'}))
    this.ledges.push(new Landscape('treeBranch1', 'solid ledge sticky-left', {bottom: '130px', right: '70px',width: '22px', height: '100px'}))
    this.ledges.push(new Landscape('treeBranch2', 'solid ledge sticky-bottom', {bottom: '230px', right: '70px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('door1', 'blind', {bottom: '55px', left: '910px',width: '30px', height: '50px'}))
    this.ledges.push(new Landscape('roof1', 'solid ledge', {bottom: '170px', right: '180px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('chimney1', 'solid ledge', {bottom: '180px', right: '280px',width: '22px', height: '30px'}))
    this.ledges.push(new Landscape('bush', 'blind', {bottom: '55px', left: '150px',width: '30px', height: '30px'}))
    this.ledges.push(new Landscape('bush2', 'blind', {bottom: '55px', left: '550px',width: '30px', height: '30px'}))
    this.ledges.push(new Landscape('castleRoof1', 'solid ledge sticky-bottom', {bottom: '190px', right: '410px',width: '242px', height: '5px'}))
    this.ledges.push(new Landscape('castleRoof2', 'solid ledge sticky-bottom', {bottom: '310px', right: '320px',width: '422px', height: '10px'}))
    this.ledges.push(new Landscape('castleRoof3', 'solid ledge sticky-bottom', {bottom: '430px', right: '350px',width: '362px', height: '10px'}))
    this.ledges.push(new Landscape('roof2', 'solid ledge', {bottom: '200px', left: '320px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('roof3', 'solid ledge', {bottom: '200px', left: '120px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('treeBranch3', 'solid ledge sticky-bottom', {bottom: '290px', left: '0px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('treeBranch4', 'solid ledge sticky-bottom', {bottom: '190px', left: '0px',width: '64px', height: '5px'}))
    this.ledges.push(new Landscape('chimney2', 'solid ledge', {bottom: '200px', left: '380px',width: '22px', height: '40px'}))
    this.ledges.push(new Landscape('door2', 'blind', {bottom: '322px', right: '480px',width: '30px', height: '50px'}))

    // this.baddies.push(new Baddie('Peter', 'baddie', 500, 500, {start: 'right', pattern: 'strict', range: [460, 850], waitTime: 5000}))
    var bucket = new Landscape('bucket', 'bucket action-item', {bottom: '50px', left: '990px', width: '10px', height: '15px'})
    var washedItem = new Landscape('washed-item', 'washed-item', {bottom: '50px', left: '1050px', width: '10px', height: '15px'})
    this.actionItems.push(bucket)
    this.ledges.push(washedItem)
    this.baddies.push(new Launderer('Gary', 'baddie', 1000, 515, {start: 'laundry', bucket: bucket, washedItem: washedItem}))
    // this.baddies.push(new Baddie('Mustafa', 'baddie', 500, 510, {start: 'left', pattern: 'strict', waitTime: 400}))
    // this.baddies.push(new Baddie('Gordon', 'baddie', 930, 510, {start: 'sleeping'}))
    // this.baddies.push(new Baddie('Jerome', 'baddie', 1049, 295))
    // this.baddies.push(new Baddie('Brian', 'baddie', 1049, 345))
    // var baddieCounter = 0
    // function baddieGen() {
    //   baddieCounter += 1
    //
    //   new Baddie('castle-multitude'+baddieCounter, 'baddie', 200, 400)
    //   console.count('baddie');
    //   console.log(baddieCounter);
    // }
    // setInterval (baddieGen, 500)
  }
}

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
    this.scenes = [new Scene1, new Scene2]

    super.start()

  }
}

let level = new Level1()




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
