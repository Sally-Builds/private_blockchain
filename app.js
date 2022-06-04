const Block = require('./Block')
const Blockchain = require('./Blockchain')
const DB = require('./initDB')
const SHA256 = require('crypto-js/sha256')

class App {
    constructor() {
        this.Blockchain = new Blockchain()
    }

    async create(nBlock) {
        try {
            for(let i = 0; i<nBlock; i++) {
                const randomData = `${Math.random() + i}`
                // const block = new Block(randomData)
                const res = await this.Blockchain.addBlock(new Block(randomData))
                console.log(res)
                }
            //    this.Blockchain.getBlockHeight().then(res => console.log(res)).catch(err => console.log(err))
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

    // async createRead() {
    // let i = 0;
    // return new Promise((resolve, reject) => {
    //         db.createReadStream().on('data', function(data) {
    //             i++;
    //           }).on('error', function(err) {
    //               return console.log('Unable to read data stream!', err)
    //               reject(err)
    //           }).on('close', function() {
    //             console.log('Block #' + i);
    //             addLevelDBData(i, value);
    //             resolve(i)
    //           });
    //     })
    // }

}

const app = new App()
// app.create(4)
// app.numOfBlocks().then(res => console.log(res)).catch(err => console.log(err))
// app.getBlock(0).then(res => console.log(res.toString())).catch(err => console.log(err))
app.validateBlock(2).then(res => console.log(res.toString())).catch(err => console.log(err))

