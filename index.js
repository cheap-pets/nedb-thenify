const thenify = require('thenify')

const Nedb = require('nedb')
const prototype = Nedb.prototype
;[
  'loadDatabase',
  'insert',
  'update',
  'remove',
  'find',
  'findOne',
  'count',
  'ensureIndex',
  'removeIndex'
].forEach(m => {
  prototype[m + 'Sync'] = thenify(prototype[m])
})

module.exports = Nedb
