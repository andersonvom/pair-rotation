const fs = require('fs');
const loadFile = require('./loadFile.js');
const Team = require('./team.js');

class App {
  constructor(teamFilepath, rotationFilepath) {
    const teamFile = loadFile(teamFilepath, {members: []})
    this.rotationFilepath = rotationFilepath
    this.rotation = loadFile(rotationFilepath, {})
    this.team = new Team('schotterplatz', teamFile.members, this.rotation)
  }

  show(names) {
    console.log(this.team.rotate(names))
  }

  newPair(name1, name2) {
    const newTeam = this.team.newPair(name1, name2)
    console.log(newTeam.rotate([name1, name2]))

    const newData = Object.assign({}, this.rotation, newTeam.rotation)
    const jsonString = JSON.stringify(newData)
    fs.writeFile(this.rotationFilepath, jsonString, err => {
      if (err !== null) {
        console.log(err)
      } else {
        console.log("Pairs updated!")
      }
    })
  }
}

module.exports = App
