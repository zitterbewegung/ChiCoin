import bip39 from 'bip39';
import config from './config';

const unit = 'CHI';
let network = {}
switch (config.getNetwork()) {
    case 'main':
        network = 'mainnetObj';
        break;
    default:
        network = 'testnet'
}

export default class Wallet {
    constructor(keyPair, setInfo) {
        this.info = {
            address: this.getAddress(),
            balance: 'loading',
            unconfirmedBalance: 'loading',
            erc20: []
        };
        this.transactionList = [];
    }

    getAddress() {
        return this.keyPair.getAddress()
    }

    static generateMnemonic() {
        return bip39.generateMnemonic();
    }

    static validateBip39Mnemonic(mnemonic) {
        return bip39.validateMnemonic(mnemonic);
      }

}