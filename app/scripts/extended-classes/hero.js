class Hero extends Character {
  init(id, x, y) {
    super.init(id, x, y)
    this.walkSpeed = 0.6
    this.runSpeed = 2.4
    this.maxSpeed = this.walkSpeed
    this.acceleration = 0.3
    this.climber = true
    this.canSee = false
    this.feetWidth = 10
    this.jumpPower = 8
    Mousetrap.bind(['left', 'shift+left'], () => { this.leftStart() })
    Mousetrap.bind(['left', 'shift+left'], () => { this.leftStop() }, 'keyup')
    Mousetrap.bind(['right', 'shift+right'], () => { this.rightStart() })
    Mousetrap.bind(['right', 'shift+right'], () => { this.rightStop() }, 'keyup')
    Mousetrap.bind(['up', 'shift+up'], () => { this.jump() })
    Mousetrap.bind(['up', 'shift+up'], () => { this.climbStop() }, 'keyup')
    Mousetrap.bind(['down', 'shift+down'], () => { this.down() })
    Mousetrap.bind(['down', 'shift+down'], () => { this.climbStop() }, 'keyup')
    Mousetrap.bind('shift', () => { this.maxSpeed = this.runSpeed })
    Mousetrap.bind('shift', () => { this.maxSpeed = this.walkSpeed }, 'keyup')
  }
  die(killer) {
    report.send('death', {character: 'hero', killer: killer})
    level.restartScene(killer)
  }
  makeStops(stop, solid) {
    super.makeStops(stop, solid)
    if (solid.isNextSceneTrigger) {
      if (this.sceneChangeFlag) { return }
      this.sceneChangeFlag = true
      level.nextScene()
    }
  }
  collisionDetection() {
    this.inBlind = false
    super.collisionDetection()
    for (var i=0, len = blinds.length; i < len; i++) {
      var blind = blinds[i]
      let p1 = blind.coordinates || this.getCoordinates(blind)
      let p2 = this.coordinates || this.getCoordinates(this)
      let it = {left: p1[0][0],right: p1[0][1],top: p1[1][0],bottom: p1[1][1]}
      let me = {left: p2[0][0],right: p2[0][1],top: p2[1][0],bottom: p2[1][1]}
      if (me.right >= it.left && me.left <= it.right && me.bottom >= it.top && me.top <= it.bottom) {
        this.inBlind = true
      }
    }
  }
}
