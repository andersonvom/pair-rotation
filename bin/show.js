const Team = require('../lib/team.js');
const loadFile = require('../lib/loadFile.js');

const teamFile = loadFile('team.json', {members: []})
const rotation = loadFile('rotation.json', {})
const team = new Team('schotterplatz', teamFile.members, rotation)
console.log(team.rotate())
