const Pair = require('./pair');

function toPair(arr) {
  return arr.map(info => Pair(info[0], info[1]))
}

class Rotation {
  constructor(pairNames, previousRotation) {
    this.names = pairNames
    this.previousRotation = toPair(previousRotation)
  }

  sample() {
    return this.previousRotation.sort((p1, p2) => p1.times - p2.times)
  }
}

module.exports = Rotation
