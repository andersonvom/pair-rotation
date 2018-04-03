const fs = require('fs');
const readline = require('readline');

const loadFile = require('./loadFile.js');
const Team = require('./team.js');

class App {
  constructor(teamFilepath, rotationFilepath) {
    const teamFile = loadFile(teamFilepath, {members: []})
    this.rotationFilepath = rotationFilepath
    this.rotation = loadFile(rotationFilepath, {})
    this.team = new Team('schotterplatz', teamFile.members, this.rotation)
  }

  print(pairs) {
    console.log(pairs.map(p => p.toString()))
  }

  getIO() {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  write(team) {
    const newData = Object.assign({}, this.rotation, team.rotation)
    const jsonString = JSON.stringify(newData)
    fs.writeFile(this.rotationFilepath, jsonString, err => {
      if (err !== null) {
        console.log(err)
      } else {
        console.log("Pairs updated!")
      }
    })
  }

  show(names) {
    this.print(this.team.rotate(names))
  }

  showAndAdd(names) {
    const pairs = this.team.rotate(names)
    this.print(pairs)
    this.askToAddPairs(pairs)
  }

  askToAddPairs(pairs) {
    const io = this.getIO()
    console.log()
    io.question('Add these pairs (y/N)? ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        let team = this.team
        pairs.forEach(pair => team = team.newPair(pair.name1, pair.name2))
        this.write(team)
      } else {
        console.log(`Aborted - answer: ${answer || 'N'}`)
      }
      io.close();
    });
  }

  newPair(name1, name2) {
    const newTeam = this.team.newPair(name1, name2)
    console.log(newTeam.rotate([name1, name2]))
    this.write(newTeam)
  }
}

module.exports = App
