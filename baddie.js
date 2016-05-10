class Baddie extends MovableObject {
  init(id, x, y, options = {}) {
    super.init(id, x, y)
    this.walkSpeed = 0.7
    this.runSpeed = 2.5
    this.maxSpeed = this.walkSpeed
    this.acceleration = 0.2
    this.climber = false
    this.canSee = true
    this.attackMode = false
    console.log('attackMode set to ', this.attackMode);
    this.feetWidth = 5
    this.startingMove = options.start
    this.pattern = options.pattern || 'random'
    this.waitTime = options.waitTime || 2000
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
    if (this.ceasesToExist) { return }
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
  }
  makeStops(stop, solid) {
    if (this.ceasesToExist) {
      console.log('why is this triggering????');
      return
    }
    if (this.sleeping) {
      return
    }
    let v1 = this.velocity.x
    super.makeStops(stop, solid)
    let v2 = this.velocity.x

    //stop at the edge of ledges
    if ((!this.attackMode || ((solid.isDeathRight && v2 > 0) || (solid.isDeathLeft && v2 < 0))) && this.onALedge && ((v2 < 0 && this.position.x <= solid.position.x) || (v2 > 0 && this.position.x + this.width >= solid.position.x + solid.width))) {

      v2 = 0
    }


    if (v1 != v2 && v2 == 0) {
      this.velocity.x = 0
      this.moving = false
      this.stop()
    }

    if (solid == hero && !hero.hidden) {
      level.restartScene(this.name)
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
    }, 100)
  }
  see(obj) {
    // console.log(obj);
    if (obj == hero && !hero.hidden) {
      if ((hero.maxSpeed == hero.runSpeed || (hero.velocity.y > 0 && !hero.grounded)) && this.sleeping) {
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
    this.maxSpeed = this.runSpeed
    this.attackMode = true
    this.pursue(obj)
  }
  pursue(obj) {
    if (this.pursueFlag) { return }
    if (obj.position.x < this.position.x) {
      this.leftStart()
    } else {
      this.rightStart()
    }
    //can also check y positions to jump/climb after hero later
    this.pursueFlag = true
    setTimeout(() => {
      this.pursueFlag = false
      this.pursue(obj)
    }, 200)
  }
}
