const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const random = require('random')

const { SymbologyType, createFile } = require('symbology')

if (argv.quota === undefined)
  return;

let digit = 7;  
let codes = [];
while (codes.length < argv.quota) {
  let code = random.int(0, Math.pow(10, digit) - 1).toString().padStart(digit, '0');
  if (codes.indexOf(code) == -1) {
    codes.push(code);
  }
}
console.log(codes)

codes.forEach((code) => {
  createFile({
    symbology: SymbologyType.UPCA,
    fileName: `${__dirname}/keys/0000${code}.png`,
    backgroundColor: 'FFFFFF',
    foregroundColor: '000000',
    scale: 1
  }, `${code}`).then(_ => {})
})
