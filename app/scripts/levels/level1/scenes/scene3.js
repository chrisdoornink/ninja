class Scene3 extends Scene {
  //inside the building, dont have any other ideas so far
  build() {
    
    // this.ledges.push(new Landscape('well1', 'ledge ', {bottom: '50px', right: '40px',width: '42px', height: '40px'})) //desgin appearances only
    // this.ledges.push(new Landscape('house1', 'ledge ', {bottom: '55px', right: '180px',width: '122px', height: '120px'})) //desgin appearances only
    // this.ledges.push(new Landscape('castle1', 'ledge ', {bottom: '55px', right: '440px',width: '180px', height: '140px'})) //desgin appearances only
    // this.ledges.push(new Landscape('castle2', 'ledge ', {bottom: '200px', right: '440px',width: '180px', height: '120px'})) //desgin appearances only
    // this.ledges.push(new Landscape('castle3', 'ledge ', {bottom: '320px', right: '440px',width: '180px', height: '120px'})) //desgin appearances only
    // this.ledges.push(new Landscape('house2', 'ledge ', {bottom: '55px', left: '320px',width: '122px', height: '150px'})) //desgin appearances only
    // this.ledges.push(new Landscape('house3', 'ledge ', {bottom: '55px', left: '120px',width: '122px', height: '150px'})) //desgin appearances only
    //
    // this.sceneBackgrounds.push(new Background('grass', 'main-grass', {position: {y: 100,x: 0},height: world.height}))
    // this.ledges.push(new Landscape('sceneWallLeft', 'solid ledge', {bottom: '50px', left: '-20px',width: '22px', height: '600px'}))
    // this.ledges.push(new Landscape('sceneWallRight', 'solid ledge', {bottom: '50px', right: '-20px',width: '22px', height: '600px'}))
    // this.ledges.push(new Landscape('treeBranch1', 'solid ledge sticky-left', {bottom: '130px', right: '70px',width: '22px', height: '100px'}))
    // this.ledges.push(new Landscape('treeBranch2', 'solid ledge sticky-bottom', {bottom: '230px', right: '70px',width: '122px', height: '10px'}))
    // this.ledges.push(new Landscape('door1', 'blind', {bottom: '55px', left: '910px',width: '30px', height: '50px'}))
    // this.ledges.push(new Landscape('roof1', 'solid ledge', {bottom: '170px', right: '180px',width: '122px', height: '10px'}))
    // this.ledges.push(new Landscape('chimney1', 'solid ledge', {bottom: '180px', right: '280px',width: '22px', height: '30px'}))
    // this.ledges.push(new Landscape('bush', 'blind', {bottom: '55px', left: '150px',width: '30px', height: '30px'}))
    // this.ledges.push(new Landscape('bush2', 'blind', {bottom: '55px', left: '550px',width: '30px', height: '30px'}))
    // this.ledges.push(new Landscape('castleRoof1', 'solid ledge sticky-bottom', {bottom: '190px', right: '410px',width: '242px', height: '5px'}))
    // this.ledges.push(new Landscape('castleRoof2', 'solid ledge sticky-bottom', {bottom: '310px', right: '320px',width: '422px', height: '10px'}))
    // this.ledges.push(new Landscape('castleRoof3', 'solid ledge sticky-bottom', {bottom: '430px', right: '350px',width: '362px', height: '10px'}))
    // this.ledges.push(new Landscape('roof2', 'solid ledge', {bottom: '200px', left: '320px',width: '122px', height: '10px'}))
    // this.ledges.push(new Landscape('roof3', 'solid ledge', {bottom: '200px', left: '120px',width: '122px', height: '10px'}))
    // this.ledges.push(new Landscape('treeBranch3', 'solid ledge sticky-bottom', {bottom: '290px', left: '0px',width: '122px', height: '10px'}))
    // this.ledges.push(new Landscape('treeBranch4', 'solid ledge sticky-bottom', {bottom: '190px', left: '0px',width: '64px', height: '5px'}))
    // this.ledges.push(new Landscape('chimney2', 'solid ledge', {bottom: '200px', left: '380px',width: '22px', height: '40px'}))
    // this.ledges.push(new Landscape('door2', 'blind', {bottom: '322px', right: '480px',width: '30px', height: '50px'}))

    this.baddies.push(new Baddie('Simon', 'baddie', 500, 500, {start: 'right', pattern: 'strict', range: [460, 850], waitTime: 5000}))
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
