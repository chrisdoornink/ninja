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
    this.feetWidth = 5
    this.startingMove = options.start
    this.pattern = options.pattern || 'random'
  }
  start() {
    if (this.startingMove == 'left') {
      this.leftStart()
    } else if (this.startingMove == 'right') {
      this.rightStart()
    } else {
      this.patrol()
    }
  }
  patrol() {
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
  makeStops(stop, solid) {
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
  }
  stop() {
    super.stop()
    if (this.patrolFlag) { return }
    this.patrolFlag = true
    setTimeout(() => {
      this.patrolFlag = false
      this.patrol()
    }, 2000)
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
    if (obj == hero) {
      setTimeout(() => {
        this.attack(obj)
      }, 200)
    }
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
