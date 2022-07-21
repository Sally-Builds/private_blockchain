const blockchainService = require('./blockchainService')


class BlockchainController {
    constructor() {
        this.BlockchainService = new blockchainService()
    }

    createBlock = async(req, res, next) => {
        try {
            if(!req.body) throw new Error('Request cannot be empty')
            const status = await this.BlockchainService.create(req.body)
            res.status(201).json({
                message: status
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                error: error.stack,
            })

        }
    }

     getBlock = async (req, res, next) => {
       try {
           const {id} = req.params
        if(!req.params) throw new Error('')
        const block = await this.BlockchainService.getBlock(id)
        res.status(200).json({
            block: JSON.parse(block)
        })
       } catch (error) {
           console.log(error)
        res.status(400).json({
            error: error.stack,
        })
       }
    }


    blockchainSize = async (req, res, next) => {
        try {
            const number = await this.BlockchainService.numOfBlocks()
            res.status(200).json({
                number
            })
        } catch (error) {
            res.status(400).json({
                error: error.stack,
            })
        }
    }

    validateBlockchain = async (req, res, next)  => {
        try {
            const status = await this.BlockchainService.validateBlockchain()
            console.log(status)
            const message = status ? 'Blockchain is valid' : 'Blockchain is not valid'
            res.status(200).json({
                message,
            })
        } catch (error) {
            res.status(400).json({
                error: error.stack,
            })
        }
    }

    validateBlock = async(req, res, next) => {
        try {
            const id = req.params.id * 1
            
            if(!Number.isSafeInteger(id)) throw Error('parameter must be a number')
            const status = await this.BlockchainService.validateBlock(id)
            const message = status ? 'Block is valid' : 'Block is not valid'

            res.status(200).json({
                message,
            })
        } catch (error) {
            res.status(400).json({
                error: error.stack,
            })
        }
    }
}


module.exports = BlockchainController