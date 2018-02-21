const fs = require('fs');
const Team = require('../lib/team.js');
const loadFile = require('../lib/loadFile.js');

const teamFile = loadFile('team.json', {members: []})
const rotation = loadFile('rotation.json', {})
const team = new Team('schotterplatz', teamFile.members, rotation)

const name1 = process.argv[2]
const name2 = process.argv[3]

const newTeam = team.newPair(name1, name2)
console.log(newTeam.rotate())

const newData = Object.assign({}, rotation, newTeam.rotation)
const jsonString = JSON.stringify(newData)
fs.writeFile("rotation.json", jsonString, err => {
  if (err !== null) {
    console.log(err)
  } else {
    console.log("Pairs updated!")
  }
});
