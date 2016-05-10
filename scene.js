class Scene{
  constructor() {
    this.ledges = []
    this.baddies = []
    this.sceneBackgrounds = []
  }
  tearDown() {
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
    solids = [hero]
    hero.moveToStart()
    for (var i = 0; i < this.baddies.length; i++) {
      this.baddies[i].ceaseToExistPlease()
    }
    this.baddies = []
  }
}
