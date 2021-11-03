const sendKeys = require('sendkeys-macos');
const fs = require('fs');
const { exec } = require("child_process");
const moment = require('moment');

const pattern = /\d{12}/;
const readline = require('readline');
const appDuration = 5000;
var input = '';
var t;
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
      fs.mkdir(dir, _ => {
        fs.rename(file, `${dir}/${code}.png`, _ => {
          console.log(`code: "${input}"`);
          input = '';
          clearTimeout(exec);
          sendKeys('Photo Booth', '<c:return>', { delay: 0.1, initialDelay: 1 });

          setTimeout(() => {
            sendKeys('Terminal', `cd ${__dirname} <c:return>node index\.js <c:return>`, { delay: 0, initialDelay: 0 });
            process.exit();
          }, appDuration);
        });
      });
    }
  }
});
