const sendKeys = require('sendkeys-macos');
const fs = require('fs');
const { exec } = require("child_process");

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
    fs.writeFile(`./keys/${input}.key`, '', function (err) {
      if (err) throw err;
    });

    console.log(`You pressed "${input}"`);
    input = '';
    clearTimeout(exec);
    sendKeys('Photo Booth', '<c:return>', { delay: 0.1, initialDelay: 1 });

    setTimeout(() => {
      sendKeys('Terminal', `cd ${__dirname} <c:return>node index\.js <c:return>`, { delay: 0, initialDelay: 0 });
      process.exit();
    }, appDuration);
  }
});
