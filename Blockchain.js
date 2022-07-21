const SHA256 = require('crypto-js/sha256')
const { json } = require('express/lib/response')
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
        let blockchainCount = await this.DB.getBlocksCount()
        // const genesisBlock = new Block('genesis block')
        const genesisBlock = {
            hash: "",
            height: 0,
            previousBlockHash: "",
            time: "",
            body: "genesis block"
        }
        genesisBlock.height = blockchainCount
        genesisBlock.time = new Date().getTime().toString().slice(0, -3)
        genesisBlock.hash = SHA256(JSON.stringify(genesisBlock)).toString() 
        await this.DB.addLevelDBData(0, JSON.stringify(genesisBlock).toString())
        return await this.getBlockHeight()
    }

    async addBlock(block) {
        try {
        let blockchainCount = await this.DB.getBlocksCount()
        console.log(blockchainCount)
        if(blockchainCount == 0) {
            blockchainCount = await this.createGenesisBlock()
        }
        // if(blockchainCount > 0) {
        blockchainCount = await this.DB.getBlocksCount()
        console.log(blockchainCount, 'new block')
        block.height = blockchainCount
        block.time = new Date().getTime().toString().slice(0, -3)
        const hash = SHA256(JSON.stringify(block)).toString() 
        block.hash = hash
        const previousHash = await this.DB.getLevelDBData(blockchainCount - 1)
        block.previousBlockHash = JSON.parse(previousHash).hash
        return await this.DB.addLevelDBData(blockchainCount, JSON.stringify(block).toString())
        // }
        } catch (error) {
            console.log(error)
            throw new Error(error)
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
        try {
            // return this.chain[height]
        return this.DB.getLevelDBData(height)
        } catch (error) {
            throw new Error(error)
        }
    }

     // Validate if Block is being tampered by Block Height
     async validateBlock(height) {
       const block = JSON.parse(await this.getBlock(height))
       const blockHash = await block.hash
        
       block.hash = ""
       const verfiyHash = SHA256(JSON.stringify(block)).toString()

       console.log(verfiyHash, blockHash)
       if(verfiyHash === blockHash) return true

       return false
    }

    // Validate Blockchain
    async validateChain() {
        // Add your code here
        const blockHeight = await this.getBlockHeight()
        const h = JSON.parse(await this.getBlock(4)).hash
        for(let i = 1; i <blockHeight; i++) {
            const hash = JSON.parse(await this.getBlock(i - 1)).hash
            const previousHash = JSON.parse(await this.getBlock(i)).previousBlockHash
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