const Pair = require('./pair')

function flatten(arr) {
  return [].concat.apply([], arr)
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function toObject(pairs) {
  let json = {}
  pairs.forEach(p => json[p.name] = p.times)
  return json
}

function byTimesAndName(p1, p2) {
  const diff = p1.times - p2.times
  if (diff !== 0) return diff
  return p1.name.localeCompare(p2.name)
}

class Team {
  constructor(name, members, rotation) {
    this.name = name
    this.members = members
    this.rotation = rotation
  }

  pairNames() {
    const allPairs = this.members
      .map(m1 => this.members.map(m2 => [m1, m2].sort()))

    const pairMap = {}

    const pairNames = flatten(allPairs)
      .filter(pair => pair[0] != pair[1])
      .map(pair => `${pair[0]} - ${pair[1]}`)

    return Array.from(new Set(pairNames))
  }

  previousRotation(name) {
    return this.rotation[name] || 0
  }

  pairs() {
    return this.pairNames()
      .map(name => Pair.toPair([name, this.previousRotation(name)]))
  }

  rotate(members) {
    var firstMemberRegex = members.map(m => `.*${m}.* - `).join('|')
    var secondMemberRegex = members.map(m => ` - .*${m}.*`).join('|')

    const bothMembers = (pair) => {
      return pair.name.match(new RegExp(firstMemberRegex, 'i'))
        && pair.name.match(new RegExp(secondMemberRegex, 'i'))
    }

    return this.pairs()
      .sort(byTimesAndName)
      .filter(bothMembers)
  }

  newPair(name1, name2) {
    const matches = (name, str1, str2) => {
      const bothStrings = `${str1}.*${str2}|${str2}.*${str1}`
      return name.match(new RegExp(bothStrings, 'i'))
    }

    const newRotation = this.pairs().map(pair => {
      if (matches(pair.name, name1, name2)) {
        pair.times += 1
      }
      return pair
    })

    return new Team(this.name, this.members, toObject(newRotation))
  }

  toJson() {
    return toObject(this.pairs())
  }
}

module.exports = Team
