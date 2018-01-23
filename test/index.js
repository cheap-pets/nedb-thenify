const { resolve } = require('path')
const Store = require('../index')

const db = new Store({
  filename: resolve(__dirname, 'data.db')
})

async function test () {
  try {
    await db.loadDatabaseAsync()
    const doc = await db.insertAsync({
      name: 'ww',
      createdAt: new Date()
    })
    console.info('[ok]', 'insert ok.')
    await db.findOneAsync({
      _id: doc._id
    })
    console.info('[ok]', 'findOne ok.')
    db.findOne(
      {
        _id: doc._id
      },
      (err, doc) => {
        if (err) {
          console.info('[error]', err)
        } else {
          console.info('[ok]', 'findOne callback ok.', doc._id)
        }
      }
    )
    await db.findAsync({
      name: 'ww'
    })
    console.info('[ok]', 'find ok.')
    await db.find({}).sort({ name: 1 }).execAsync()
    console.info('[ok]', 'find and execAsync ok.')
    await db.updateAsync(
      {
        name: 'ww'
      },
      {
        name: 'www',
        updatedAt: new Date()
      },
      {
        multi: true
      }
    )
    console.info('[ok]', 'update ok.')
    await db.removeAsync({
      _id: doc._id
    })
    console.info('[ok]', 'remove ok.')
  } catch (e) {
    console.error('[error]', e)
  }
}

test()
