class Pair {
  constructor(name, times) {
    this.name = name
    this.times = times

    const members = name.split(' - ')
    this.name1 = members[0]
    this.name2 = members[1]
  }

  static toPair(info) {
    return new Pair(info[0], info[1] || 0)
  }
}

Pair.prototype.toString = function() {
  return `Pair { name: "${this.name}", times: ${this.times} }`
}

module.exports = Pair
