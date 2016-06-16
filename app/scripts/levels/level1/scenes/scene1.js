class Scene1 extends Scene{
  build() {
    super.build()
    floor = 570
    this.sceneBackgrounds.push(new Background('facade', 'facades/scene1c', {position: {y: 0,x: 0},height: world.height, width: world.width}))
    this.sceneBackgrounds.push(new Background('fire', 'fire4', {position: {y: 462,x: 900}, height: 200, width: 200, animationClass: 'fire'}))
    // this.sceneBackgrounds.push(new Background('drawbridge-and-lever', 'facades/level2-drawbridge/drawbridge-and-lever', {position: {y: 434,x: 766}, height: 166, width: 434, animationClass: 'drawbridge'}))
    // this.foreground = new Background('shrubs1', 'foreground-shrubs2', {position: {y: 15,x: 0},height: 600,foreground: true, sceneSpecific: true})
    this.ledges.push(new Landscape('ledge0', 'solid ledge', {bottom: '30px', left: '-20px',width: '22px', height: '600px'}))
    this.ledges.push(new Landscape('ledge1', 'solid ledge', {bottom: '30px', left: '200px',width: '80px', height: '80px'}))
    this.ledges.push(new Landscape('ledge2', 'solid ledge sticky-right', {bottom: '30px', left: '320px',width: '40px', height: '146px'}))
    this.ledges.push(new Landscape('ledge3', 'solid ledge sticky-left', {bottom: '170px', left: '440px',width: '80px', height: '106px'}))
    this.ledges.push(new Landscape('ledge4', 'solid ledge jump-through death-right death-left', {bottom: '352px', left: '365px',width: '300px', height: '10px'}))
    this.ledges.push(new Landscape('ledge5', 'solid ledge sticky-bottom', {bottom: '475px', left: '400px',width: '710px', height: '5px'}))
    this.ledges.push(new Landscape('lever', 'solid ledge sticky-left sticky-bottom', {bottom: '93px', left: '796px',width: '5px', height: '35px',action: 'lowerDrawbridge'}))
    this.ledges.push(new Landscape('drawbridge-closed', 'solid ledge', {bottom: '25px', left: '1190px',width: '10px', height: '170px'}))
    this.ledges.push(new Landscape('ledge6', 'solid ledge', {bottom: '268px', left: '1028px',width: '92px', height: '10px'}))
    this.ledges.push(new Landscape('ledge7', 'solid ledge sticky-right', {bottom: '30px', left: '805px',width: '45px', height: '282px'}))
    this.ledges.push(new Landscape('ledge11', 'solid ledge', {bottom: '313px', left: '804px',width: '3px', height: '99px'}))
    this.ledges.push(new Landscape('ledge8', 'solid ledge', {bottom: '194px', left: '990px',width: '248px', height: '30px'}))
    this.ledges.push(new Landscape('ledge10', 'solid ledge', {bottom: '194px', left: '1180px',width: '18px', height: '330px'}))
    this.ledges.push(new Landscape('ledge12', 'solid ledge', {bottom: '194px', left: '1150px',width: '38px', height: '60px'}))
    this.ledges.push(new Landscape('ledge9', 'solid ledge next-scene', {bottom: '50px', right: '-20px',width: '10px', height: '500px'}))
    this.ledges.push(new Landscape('blind1', 'blind', {bottom: '30px', left: '504px',width: '25px', height: '50px'}))
    this.baddies.push(new Baddie('Sven', 'baddie', 500, 200, {start: 'right', pattern: 'strict'}))
    this.baddies.push(new Baddie('Grant', 'baddie', 400, 200, {start: 'left', pattern: 'strict'}))
    this.baddies.push(new Baddie('Hunter', 'baddie', 500, 530, {start: 'left', pattern: 'strict', range: [420, 700], waitTime: 2000}))
    this.baddies.push(new Baddie('Steve', 'baddie', 930, 530, {start: 'sleeping'}))
    this.baddies.push(new Baddie('Gunther', 'baddie', 1049, 295, {start: 'right', pattern: 'strict', waitTime: 2000}))
    this.baddies.push(new Baddie('Edward', 'baddie', 1049, 345, {start: 'right', pattern: 'strict', waitTime: 5000}))
    this.drawbridgeLowered = false
  }
  lowerDrawbridge(solid) {
    if (this.drawbridgeLowered) {
      return
    }
    this.drawbridgeLowered = true
    this.lever = solid
    //need to animate the ledge lowering when the lever lowers
    // document.getElementById('drawbridge-and-lever').classList.add('lower')
    solid.position.y = solid.position.y + 13
    this.leverLower(solid)
    let closedDrawbridge = solids.find((solid) => {return solid.name == 'drawbridge-closed'});
    closedDrawbridge.coordinates[1] = [600, 601]
    report.send('Drawbridge Lowered')
  }
  leverLower() {
    setTimeout( () => {
      this.lever.coordinates[1] = [this.lever.coordinates[1][0]+1, this.lever.coordinates[1][1]+1]
      hero.setPosition()
      if (this.lever.coordinates[1][0] < 488) {
        this.leverLower()
      }
    }, 150)
  }
}
