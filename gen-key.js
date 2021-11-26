const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs')
const random = require('random')
const { SymbologyType, createFile } = require('symbology')
const crypto = require("crypto");

const argv = yargs(hideBin(process.argv)).argv

async function main() {
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

  let rows = await createBarcodes(codes)

  const secret = "gramprint";
  const sha256Hasher = crypto.createHmac("sha256", secret);
  const fileName = sha256Hasher.update(codes.join('')).digest("hex");

  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title></title>
</head>
<body style="margin: 0px;">
  <table style="width: 826px; border-spacing: 0px;">
    ${rows.join('\n')}
  </table>
</body>
</html>`
  fs.writeFileSync(`${__dirname}/keys/${fileName}.html`, html)
}

async function createBarcodes(codes) {
  let left = 3 - (codes.length % 3)
  for (let c = 0; c < left; c++) {
    codes.push('')
  }
  let rows = []
  let elems = []
  for (let i = 0; i < codes.length; i++) {
    let code = codes[i]
    let src = ''
    if (code !== '') {
      let file = `0000${code}.png`
      src = `src="${file}"`
      await createFile({
        symbology: SymbologyType.UPCA,
        fileName: `${__dirname}/keys/${file}`,
        backgroundColor: 'FFFFFF',
        foregroundColor: '000000',
        scale: 1
      }, `${code}`)
    }
    elems.push(`<td style="width: 33.3%; text-align: center; border: 1px solid #000;">
  <img style="margin: 10px auto;" ${src} />
</td>`)
    if ((i + 1) % 3 === 0) {
      rows.push(`<tr>\n${elems.join('\n')}\n</tr>`)
      elems = []
    }
  }
  return rows
}

main()