const sha256 = require('crypto-js/sha256')

/* ===== Block Class ===================================
|  Class with a constructor for block data model       |
|  ====================================================*/

class Block {
    constructor(data) {
    this.hash = ""
    this.height = 0,
    this.previousBlockHash = ""
    this.time = ""
    this.body = data
    }
}

// ======================Blockchain======================= //
// ====================================================== //
// ====================================================== //


class Blockchain {
    constructor() {
        this.chain = []
        // create the genesis block on initializing the blockchain
        this.createGenesisBlock()
    }

    createGenesisBlock() {
        this.addBlock(new Block(["genesis block"]))
    }

    async addBlock(newBlock) {
        this.hashBlock(newBlock)
        this.chain.push(newBlock)
    }

    async hashBlock(block) {
        const blockchainCount = this.chain.length
        block.height = blockchainCount
        block.time = new Date().getTime().toString().slice(0, -3)
        block.hash = sha256(JSON.stringify(block)).toString()
        if(blockchainCount > 0) {
            block.previousBlockHash = this.chain[blockchainCount - 1].hash
        }
    }
}


// const first = new Block(["coinbase", "second"])
const second = new Block(["coinbase", "second", "third"])
const third = new Block(["coinbase", "second", "third", "fourth"])
const blockchain = new Blockchain()

// blockchain.addBlock(first)
blockchain.addBlock(second)
blockchain.addBlock(third)
console.log(blockchain.chain)