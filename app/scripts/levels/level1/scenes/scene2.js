class Scene2 extends Scene {
  build() {
    super.build()
    this.birdsScared = false
    document.getElementById('world').className = 'sunset-transition'
    document.getElementById('foreground').style.background = "linear-gradient(to bottom, rgba(0,0,50,.1) 0%, rgba(0,0,50,.3) 70%)"
    this.baddiesAlerted = false
    floor = 550
    this.sceneBackgrounds.push(new Background('facade', 'facades/Level1Scene2Test4', {position: {y: 0,x: 0},height: world.height, width: world.width}))
    this.sceneBackgrounds.push(new Background('facade', 'facades/Level1Scene2Foreground', {position: {y: 0,x: 0},height: world.height, width: world.width,foreground: true}))
    this.sceneBackgrounds.push(new Background('shrubs1', 'foreground-shrubs2', {position: {y: 15,x: 0},height: 600,foreground: true, sceneSpecific: true}))
    this.ledges.push(new Landscape('sceneWallLeft', 'solid ledge', {bottom: '50px', left: '-20px',width: '22px', height: '600px'}))
    this.ledges.push(new Landscape('sceneWallRight', 'solid ledge', {bottom: '50px', right: '-20px',width: '22px', height: '600px'}))
    this.ledges.push(new Landscape('treeBranch1', 'solid ledge sticky-left', {bottom: '130px', right: '70px',width: '22px', height: '100px'}))
    this.ledges.push(new Landscape('treeBranch2', 'solid ledge sticky-bottom', {bottom: '230px', right: '70px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('door1', 'blind', {bottom: '55px', left: '215px',width: '10px', height: '50px'}))
    this.ledges.push(new Landscape('door2', 'blind', {bottom: '55px', left: '340px',width: '10px', height: '50px'}))
    this.ledges.push(new Landscape('door3', 'blind', {bottom: '55px', left: '915px',width: '10px', height: '50px'}))
    this.ledges.push(new Landscape('roof1', 'solid ledge', {bottom: '170px', right: '180px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('chimney1', 'solid ledge', {bottom: '180px', right: '280px',width: '22px', height: '30px'}))
    this.ledges.push(new Landscape('hay', 'blind', {bottom: '55px', left: '550px',width: '10px', height: '30px'}))
    this.ledges.push(new Landscape('castleRoof1', 'solid ledge', {bottom: '179px', right: '410px',width: '242px', height: '16px'}))
    this.ledges.push(new Landscape('castleRoof1Bottom', 'solid ledge sticky-bottom', {bottom: '178px', right: '390px',width: '275px', height: '5px'}))
    this.ledges.push(new Landscape('castleRoof2', 'solid ledge', {bottom: '312px', right: '320px',width: '422px', height: '18px'}))
    this.ledges.push(new Landscape('castleRoof2Bottom', 'solid ledge sticky-bottom', {bottom: '311px', right: '305px',width: '452px', height: '5px'}))
    this.ledges.push(new Landscape('castleRoof3', 'solid ledge sticky-bottom', {bottom: '423px', right: '390px',width: '270px', height: '10px'}))
    this.ledges.push(new Landscape('roof2', 'solid ledge', {bottom: '200px', left: '320px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('roof3', 'solid ledge', {bottom: '200px', left: '120px',width: '122px', height: '10px'}))
    this.ledges.push(new Landscape('treeBranch3', 'solid ledge sticky-bottom', {bottom: '292px', left: '0px',width: '116px', height: '10px', action: 'scareBirds'}))
    this.ledges.push(new Landscape('treeBranch4', 'solid ledge sticky-bottom', {bottom: '192px', left: '0px',width: '57px', height: '5px'}))
    this.ledges.push(new Landscape('chimney2', 'solid ledge', {bottom: '208px', left: '391px',width: '22px', height: '50px'}))

    var bucket = new Landscape('bucket', 'bucket action-item', {bottom: '50px', left: '990px', width: '10px', height: '15px', action: 'knockBucketOver'})
    var washedItem = new Landscape('washed-item', 'washed-item', {bottom: '50px', left: '1150px', width: '10px', height: '15px'})
    this.actionItems.push(bucket)
    this.ledges.push(washedItem)
    this.baddies.push(new Baddie('Peter', 'baddie', 500, 500, {start: 'right', pattern: 'strict', range: [460, 800], waitTime: 4000}))
    this.baddies.push(new Launderer('Gary', 'baddie', 1000, 515, {start: 'laundry', bucket: bucket, washedItem: washedItem}))
    this.baddies.push(new Baddie('Mustafa', 'baddie', 600, 370, {start: 'right', pattern: 'strict', waitTime: 2000}))
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
  }
  knockBucketOver(bucket) {
    if (bucket.knockedOver) { return }
    bucket.knockedOver = true
    report.send('Bucket Knocked Over')
  }
  alertBaddies() {
    this.baddiesAlerted = true
    let lowerTierBaddies = ['Chris', 'Cody', 'Chico', 'Matt', 'Ben', 'Dan', 'Stan', 'Steve', 'Jon', 'Jonas', 'Copper', 'Chandler', 'Carvel', 'Chester']
    let upperTierBaddies = ['Dave', 'Aaron', 'Jester', 'Hugo']
    var baddieCounter1 = 0
    var baddieCounter2 = 0
    let _this = this
    this.ledges.push(new Landscape('doorCastleTop', 'blind next-scene', {bottom: '322px', right: '514px',width: '30px', height: '50px'}))
    function baddieGen1() {
      if (_this.tearingDown) { return }
      _this.baddies.push(new Baddie(lowerTierBaddies[baddieCounter1], 'baddie', 660, 515))
      baddieCounter1++
      if (baddieCounter1 < lowerTierBaddies.length) {
        _this.timeouts.push(setTimeout(function () {
          baddieGen1()
        }, 500))
      }
    }
    function baddieGen2() {
      if (_this.tearingDown) { return }
      _this.baddies.push(new Baddie(upperTierBaddies[baddieCounter2], 'baddie', 660, 250))
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
