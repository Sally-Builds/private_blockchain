const express = require('express')
const blockchainController = require('./blockchainController')


class Application {
    app = express()

    constructor(port) {
        this.port = port
        this.BlockchainController = new blockchainController()
        this.initializeMiddleware()
        this.initializeRouter()
    }

    initializeMiddleware() {
        this.app.use(express.json())
    }

    initializeRouter() {
        this.app.post('/api/block', this.BlockchainController.createBlock)
        this.app.get('/api/block/:id', this.BlockchainController.getBlock)
        this.app.get('/api/blockchain/validate', this.BlockchainController.validateBlockchain)
        this.app.get('/api/blockchain', this.BlockchainController.blockchainSize)
        this.app.get('/api/block/validate/:id', this.BlockchainController.validateBlock)
    }


    listen() {
        this.app.listen((this.port), () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}


const app = new Application(3000)
app.listen()
