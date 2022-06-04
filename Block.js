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

module.exports = Block