class Scene{
  constructor() {
    this.ledges = []
    this.baddies = []
    this.sceneBackgrounds = []
    this.actionItems = []
    this.timeouts = []
  }
  tearDown() {
    this.tearingDown = true
    for (var i = 0; i < this.ledges.length; i++) {
      document.getElementById(this.ledges[i].name).remove()
      this.ledges[i] = null
    }
    this.ledges = []
    for (var i = 0; i < this.sceneBackgrounds.length; i++) {
      document.getElementById(this.sceneBackgrounds[i].name).remove()
      this.sceneBackgrounds[i] = null
    }
    this.sceneBackgrounds = []
    for (var i = 0; i < this.actionItems.length; i++) {
      document.getElementById(this.actionItems[i].name).remove()
      this.actionItems[i] = null
    }
    this.actionItems = []
    solids = [hero]
    blinds = []
    actionItems = []
    hero.moveToStart()
    for (var i = 0; i < this.baddies.length; i++) {
      this.baddies[i].ceaseToExistPlease()
    }
    this.baddies = []

    for (var i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i])
    }
    this.timeouts = []
  }
  build() {
    setTimeout( () => {
      this.tearingDown = false
    }, 1000);
  }
}
