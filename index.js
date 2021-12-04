const sendKeys = require('sendkeys-macos');
const fs = require('fs');
const { exec } = require("child_process");
const moment = require('moment');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if (argv.app === undefined) {
  console.log(`--app : requries to open target application`);
  return;
}

if (argv.duration === undefined) {
  console.log(`--duration : requires to wait before restart an action`);
  return;
}

const pattern = /\d{12}/;
const readline = require('readline');

var trigger = argv.trigger || 'space';
var input = '';
var t;
var app = argv.app;
let du = {
  value: argv.duration.match(/\d./)[0],
  unit: argv.duration.match(/[a-zA-Z]/)[0]
}
var duration = moment.duration(parseInt(du.value), du.unit);

function run_process(app, trigger, argv, duration) {
  sendKeys(app, `<c:f:command><c:${trigger}>`, { delay: 3, initialDelay: 3 });
  console.log(`Processing - Please wait`);

  setTimeout(() => {
    sendKeys(app, `<c:f:command>`, { delay: 0.1, initialDelay: 1 });
    sendKeys('Terminal', `cd ${__dirname} <c:return>node index\.js --app '${app}' --duration ${argv.duration} --trigger ${trigger} <c:return>`, { delay: 0.1, initialDelay: 1 });
    process.exit();
  }, duration);
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

      run_process(app, trigger, argv, duration);
    }
  }
});
