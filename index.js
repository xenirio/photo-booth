const fs = require('fs');
const path = require('path');
const os = require("os");
const sendKeys = require('sendkeys-macos');
const moment = require('moment');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const pattern = /\d{12}/;
const readline = require('readline');

const trigger = argv.trigger || 'space';
const app = argv.app || 'dslrBooth';
const prints = argv.prints || `${os.homedir()}/Pictures/dslrBooth/prints`;

var input = '';
var t;

function run_process() {
  // List print files
  const exts = fs.readdirSync(prints).filter((f) => path.extname(f) === '.jpg')

  sendKeys(app, `<c:f:command><c:${trigger}>`, { delay: 3, initialDelay: 3 });
  console.log(`Processing - Please wait`);

  let isPrint = false
  while(!isPrint) {
    // Check new file at ~/Pictures/dslrBooth before proceed
    const prts = fs.readdirSync(prints).filter((f) => path.extname(f) === '.jpg')
    isPrint = prts.filter((prt) => exts.indexOf(prt) === -1).length > 0
  }

  const waiting = 30 // sec
  setTimeout(() => {
      sendKeys(app, `<c:f:command>`, { delay: 0.1, initialDelay: 1 });
      sendKeys('Terminal', `cd ${__dirname} <c:return>node index\.js --app '${app}' --trigger ${trigger} --prints ${prints} <c:return>`, { initialDelay: 1 });
      process.exit();
  }, waiting * 1000);
}

console.clear();
console.log(`Ready to scan`);
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'space') {
    return;
  }
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  input = `${input}${str}`;

  t = setTimeout(() => {
    input = ''
    clearTimeout(t);
  }, 100);

  if (pattern.test(input)) {
    code = input.substring(0, input.length - 1);
    file = `${__dirname}/keys/${code}.png`;
    if (fs.existsSync(file)) {
      let dir = `${__dirname}/keys/${moment(new Date()).format('YYYY-MM-DD')}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.renameSync(file, `${dir}/${code}.png`);
      console.log(`Code: ${input}`);
      input = '';

      run_process();
    }
  }
});
