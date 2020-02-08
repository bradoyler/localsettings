const fs = require('fs')
const path = require('path')

function log (message) {
  console.log(`[localsettings][DEBUG] ${message}`)
}

// Parses src json file
function parse (fileString, options) {
  const debug = Boolean(options && options.debug)
  const src = JSON.parse(fileString)
  let obj = {}

  if (src.IsEncrypted) {
    log('localsettings does not yet support encrypted Values')
  }

  if (src && src.Values && Object.keys(src.Values).length) {
    obj = src.Values
  } else if (debug) {
    log('Values Object does not have any keys')
  }
  return obj
}

// Populates process.env from file
function config (options) {
  let settingsPath = path.resolve(process.cwd(), 'local.settings.json')
  let encoding = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      settingsPath = options.path
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(settingsPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse
