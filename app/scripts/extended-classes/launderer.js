class Launderer extends Baddie {
  init(id, x, y, options = {}) {
    super.init(id, x, y, options)
    this.startingMove = 'laundry'
    this.bucket = options.bucket
    this.washedItem = options.washedItem
  }
  patrol() {
    if (this.laundering || this.attackMode) {return}
    this.laundering = true
    this.washItem()
    this.lookAround()
  }
  washItem() {
    if (this.washedItem.position.x > (this.position.x + this.width)) {
      this.rightStart()
    }
    setTimeout(() => {
      this.wetSponge()
    }, 10000)
  }
  wetSponge() {
    //run an animation to make it obvious he's about to turn around here then do this next line
    if ((this.bucket.position.x + this.bucket.width) < this.position.x) {
      this.leftStart()
    }
    setTimeout(() => {
      this.washItem()
    }, 5000)
  }
  refillWater() {}
  collisionDetection() {
    super.collisionDetection()
    if (this.laundering && this.washedItem.position.x <= (this.position.x + this.width)) {
      this.rightStop()
    }
    if (this.laundering && (this.bucket.position.x + this.bucket.width) >= this.position.x) {
      this.leftStop()
    }
  }
  see(obj) {
    let d = obj.position.x - this.position.x
    if (d < 500 && d > -500) {
      super.see(obj)
    }
  }
  attack(obj) {
    console.log('launderng is false');
    this.laundering = false
    super.attack(obj)
  }
}
