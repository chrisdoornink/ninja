class Background {
  constructor(id, image, options) {
    this.name = id
    this.position = options.position || {x:0, y:0}
    this.stop = true
    this.speed = options.speed || 1
    this.framerate = options.framerate || 30
    this.div = document.createElement("DIV")
    this.div.id = id
    if (options.foreground) {
      document.getElementById("foreground").appendChild(this.div);
    } else {
      document.getElementById("background").appendChild(this.div);
    }
    this.div.style.backgroundImage = 'url("assets/background/'+image+'.png")'
    this.width = options.width || 1200
    this.height = options.height || 600
    this.div.style.width = this.width + 'px'
    this.div.style.height = this.height + 'px'
    // if (options.width && options.height) {
    //   this.div.style.backgroundSize = this.width + 'px ' + this.height + 'px'
    // }
    this.div.style.backgroundSize = 'cover'
    if (options.opacity) {
      this.div.style.opacity = options.opacity
    }
    if (options.size) {
      this.div.style.backgroundSize = options.size
    }
    if (!options.movement) {
      this.div.style.transform = 'translate3d('+(this.position.x)+'px,'+this.position.y+'px,0)'
    }
    if (options.movement == 'sidescroll') {
      this.stop = false
      this.sidescroll()
    }
    if (options.animationClass) {
      this.div.classList = options.animationClass
    }
    if (options.movement == 'roll') {
      this.initialPositionx = this.position.x
      this.initialPositiony = this.position.y
      this.rotation = options.start || 0
      this.radius = options.radius || 30
      this.position.x = this.position.x - (this.radius / 2)
      this.position.y = this.position.y - (this.radius / 2)
      this.stop = false
      this.roll()
    }
  }
  sidescroll() {
    if (!this.stop) {
      setTimeout(() => {
        this.position.x = this.position.x + this.speed
        if (this.speed < 0 && this.position.x <= -this.width) { this.position.x = world.width + this.width}
        if (this.speed > 0 && this.position.x >= world.width + this.width) { this.position.x = -this.width}
        this.div.style.transform = 'translate3d('+(this.position.x)+'px,'+this.position.y+'px,0)'
        this.sidescroll()
      }, this.framerate)
    }
  }
  roll() {
    if (!this.stop) {
      setTimeout(() => {
        let d = this.radius / 2
        this.rotation = this.rotation + (this.speed)
        this.position.x = this.initialPositionx + (Math.sin(this.rotation) * d)
        this.position.y = this.initialPositiony + (Math.cos(this.rotation) * (d / 2))
        if (this.rotation >= 3.141592653589793) { this.rotation = -3.141592653589793}
        this.div.style.transform = 'translate3d('+(this.position.x)+'px,'+this.position.y+'px,0)'
        this.roll()
      }, this.framerate)
    }
  }
  slideLeft() {
    this.position.x = this.position.x - 1200
    this.div.style.transition = 'transform 2s ease-in-out'
    this.div.style.transform = 'translate3d('+(this.position.x)+'px,'+this.position.y+'px,0)'
  }
}
