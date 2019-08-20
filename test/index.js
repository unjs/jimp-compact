const path = require('path')
const assert = require('assert')
const Jimp = require('..')

async function main() {
  const img = await Jimp.read(path.resolve(__dirname, 'img.png'))
  img.contain(45, 45).write(path.resolve(__dirname, 'img.out.png'))
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})

