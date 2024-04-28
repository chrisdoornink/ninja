class Launderer extends Baddie {
  init(id, x, y, options = {}) {
    super.init(id, x, y, options)
    this.startingMove = 'laundry'
    this.bucket = options.bucket
    this.initialBucketPosition = this.bucket.position
    this.washedItem = options.washedItem
  }
  patrol() {
    if (this.laundering || this.attackMode || this.refilling) {return}
    this.laundering = true
    this.refilling = false
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

  }
  putBucketBack() {
    this.leftStart()
    //might need something here and somewhere else to have the bucket attached to the guy
  }
  refillWater() {
    this.laundering = false
    this.refilling = true
    //give confused look / dissapointment animation then...
    this.rightStart()
  }
  collisionDetection() {
    super.collisionDetection()
    if (this.laundering && this.washedItem.position.x <= (this.position.x + this.width)) {
      this.rightStop()
    }
    if (this.laundering && (this.bucket.position.x + this.bucket.width) >= this.position.x) {
      this.leftStop()
      this.position.x = this.bucket.position.x + this.bucket.width + 5
      if (this.bucket.knockedOver) {
        this.refillWater()
      } else {
        setTimeout(() => {
          this.washItem()
        }, 5000)
      }
    }
    if (this.refilling && this.position.x >= 1111) {
      this.position.x = 1110
      this.rightStop()
      this.loweringAndRaising = true
      setTimeout(() => {
        this.loweringAndRaising = false;
        this.putBucketBack()
      }, 12000);
      //do the well lowering stuff here.
    }
    if (this.refilling && this.position.x <= this.initialBucketPosition.x) {
      this.leftStop()
      this.refilling = false
      this.laundering = true
      this.bucket.knockedOver = false
    }
  }
  see(obj) {
    let d = obj.position.x - this.position.x
    if (d < 500 && d > -500) {
      super.see(obj)
    }
  }
  attack(obj) {
    this.laundering = false
    this.refilling = false
    super.attack(obj)
  }
}
