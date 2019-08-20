class JIMPBUffer {
  constructor(data, ...args) {
    if (args.length) {
      throw new Error('Incompatible args!')
    }

    if (typeof data === 'number') {
      return Buffer.alloc(data)
    }

    return Buffer.from(data)
  }
}

global.JIMPBUffer = JIMPBUffer

module.exports = require('jimp/es').default
