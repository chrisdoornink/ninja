class MovableObject {
  constructor(id, classes, x, y, options) {
    this.name = id
    this.init(id,x,y,options)
    this.div = document.createElement("DIV")
    this.div.id = id
    this.div.className = classes
    document.getElementById("landscape").appendChild(this.div);
    this.height = this.div.clientHeight
    this.width = this.div.clientWidth

    if (this.div.classList.contains('solid')) {
      solids.push(this)
    }
    this.setPosition({x:x,y:y})
    this.start()
  }
  init(id, x, y) {
    this.name = id
    this.position = {x:x,y:y}
    this.gravityMax = 8
    this.gravityVelocity = 0.5
    this.velocity = {x: 0, y: 0}
    this.grounded = false
    this.moving = false
    this.framerate = 16 //~60fps
    this.facing = 'right'

    //these values can be in other classes init functions
    this.maxSpeed = 6
    this.acceleration = 0.5
    this.climber = false
    this.canSee = false
    this.jumpPower = 7

  }
  start() {
    return
  }
  setPosition(options) {
    if (options && options.x != undefined && options.y != undefined) { this.position = {x:options.x, y:options.y} }
    this.div.style.transform = 'translate3d('+this.position.x+'px,'+this.position.y+'px,0)'
    this.gravity()
    this.collisionDetection()
    // if (this.check){
    //   this.collisionDetection()
    //   this.check = false
    // } else {
    //   this.check = true
    // }
  }
  gravity() {
    if (this.gravityFlag) { return }
    this.gravityFlag = true
    setTimeout(() => {
      this.gravityFlag = false
      if (!this.grounded && !this.hanging) {
        this.climbing = false

        let feet = this.height + this.position.y
        if (feet < floor) {
          this.velocity.y = this.velocity.y >= 7 ? 7 : this.velocity.y + .4
          this.position.y = this.position.y + this.velocity.y
          this.setPosition()
        } else {
          this.position.y = this.position.y + (floor - feet)
          this.setPosition()
          this.grounded = true
        }
      } else {
        this.changeAnimation()
      }
      if (this.velocity.y >= 0 && this.velocity.y < 0.4) {
        this.changeAnimation()
      }
    }, this.framerate)
  }
  collisionDetection() {

    let closestEyeLineSolid = null
    let closestKneeLineSolid = null

    this.onALedge = false
    this.hangingOnALedge = false
    var objs = solids
    for (var i=0, len = objs.length; i < len; i++) {
      var solid = objs[i]
      if (solid != this) {
        let pos = solid.coordinates || this.getCoordinates(solid)
        let pos2 = this.coordinates || this.getCoordinates(this)
        let stop = this.compareCoordinates(pos,pos2)
        if (!stop.none) {
          this.makeStops(stop, solid)
        }
        if (stop.eyeLine && (!closestEyeLineSolid || this.closer(solid, closestEyeLineSolid))) {
          closestEyeLineSolid = solid
        }
        if (stop.kneeLine && (!closestKneeLineSolid || this.closer(solid, closestKneeLineSolid))) {
          closestKneeLineSolid = solid
        }
      }
    }
    if (this.onALedge) {
      this.grounded = true
    }
    if (this.hangingOnALedge) {
      this.hanging = true
    }

    if (closestEyeLineSolid) {
      this.see(closestEyeLineSolid)
      if (closestKneeLineSolid && (closestKneeLineSolid != closestEyeLineSolid) && this.closer(closestKneeLineSolid, closestEyeLineSolid)) {
        this.see(closestKneeLineSolid)
      }
    }
  }
  see(el) {
    return;
  }
  getCoordinates(obj) {
    if (obj.coordinates) { return obj.coordinates }
    let pos = obj.position
    if (!pos) { console.log('position not defined for ', obj)}
    return [ [ pos.x, pos.x + this.width ], [ pos.y, pos.y + this.height ] ];
  }
  compareCoordinates(p1,p2) {
    let it = {left: p1[0][0],right: p1[0][1],top: p1[1][0],bottom: p1[1][1]}
    let me = {left: p2[0][0],right: p2[0][1],top: p2[1][0],bottom: p2[1][1]}
    let myEyes = me.top + (me.bottom - me.top) * 0.2
    let myKnees = me.bottom - (me.bottom - me.top) * 0.2

    let stop = {none: true, left: false, right: false, top: false, bottom: false, eyeLine: false, kneeLine: false}
    if (me.right >= it.left && me.left <= it.right && me.bottom >= it.top && me.top <= it.bottom) {
      if (me.left <= it.right && (me.left > it.left || me.right > it.right) && me.bottom >= (it.top + 11)) {
        stop.left = it.right
        stop.none = false
      }
      if (me.right >= it.left && (me.right < it.right || me.left < it.left) && me.bottom >= (it.top + 11)) {
        stop.right = it.left - this.width
        stop.none = false
      }
      let footGap = this.feetWidth ? ((this.width - this.feetWidth) / 2) : 0
      if (this.feetWidth && (me.right - footGap) >= it.left && (me.left + footGap) <= it.right) {
        if (me.top <= it.bottom && (me.top > it.top || me.bottom > it.bottom)) {
          stop.top = it.bottom
          stop.none = false
        }
        if (me.bottom >= it.top && (me.bottom < it.bottom || me.top < it.top)) {
          stop.bottom = it.top - this.height
          stop.none = false
        }
      }
    }
    if (this.canSee) {
      if (this.facing == 'left') {
        if (myEyes <= it.bottom && myEyes >= it.top && me.left > it.right) {
          stop.eyeLine = true
        } else if (myKnees <= it.bottom && myKnees >= it.top && me.left > it.right) {
          stop.kneeLine = true
        }
      }
      if (this.facing == 'right') {
        if (myEyes <= it.bottom && myEyes >= it.top && me.right < it.left) {
          stop.eyeLine = true
        } else if (myKnees <= it.bottom && myKnees >= it.top && me.right < it.left) {
          stop.kneeLine = true
        }
      }
    }
    let feet = this.height + this.position.y
    if (!stop.left && !stop.right && !stop.top && !stop.bottom && feet < floor) {
      this.grounded = false
      this.hanging = false
    }
    if ((stop.left || stop.right) && this.climbingUp && me.top + 20 < it.top) {
      stop.climbOverLedge = true
    }
    return stop
  }
  makeStops(stop, solid) {
    // console.log(stop);
    // jump up into an object
    if (!solid.isJumpThrough && stop.top && !stop.bottom && (this.velocity.y < 0 || solid.isStickyBottom)) {
      this.velocity.y = 0
      if (solid.isStickyBottom && this.climber) {
        this.hangingOnALedge = true
        this.position.y = stop.top
        this.div.style.transform = 'translate3d('+this.position.x+'px,'+this.position.y+'px,0)'
      }
    }
    //land on an object
    if (stop.bottom && !stop.top && this.velocity.y >= 0 && !this.climbing) {
      this.velocity.y = 0
      this.position.y = stop.bottom
      this.onALedge = true
      this.div.style.transform = 'translate3d('+this.position.x+'px,'+this.position.y+'px,0)'
    } else {
      //hit the left side of an object
      if (stop.right && !stop.left && this.velocity.x >= 0 && !this.hangingOnALedge) {
        this.velocity.x = 0
        this.position.x = stop.right
        this.div.style.transform = 'translate3d('+this.position.x+'px,'+this.position.y+'px,0)'
        if (solid.isStickyLeft && this.climber) {
          this.velocity.y = 0
          this.onALedge = true
          this.climbing = true
          this.facing = 'right';
        }
      }
      //hit the right side of an object
      if (stop.left && !stop.right && this.velocity.x <= 0 && !this.hangingOnALedge) {
        this.velocity.x = 0
        this.position.x = stop.left
        this.div.style.transform = 'translate3d('+this.position.x+'px,'+this.position.y+'px,0)'
        if (solid.isStickyRight && this.climber) {
          this.velocity.y = 0
          this.onALedge = true
          this.climbing = true
          this.facing = 'left';
        }
      }
      if (stop.climbOverLedge) {
        if (stop.left) {
          this.position.x = stop.left - this.width
        } else {
          this.position.x = stop.right
        }
        this.position.y = this.position.y - this.height
      }
    }
  }
  closer(el1, el2) {
    let el1pos = this.getCoordinates(el1)
    let el2pos = this.getCoordinates(el2)
    if (this.facing == 'left') {
      return el1pos[0][1] > el2pos[0][1]
    }
    if (this.facing == 'right') {
      return el1pos[0][0] < el2pos[0][0]
    }
  }
  leftStart(run) {
    if (this.moving != 'left') {
      this.moving = 'left'
      this.facing = 'left'
      this.changeAnimation()
      this.leftContinue()
    }
  }
  leftContinue() {
    if (this.moving == 'left') {
      if (this.hanging) {
        this.tempSpeed = .8
      } else {
        this.tempSpeed = null
      }
      if (!this.grounded && !this.hanging && !this.climbing) {
        this.tempAcceleration = .2
      } else {
        this.tempAcceleration = null
      }
      if (this.velocity.x > -(this.tempSpeed || this.maxSpeed)) {
        this.velocity.x = this.velocity.x - (this.tempAcceleration || this.acceleration)
      } else if (this.velocity.x < -(this.tempSpeed || this.maxSpeed)) {
        this.velocity.x = this.velocity.x + (this.tempAcceleration || this.acceleration)
      }
      this.position.x = this.position.x+this.velocity.x
      this.setPosition()
      setTimeout(() => {
        this.leftContinue()
      }, this.framerate)
    }
  }
  leftStop() {
    if (this.moving == 'left') {
      this.moving = false
    }
    this.stop()
  }
  rightStart() {
    //explore other key press options, for smoother animation
    if (this.moving != 'right') {
      this.moving = 'right'
      this.facing = 'right'
      this.changeAnimation()
      this.rightContinue()
    }
  }
  rightContinue() {
    if (this.moving == 'right') {
      if (this.hanging) {
        this.tempSpeed = .8
      } else {
        this.tempSpeed = null
      }
      if (!this.grounded && !this.hanging && !this.climbing) {
        this.tempAcceleration = .2
      } else {
        this.tempAcceleration = null
      }
      if (this.velocity.x < (this.tempSpeed || this.maxSpeed)) {
        this.velocity.x = this.velocity.x + (this.tempAcceleration || this.acceleration)
      } else if (this.velocity.x > (this.tempSpeed || this.maxSpeed)) {
        this.velocity.x = this.velocity.x - (this.tempAcceleration || this.acceleration)
      }
      this.position.x = this.position.x+this.velocity.x
      this.setPosition()
      setTimeout(() => {
        this.rightContinue()
      }, this.framerate)
    }
  }
  rightStop() {
    if (this.moving == 'right') {
      this.moving = false
    }
    this.stop()
  }
  stop() {
    setTimeout(() => {
      let x = this.velocity.x
      if (x == 0 || this.moving) {
        this.changeAnimation()
        return
      }
      if (x < -this.acceleration) {
        this.velocity.x = x + this.acceleration
      } else if (x > this.acceleration) {
        this.velocity.x = x - this.acceleration
      } else {
        this.velocity.x = 0
      }
      this.position.x = this.position.x + this.velocity.x
      this.setPosition()
      this.stop()
    }, this.framerate)
  }
  jump() {
    if (this.climbing) {
      if (!this.climbingMoving) {
        this.climbUp()
      }
    } else if (this.grounded) {
      this.grounded = false
      this.velocity.y = -this.jumpPower
      this.position.y = this.position.y - 5
      this.setPosition()
      this.changeAnimation()
    }
  }
  climbUp() {
    if (this.climbing) {
      this.position.y = this.position.y - 1
      this.setPosition()
      this.changeAnimation()
      this.climbingMoving = true
      this.climbingUp = true
      setTimeout(() => {
        if (this.climbingMoving) {
          this.climbUp()
        }
      }, this.framerate)
    }
  }
  climbStop() {
    this.climbingMoving = false
    this.climbingUp = false
    this.climbingDown = false
  }
  down() {
    if (this.climbing) {
      if (!this.climbingMoving) {
        this.climbDown()
      }
    }
    if (this.hanging) {
      this.hanging = false
      this.position.y = this.position.y + 3
      this.setPosition()
    }
  }
  climbDown() {
    if (this.climbing) {
      this.position.y = this.position.y + 1
      this.setPosition()
      this.changeAnimation()
      this.climbingMoving = true
      this.climbingDown = true
      setTimeout(() => {
        if (this.climbingMoving) {
          this.climbDown()
        }
      }, this.framerate)
    }
  }
  changeAnimation() {
    let animation = null
    if(!this.moving) {
      animation = 'stand'
    } else if (this.walkSpeed == this.maxSpeed) {
      animation = 'walk'
    } else {
      animation = 'run'
    }
    if (!this.grounded) {
      if(this.velocity.y > 0) {
        animation = 'fall'
      } else {
        animation = 'jump'
      }
    }
    if (this.climbing) {
      animation = 'climb'
      if (this.climbingMoving) {
        animation = "climb-up"
      }
    }
    if (this.hanging) {
      animation = 'hang'
      if(this.moving) {
        animation = 'swing'
      }
    }
    if (this.facing == 'left') {
      animation += '-left'
    } else {
      animation += '-right'
    }
    if (this.animation != animation) {
      this.div.classList.remove(this.animation)
      this.animation = animation
      this.div.classList.add(this.animation)
    }
  }
}
