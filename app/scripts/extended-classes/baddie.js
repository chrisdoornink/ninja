class Baddie extends Character {
  init(id, x, y, options = {}) {
    super.init(id, x, y)
    this.walkSpeed = 0.7
    this.runSpeed = 2.5
    this.maxSpeed = this.walkSpeed
    this.acceleration = 0.2
    this.climber = false
    this.canSee = true
    this.attackMode = false
    this.feetWidth = 5
    this.startingMove = options.start
    this.pattern = options.pattern || 'random'
    this.waitTime = options.waitTime || 2000
    this.range = options.range
  }
  start() {
    if (this.startingMove == 'left') {
      this.leftStart()
    } else if (this.startingMove == 'right') {
      this.rightStart()
    } else if (this.startingMove == 'sleeping'){
      this.sleep()
    } else {
      this.patrol()
    }
  }
  patrol() {
    if (this.dead || this.ceasesToExist) { return }
    if (this.attackMode) {
      this.pursue()
    } else {
      this.lookAround()
      if (this.pattern == 'strict') {
        if (this.facing == 'left') {
          this.rightStart()
        } else {
          this.leftStart()
        }
      } else {
        let rnd = Math.random()
        if (rnd > 0.6) {
          this.leftStart()
        } else if (rnd < 0.4){
          this.rightStart()
        } else {
          this.stop()
        }
      }
    }
  }
  leftStart() {
    if (this.atLedge != 'left') {
      super.leftStart()
      this.atLedge = ''
    } else {
      this.stop()
    }
  }
  rightStart() {
    if (this.atLedge != 'right') {
      super.rightStart()
      this.atLedge = ''
    } else {
      this.stop()
    }
  }
  die(killer) {
    report.send('death', {character: this.name, killer: killer});
    this.dead = true
    this.canSee = false
    this.canHear = false
    this.walkSpeed = 0
    this.runSpeed = 0
    this.maxSpeed = 0
    this.attackMode = false
    this.velocity.x = 0
    this.stop()
  }
  sleep() {
    this.sleeping = true
    this.canSee = false
    this.canHear = true
    this.lookAround()
    this.width = 36
    this.height = 21
    this.position.y = this.position.y + 15
    this.sleepDiv = document.createElement("DIV")
    this.sleepDiv.id = this.div.id + 'Zs'
    this.sleepDiv.className = 'sleep-zs'
    document.getElementById("characters").appendChild(this.sleepDiv);
    this.sleepDiv.style.transform = 'translate3d('+(this.position.x)+'px,'+(this.position.y - 30)+'px,0)'
    this.div.style.height = this.height
    this.div.style.width = this.width
    this.changeAnimation()
    this.setPosition()
  }
  wake() {
    document.getElementById(this.sleepDiv.id).remove();
    this.sleeping = false
    this.canSee = true
    this.canHear = false
    this.width = 21
    this.height = 36
    this.position.y = this.position.y - 15
    this.div.style.height = this.height
    this.div.style.width = this.width
    this.changeAnimation()
    this.setPosition()
    this.patrol()
    report.send('Wake Up', {character: this.name});
  }
  collisionDetection() {
    super.collisionDetection()
    if (this.range && !this.attackMode) {
      if (this.position.x < this.range[0]) {
        this.suddenStop()
        this.position.x = this.range[0]
      } else if (this.position.x > this.range[1]) {
        this.suddenStop()
        this.position.x = this.range[1]
      }
    }
  }
  makeStops(stop, solid) {
    if (this.ceasesToExist || this.dead || this.sleeping) {
      return
    }
    let v1 = this.velocity.x
    super.makeStops(stop, solid)
    let v2 = this.velocity.x

    //stop at the edge of ledges
    if ((!this.attackMode || ((solid.isDeathRight && v2 > 0) || (solid.isDeathLeft && v2 < 0))) && this.onALedge && ((v2 < 0 && this.position.x <= solid.position.x) || (v2 > 0 && this.position.x + this.width >= solid.position.x + solid.width))) {
      if (v2 > 0) {
        this.atLedge = 'right'
      } else {
        this.atLedge = 'left'
      }
      v2 = 0
    }


    if (v1 != v2 && v2 == 0) {
      this.velocity.x = 0
      this.moving = false
      this.stop()
    }

    if (solid == hero && !hero.hidden) {
      hero.die(this.name)
    }
  }
  stop() {
    super.stop()
    if (this.patrolFlag) { return }
    this.patrolFlag = true
    setTimeout(() => {
      this.patrolFlag = false
      this.patrol()
    }, this.waitTime)
  }
  lookAround() {
    if (this.lookFlag) { return }
    this.lookFlag = true
    setTimeout(() => {
      this.lookFlag = false
      this.lookAround()
      if (!this.moving) {
        this.collisionDetection()
      }
    }, 1000)
  }
  see(obj) {
    // console.log(obj);
    if (obj == hero && !hero.hidden) {
      if ((hero.maxSpeed == hero.runSpeed || (hero.velocity.y > 3)) && this.sleeping) {
        this.wake()
      } else if (!this.sleeping) {
        setTimeout(() => {
          this.attack(obj)
        }, 200)
      }
    }
  }
  hear(obj) {
    this.see(obj)
  }
  attack(obj) {
    if (!this.attackMode) {
      this.maxSpeed = this.runSpeed
      this.attackMode = true
      this.pursue(obj)
      report.send('Attack', {character: this.name});
    }
  }
  pursue(obj) {
    if (this.pursueFlag) { return }
    if (obj.position.x < this.position.x) {
      this.leftStart()
    } else {
      this.rightStart()
    }
    //can also check y positions to jump/climb after hero later
    this.alertOthers(obj)
    this.pursueFlag = true
    setTimeout(() => {
      this.pursueFlag = false
      if (!this.dead && !this.ceasesToExist) {
        this.pursue(obj)
      }
    }, 200)
  }
  alertOthers(obj) {
    let baddies = level.scenes[level.currentScene].baddies
    for (var i = 0; i < baddies.length; i++) {
      let baddie = baddies[i]
      if (!baddie.attackMode) {
        if (this.position.x - baddie.position.x < 120 && this.position.x - baddie.position.x > -120 && this.position.y - baddie.position.y < 70 && this.position.y - baddie.position.y > -70) {
          if (baddie.sleeping) {
            baddie.wake()
          } else {
            baddie.attack(obj)
          }
        }
      }
    }
    if (level.scenes[level.currentScene].alertBaddies && !level.scenes[level.currentScene].baddiesAlerted) {
      level.scenes[level.currentScene].alertBaddies()
    }
  }
}
