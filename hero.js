class Hero extends MovableObject {
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
}
