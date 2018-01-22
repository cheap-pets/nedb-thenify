const { resolve } = require('path')
const Store = require('../index')

const db = new Store({
  filename: resolve(__dirname, 'data.db')
})

async function test () {
  try {
    await db.loadDatabaseSync()
    const doc = await db.insertSync({
      name: 'ww',
      createdAt: new Date()
    })
    console.info('[info]', 'insert ok.')
    await db.findOneSync({
      _id: doc._id
    })
    console.info('[info]', 'findOne ok.')
    await db.findSync({
      name: 'ww'
    })
    console.info('[info]', 'find ok.')
    await db.update(
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
    console.info('[info]', 'update ok.')
    await db.removeSync({
      _id: doc._id
    })
    console.info('[info]', 'remove ok.')
  } catch (e) {
    console.error('[error]', e)
  }
}

test()
