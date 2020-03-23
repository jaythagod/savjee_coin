const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2019", "Genesis Block", 0);
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1,"21/03/2020",{amount : 34}));
myCoin.addBlock(new Block(2,"22/03/2020",{amount : 3}));
myCoin.addBlock(new Block(3,"23/03/2020",{amount : 13}));

console.log('Is Blackchain Valid? ' + myCoin.isChainValid());

myCoin.chain[1].data = {amount : 3000};
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

console.log('Is Blackchain Valid? ' + myCoin.isChainValid());
//console.log(JSON.stringify(myCoin, null, 4));