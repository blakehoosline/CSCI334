const Block = require('./Block.js');
const Transaction = require('./Transaction.js');

const ProofOfWork = require('../consensus/proof-of-work.js');
const ProofOfStake = require('../consensus/proof-of-stake.js');

/**
 * Class to create a blockchain object
 */
class Blockchain {
    /**
     * 
     * @param {Object} consensus 
     */
    constructor (consensus) {
        /**
         * @property {string} consensus
         */
        this.consensus = consensus;
        /**
         * @property {Array} chain
         */
        this.chain = [this.createGenesisBlock()];
        /**
         * @property {Array} pendingTransactions
         */
        this.pendingTransactions = [];
        /**
         * @property {Array} participants
         */
        this.participants = [];
        /**
         * @property {number} miningReward
         */
        this.miningReward = 100;
    }

    /**
     * Method to create genesis block
     * @returns {String}
     */
    createGenesisBlock() {
        return new Block("01/01/2022","GenesisBlock","0");
    }

    /**
     * Method to get the latest block
     * @returns {Array}
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * 
     * @param {string} minerAddress 
     * @param {number} difficulty 
     */
    generateBlock(minerAddress, difficulty = 2) { 
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        
        if (['pow','pos'].includes(this.consensus)){
            
            if (this.consensus == 'pow') {
                let algorithm = new ProofOfWork(block);
                block = algorithm.generateBlock(difficulty);
            } else if (this.consensus == 'pos') {
                let algorithm = new ProofOfStake(block);
                block.validator = minerAddress;
                block = algorithm.generateBlock();
            }

            block.block = this.chain.length;
            this.chain.push(block);
            this.pendingTransactions = [
                new Transaction(null, minerAddress, this.miningReward)
            ]
        }
    }

    /**
     * 
     * @param {Array} transaction 
     */
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    /**
     * 
     * @param {Array} account Account name
     */
    registerParticipant(account) {
        this.participants.push(account);
    }

    /**
     * 
     * @param {string} address 
     * @returns {number} Returns balance
     */
    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    /**
     * Method that checks the blocks validity
     * @returns {void}
     */
    validationCheck() {
        let consensusAlgorithm = null; // set intial value to null
        let validChain = true; // chain is set to be valid
        // for loop that loops through each block to validate 
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            const copiedBlock = Object.assign({}, currentBlock);
            // switch statement to determine which consensus is being run
            switch (this.consensus) {
                default: case 'pow':
                    consensusAlgorithm = new ProofOfWork(copiedBlock);
                    break;
                case 'pos':
                    consensusAlgorithm = new ProofOfStake(copiedBlock);
                    break;
            } 
            // chain will return error and set validity of the chain to false
            // if either of these statements occurs
            if(currentBlock.hash !== consensusAlgorithm.calculateHash()) {
                console.log("Block "+ currentBlock.block + " is invalid!");
                validChain = false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log("Block "+ currentBlock.block + " is invalid!");
                validChain = false;
            }
        }
        // if chain is valid console logs that it is indeed valid
        if(validChain){
            console.log("Blockchain is valid.");
        }
    }

}
//export class to be used elsewhere
module.exports = Blockchain;