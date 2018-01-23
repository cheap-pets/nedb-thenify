const thenify = require('thenify').withCallback

function isFunction (obj) {
  const str = Object.prototype.toString.call(obj)
  return str === '[object Function]' || str === '[object AsyncFunction]'
}

class Nedb extends require('nedb') {
  find (query, projections, callback) {
    let result
    if (isFunction(projections)) {
      callback = projections
      projections = undefined
    }
    const method = Object.getPrototypeOf(Nedb).prototype.find
    if (callback) {
      result = method.call(this, query, projections, callback)
    } else {
      const cursor = method.call(this, query, projections)
      cursor.execAsync = thenify(cursor.exec.bind(cursor))
      result = cursor
    }
    return result
  }
  findOne (query, projections, callback) {
    let result
    if (isFunction(projections)) {
      callback = projections
      projections = undefined
    }
    const method = Object.getPrototypeOf(Nedb).prototype.findOne
    if (callback) {
      result = method.call(this, query, projections, callback)
    } else {
      const cursor = method.call(this, query, projections)
      cursor.execAsync = thenify(cursor.exec.bind(cursor))
      result = cursor
    }
    return result
  }
  count (query, callback) {
    let result
    const method = Object.getPrototypeOf(Nedb).prototype.count
    if (callback) {
      result = method.call(this, query, callback)
    } else {
      const cursor = method.call(this, query)
      cursor.execAsync = thenify(cursor.exec.bind(cursor))
      result = cursor
    }
    return result
  }
}

const Super = Object.getPrototypeOf(Nedb)
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
  Nedb.prototype[m + 'Async'] = thenify(Super.prototype[m])
})

module.exports = Nedb
