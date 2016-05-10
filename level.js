class Level {
  constructor() {
    this.currentScene = 1
    this.start()
  }
  start() {
    this.scenes[this.currentScene].build()
  }
  nextScene() {
    this.scenes[this.currentScene].tearDown()
    this.currentScene =+ 1
    this.scenes[this.currentScene].build()
  }
  previousScene() {
    this.scenes[this.currentScene].tearDown()
    this.currentScene =- 1
  }
  restartScene(killer) {
    console.log('death by '+killer);
    this.scenes[this.currentScene].tearDown()
    this.scenes[this.currentScene].build()
  }
}
