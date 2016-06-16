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
    super.build()
    this.birdsScared = false

    this.baddiesAlerted = false
    floor = 550
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
    this.ledges.push(new Landscape('treeBranch3', 'solid ledge sticky-bottom', {bottom: '290px', left: '0px',width: '122px', height: '10px', action: 'scareBirds'}))
    this.ledges.push(new Landscape('treeBranch4', 'solid ledge sticky-bottom', {bottom: '190px', left: '0px',width: '64px', height: '5px'}))
    this.ledges.push(new Landscape('chimney2', 'solid ledge', {bottom: '200px', left: '390px',width: '22px', height: '50px'}))

    var bucket = new Landscape('bucket', 'bucket action-item', {bottom: '50px', left: '990px', width: '10px', height: '15px', action: 'knockBucketOver'})
    var washedItem = new Landscape('washed-item', 'washed-item', {bottom: '50px', left: '1050px', width: '10px', height: '15px'})
    this.actionItems.push(bucket)
    this.ledges.push(washedItem)
    this.baddies.push(new Baddie('Peter', 'baddie', 500, 500, {start: 'right', pattern: 'strict', range: [460, 800], waitTime: 4000}))
    this.baddies.push(new Launderer('Gary', 'baddie', 1000, 515, {start: 'laundry', bucket: bucket, washedItem: washedItem}))
    this.baddies.push(new Baddie('Mustafa', 'baddie', 600, 370, {start: 'right', pattern: 'strict', waitTime: 2000}))

    // this.baddies.push(new Baddie('Gordon', 'baddie', 930, 510, {start: 'sleeping'}))
    // this.baddies.push(new Baddie('Jerome', 'baddie', 1049, 295))
    // this.baddies.push(new Baddie('Brian', 'baddie', 1049, 345))

  }
  scareBirds() {
    if (this.birdsScared) {
      return
    }
    this.birdsScared = true
    setTimeout(() => {
      this.ledges.push(new Landscape('door2', 'blind next-scene', {bottom: '322px', right: '480px',width: '30px', height: '50px'}))
      this.baddies.push(new Baddie('Clifford', 'baddie', 690, 250, {start: 'left', pattern: 'scareBirds', waitTime: 400}))
    }, 3000)
    report.send('Birds Scared')
    console.log('congrats, bird hater.')
  }
  knockBucketOver(bucket) {
    if (bucket.knockedOver) { return }
    bucket.knockedOver = true
    report.send('Bucket Knocked Over')
  }
  alertBaddies() {
    //stop this from triggering after a death
    this.baddiesAlerted = true
    let lowerTierBaddies = ['Chris', 'Cody', 'Chico', 'Matt', 'Ben', 'Dan', 'Stan', 'Steve', 'Jon', 'Jonas', 'Copper', 'Chandler', 'Carvel', 'Chester']
    let upperTierBaddies = ['Dave', 'Aaron', 'Jester', 'Hugo']
    var baddieCounter1 = 0
    var baddieCounter2 = 0
    let _this = this
    this.ledges.push(new Landscape('door2', 'blind next-scene', {bottom: '322px', right: '480px',width: '30px', height: '50px'}))
    function baddieGen1() {
      if (_this.tearingDown) { return }
      _this.baddies.push(new Baddie(lowerTierBaddies[baddieCounter1], 'baddie', 600, 515))
      baddieCounter1++
      if (baddieCounter1 < lowerTierBaddies.length) {
        _this.timeouts.push(setTimeout(function () {
          baddieGen1()
        }, 500))
      }
    }
    function baddieGen2() {
      if (_this.tearingDown) { return }
      _this.baddies.push(new Baddie(upperTierBaddies[baddieCounter2], 'baddie', 690, 250))
      baddieCounter2++
      if (baddieCounter2 < upperTierBaddies.length) {
        _this.timeouts.push(setTimeout(function () {
          baddieGen2()
        }, 800))
      }
    }
    baddieGen1()
    baddieGen2()
  }
}
