class Pair {
  constructor(name, times) {
    this.name = name
    this.times = times
  }

  static toPair(info) {
    return new Pair(info[0], info[1] || 0)
  }
}

module.exports = Pair
