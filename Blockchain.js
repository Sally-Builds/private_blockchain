const SHA256 = require('crypto-js/sha256')
const Block = require('./Block')
const LevelDB = require('./initDB')


// ======================Blockchain======================= //
// ====================================================== //
// ====================================================== //


class Blockchain {
    constructor() {
        this.chain = []
        this.DB = new LevelDB()
        // this.createGenesisBlock()
    }

    async createGenesisBlock() {
        const self = this
        await this.addBlock(new Block(["genesis block"]))
    }

    async addBlock(block) {
        try {
        let blockchainCount = await this.DB.getBlocksCount()
        console.log(blockchainCount)
        if(blockchainCount == 0) {
            console.log('eneterd here')
            const genesisBlock = new Block('genesis block')
            genesisBlock.height = blockchainCount
            genesisBlock.time = new Date().getTime().toString().slice(0, -3)
            genesisBlock.hash = SHA256(genesisBlock).toString() 
            const genesis = await this.DB.addLevelDBData(0, JSON.stringify(genesisBlock).toString())
            console.log(genesis)
        }
        if(blockchainCount > 0) {
        blockchainCount = await this.DB.getBlocksCount()
        console.log(blockchainCount, 'new block')
        block.height = blockchainCount
        block.time = new Date().getTime().toString().slice(0, -3)
        const hash = SHA256(block).toString() 
        block.hash = hash
        const previousHash = await this.DB.getLevelDBData(blockchainCount - 1)
        block.previousBlockHash = JSON.parse(previousHash).hash
        return await this.DB.addLevelDBData(blockchainCount, JSON.stringify(block).toString())
        }
        } catch (error) {
            console.log(error)
        }
    }

    async getBlockHeight() {
    //    return await this.DB.getBlocksCount
       return new Promise((resolve, reject) => {
           this.DB.getBlocksCount().then(res => {
               resolve(res)
           }).catch(err => reject(err))
       })
    }

     // Get Block By Height
     async getBlock(height) {
        // return this.chain[height]
        return this.DB.getLevelDBData(height)
    }

     // Validate if Block is being tampered by Block Height
     async validateBlock(height) {
       const block = JSON.parse(await this.getBlock(height))
       const blockHash = await block.hash
        
       block.hash = ""
       const verfiyHash = SHA256(block).toString()

       console.log(verfiyHash, blockHash)
       if(verfiyHash === blockHash) return true

       return false
    }

    // Validate Blockchain
    validateChain() {
        // Add your code here
        for(let i = 1; i <this.chain.length; i++) {
            const hash = this.chain[i-1].hash
            const previousHash = this.chain[i].previousBlockHash
            console.log(this.chain[i])
            console.log(i)
            if(hash === previousHash && this.validateBlock(i)) {
                return true
            }
        }
        return false
    }

    _modifyBlock(height) {
        this.chain[height].body = 'akdkfdkajdfj'
    }
}

module.exports = Blockchain