import { resolve, dirname } from 'path'
import { copy, outputFile, readJSON, writeJSON } from 'fs-extra'
import ncc from '@vercel/ncc'

async function main() {
  const rootDir = __dirname
  const input = resolve(rootDir, 'src', 'jimp.ts')
  const output = resolve(rootDir, 'dist', 'jimp.cjs')
  const pkg = resolve(rootDir, 'package.json')

  const opts = {
    cache: false,
    minify: true,
    sourceMapRegister: false
  }

  // @ts-ignore
  let { code } = await ncc(input, opts)

  code = code.replace(/new Buffer/g, 'new JIMPBUffer')

  await outputFile(output, code)

  const jimpDir = dirname(require.resolve('jimp/package.json'))
  const { version } = await readJSON(resolve(jimpDir, 'package.json'))

  await writeJSON(pkg, { ...await readJSON(pkg), version }, { spaces: 2 })

  await copy(resolve(jimpDir, 'fonts'), resolve(rootDir, 'fonts'))

  console.log('jimp-compact@' + version)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
