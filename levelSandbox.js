/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

let levelup = require('levelup');
let leveldown = require('leveldown')
let chainDB = leveldown('./chaindata');
let db = levelup(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
//   db.put(key, value, function(err) {
//     if (err) return console.log('Block ' + key + ' submission failed', err);
//   })
  return new Promise((resolve, reject) => {
    //   const data = db.put(key, value)
      resolve(db.put(key, value))

      if(!data) reject("something went wrong")
  })
}

// Get data from levelDB with key
function getLevelDBData(key){
  db.get(key, function(err, value) {
    if (err) return console.log('Not found!', err);
    console.log('Value = ' + value);
  })
}

// Add data to levelDB with value
function addDataToLevelDB(value) {
    let i = 0;
    return new Promise((resolve, reject) => {
        db.createReadStream().on('data', function(data) {
            i++;
          }).on('error', function(err) {
              return console.log('Unable to read data stream!', err)
              reject(err)
          }).on('close', function() {
            console.log('Block #' + i);
            addLevelDBData(i, value);
            resolve(i)
          });
    })

}

/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/


(function theLoop (i) {
  setTimeout(function () {
    addDataToLevelDB('Testing data');
    if (--i) theLoop(i);
  }, 100);
})(10);