
/**
 * Class to create a transaction object
 */
class Transaction {
    /**
     * Constructor of our to and from address as well as the amount
     * @param {string} fromAddress 
     * @param {string} toAddress 
     * @param {number} amount 
     */
    constructor(fromAddress, toAddress, amount) {
        /**
         * @property {string} fromAddress
         */
        this.fromAddress = fromAddress;
        /**
         * @property {string} toAddress
         */
        this.toAddress = toAddress;
        /**
         * @property {number} amount
         */
        this.amount = amount;
    }
}
//export class to be used elsewhere
module.exports = Transaction;