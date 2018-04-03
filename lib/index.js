const App = require('../lib/app.js');
const app = new App('team.json', 'rotation.json')
const command = process.argv[2]

switch (command) {
  case 'show':
    const names = process.argv.slice(3)
    app.show(names)
    break;
  case 'new-pair':
    const name1 = process.argv[3]
    const name2 = process.argv[4]
    app.newPair(name1, name2)
    break;
}
