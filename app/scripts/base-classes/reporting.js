class Reporting {
  send(event, properties = {}) {
    console.log('log event: ', event, properties);
    console.log(level.level, (level.currentScene + 1));
    properties.level = level.level
    properties.scene = level.level + '-' + (level.currentScene + 1)
    amplitude.logEvent(event, properties);
  }
}
