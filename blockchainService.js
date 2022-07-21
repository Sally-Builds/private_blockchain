const Block = require('./Block')
const Blockchain = require('./Blockchain')
const DB = require('./initDB')
const SHA256 = require('crypto-js/sha256')

class BlockchainService {
    constructor() {
        this.Blockchain = new Blockchain()
    }

    async create(nBlock) {
        try {
            const res = await this.Blockchain.addBlock(new Block(nBlock))
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async numOfBlocks() {
        const num = await this.Blockchain.getBlockHeight()
        return num
    }

    async getBlock(height) {
        const block = this.Blockchain.getBlock(height)
        return block
    }

    async validateBlockchain() {
        return await this.Blockchain.validateChain()
    }

    async validateBlock(height) {
        return await this.Blockchain.validateBlock(height)
    }
}

// const app = new App()
// app.create(4)
// app.numOfBlocks().then(res => console.log(res)).catch(err => console.log(err))
// app.getBlock(0).then(res => console.log(res.toString())).catch(err => console.log(err))
// app.validateBlock(2).then(res => console.log(res.toString())).catch(err => console.log(err))


module.exports = BlockchainService