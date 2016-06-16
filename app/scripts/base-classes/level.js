class Level {
  constructor() {
    this.currentScene = 0
    this.start()
  }
  start(scene) {
    if (scene) {
      this.currentScene = scene
    }
    //should store sceneAttempt in localStorage, so refreshes will not mess this data up
    this.sceneAttempt = 1
    this.scenes[this.currentScene].build()
    this.preloadCharacterSprites()
    setTimeout(function () {
      report.send('Level Started', {restart: false})
      report.send('Scene Started', {restart: false})
    }, 1000);
  }
  nextScene() {
    report.send('Scene Completed', {attempts: this.sceneAttempt})
    this.scenes[this.currentScene].tearDown()
    this.currentScene =+ 1
    this.sceneAttempt = 1
    report.send('Scene Started', {restart: false})
    this.scenes[this.currentScene].build()
  }
  previousScene() {
    this.scenes[this.currentScene].tearDown()
    this.currentScene =- 1
  }
  restartScene() {
    this.sceneAttempt =+ 1
    report.send('Scene Started', {restart: true, attempt: this.sceneAttempt})
    this.scenes[this.currentScene].tearDown()
    this.scenes[this.currentScene].build()
  }
  preloadCharacterSprites() {
    let path = '/ninja/assets/'
    let sprites = [
      path + 'ninja/climb-left.png',
      path + 'ninja/climb-right.png',
      path + 'ninja/climb-up-left.png',
      path + 'ninja/climb-up-right.png',
      path + 'ninja/fall-left.png',
      path + 'ninja/fall-right.png',
      path + 'ninja/hang-left.png',
      path + 'ninja/hang-right.png',
      path + 'ninja/hide.png',
      path + 'ninja/jump-left.png',
      path + 'ninja/jump-right.png',
      path + 'ninja/reveal.png',
      path + 'ninja/run-left.png',
      path + 'ninja/run-right.png',
      path + 'ninja/stand-left.png',
      path + 'ninja/stand-right.png',
      path + 'ninja/swing-left.png',
      path + 'ninja/swing-right.png',
      path + 'ninja/walk-left.png',
      path + 'ninja/walk-right.png',
      path + 'guard/run-left.png',
      path + 'guard/run-right.png',
      path + 'guard/sleeping.png',
      path + 'guard/stand-left.png',
      path + 'guard/stand-right.png',
      path + 'guard/walk-left.png',
      path + 'guard/walk-right.png',
    ]
    sprites.forEach((s) => {
      var my_image = new Image();
      my_image.src = s;
    })
  }
}
