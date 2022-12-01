// a required node module
const SHA256 = require('crypto-js/sha256');

/**
 * Class to create a block object
 */
class Block {
    /**
     * 
     * @param {string} timestamp 
     * @param {Array} transactions 
     * @param {string} previousHash 
     */
    constructor(timestamp, transactions, previousHash = '') {
        /**
         * @property {number} block
         */
        this.block = 0;
        /**
         * @property {string} previousHash
         */
        this.previousHash = previousHash;
        /**
         * @property {string} timestamp
         */
        this.timestamp = timestamp;
        /**
         * @property {Array} transactions
         */
        this.transactions = transactions;
        /**
         * @property {string} hash
         */
        this.hash = this.calculateHash();
        /**
         * @property {number} nonce
         */
        this.nonce = 0;
    }
    /**
     * Method to calculate hash for genesis(first) block
     * @returns {String}
     */
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }
    
}
//export class to be used elsewhere
module.exports = Block;