/**
 * Class to create participants object by address
 */
class Participants {
    /**
     * Creating our nodes addresses for testing
     * @returns {Array} Returns node address
     */
    static nodes() {
        return [
            ["node-address-1", 0],
            ["node-address-2", 0],
            ["node-address-3", 0]
        ];
    };
    /**
     * Creating our accounts addresses for testing
     * @returns {Array} Returns account
     */
    static accounts() {
        return [
            ["account-address-1", 0],
            ["account-address-2", 0]
        ];
    };
}
//export class to be used elsewhere
module.exports = Participants;