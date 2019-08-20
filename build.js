const path = require('path')
const fs = require('fs-extra')
const ncc = require('@zeit/ncc')

async function main() {
  const input = path.resolve(__dirname, 'src', 'jimp.js')
  const output = path.resolve(__dirname, 'dist', 'jimp.js')
  const pkg = path.resolve(__dirname, 'package.json')

  const opts = {
    cache: false,
    minify: true,
    sourceMapRegister: false
  }

  let { code } = await ncc(input, opts)

  code = code.replace(/new Buffer/g, 'new JIMPBUffer')

  await fs.outputFile(output, code)

  const { version } = require('jimp/package.json')

  await fs.writeJSON(pkg, { ...await fs.readJSON(pkg), version }, { spaces: 2 })

  console.log('jimp-compact@' + version)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
