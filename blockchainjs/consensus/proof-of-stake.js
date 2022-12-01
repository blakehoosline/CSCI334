const SHA256 = require('crypto-js/sha256');


/**
 * Simple implementation of a proof of work consensus. 
 * In PoS, a person can stake claim to become a validator.
 * 
 * Example of PoS in real world: Ethereum 2.0
 */
class ProofOfStake {
    constructor(block) {
        this.block = block;
        this.validators = [];
    }
    /**
     * Only for demonstration purposes. 
     * Usually a node has no balance in the begining.
     * 
     * @param {Array} nodes 
     * @returns {Array} Array of nodes
     */
    static setBalanceForNodes(nodes) { 
        nodes.forEach(function(node){
            node[1] = 1000;
        });
        return nodes;
    }

    /**
     * In PoS, anybody can become a validator by paying a fee
     * Method to create validators in the blockchain
     * 
     * @returns {Array} node with reduced balance
     */
    createValidator(node, stake) {
        this.validators.push([node[0], stake]);
        return [node[0], node[1] - stake];
    }

    /**
     * Method to create hash
     * @returns {string}
     */
    calculateHash() {
        return SHA256(this.block.previousHash + this.block.timestamp + JSON.stringify(this.block.transactions) + this.block.validator).toString();
    }

    /**
     * Validates the max stake of validators
     * @returns {number} returns maximum stake
     */
    getValidatorWithMaxStake() {
        let maxStake = ["",0];
        this.validators.forEach(function(element){
            if(element[1] > maxStake[1]) {
                maxStake = element;
            }
        });
        return maxStake;
    }
    
    /**
     * Method that generates block
     * @returns {number}
     */
    generateBlock() {
        this.block.hash = this.calculateHash();
        console.log("Block created by:"+this.block.validator);
        return this.block;
    }
}

module.exports = ProofOfStake;