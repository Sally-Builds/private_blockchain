const {Level} = require('level');
const levelup = require('levelup')
const leveldown = require('leveldown')

const Block = require('./Block')

class LevelSandbox {

    constructor() {
        this.db = new Level('./chainDB');
        // this.db = levelup(leveldown('./mydb'))
    }

    // Get data from levelDB with key (Promise)
    async getLevelDBData(key){
        try {
            const val = await this.db.get(key)
            return val
        } catch (error) {
            throw new Error('block not found')
        }
    }

    // Add data to levelDB with key and value (Promise)
    async addLevelDBData(key, value) {
        try {
            this.db.put(key, value)
            return 'Block added Successfully!!!'
        } catch (error) {
            throw new Error(error)
        }
    }

    // Method that return the height
    async getBlocksCount() {
        try {
            // const val = await this.db.iterator()
            let count = 0
            for await (const [key, value] of this.db.iterator()) {
                count++
              }
            return count
        } catch (error) {
            throw new Error(error)
        }
    }
        

}

// const levelSand = new LevelSandbox()

// levelSand.addLevelDBData(1, 'somevealue3').then((res) => console.log(res)).catch((err) => console.log(err))
// levelSand.getLevelDBData(0).then((res) => console.log(res.toString())).catch((err) => console.log(err))
// levelSand.getBlocksCount().then((res) => console.log(res)).catch((err) => console.log(err))

// for(let i = 0; i<5; i++) {
//     const randomData = Math.random()
//     const block = new Block(randomData)
//     levelSand.addLevelDBData(i, block).then((res => console.log(res))).catch(err => console.log(err))
//     }

module.exports = LevelSandbox