const assert = require('assert')
const result = require('../src/index').config()

if (result.error) {
  throw result.error
}

console.log('parsed:', result.parsed)

assert.deepEqual(process.env.FUNCTIONS_WORKER_RUNTIME, 'dotnet')
