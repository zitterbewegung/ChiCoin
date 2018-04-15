import config from "./config";
import bip39 from "bip39";
const bitcoinjs = require("bitcoinjs-lib");

const unit = "CHI";
const DERIVATION_PATH = "m/44'/0'/0'/0";

let network = {};
switch (config.getNetwork()) {
  case "main":
    network = "mainnetObj";
    break;
  default:
    network = bitcoinjs.testnet;
}
/**
 * KeyPair: accepts private key
 */
export default class Wallet {
  constructor(extendedKey, keyPair) {
    this.extendedKey = extendedKey;
    this.keyPair = !keyPair ? extendedKey.keyPair : keyPair;
    this.info = {
      address: this.getAddress(),
      balance: "loading",
      unconfirmedBalance: "loading",
      erc20: []
    };
    this.transactionList = [];
  }
  getPrivKey() {
    return this.keyPair.toWIF();
  }
  getAddress() {
    return this.keyPair.getAddress();
  }
  calculateBip32KeyRoot() {
    const pathBits = DERIVATION_PATH.split("/");
    let extendedKey = this.extendedKey;
    pathBits.forEach(bit => {
      const index = parseInt(bit);
      if (isNaN(index)) {
        return;
      }
      const hardened = bit[bit.length - 1] == "'";
      const isPriv = !extendedKey.isNeutered();
      const invalidDerivationPath = hardened && !isPriv;
      if (invalidDerivationPath) {
        extendedKey = null;
      } else if (hardened) {
        extendedKey = extendedKey.deriveHardened(index);
      } else {
        extendedKey = extendedKey.derive(index);
      }
    });
    console.log(extendedKey.getAddress());
    console.log(extendedKey.neutered().toBase58());

    return extendedKey;
  }

  static restoreFromMnemonic(mnemonic, password) {
    let seedHex = bip39.mnemonicToSeedHex(mnemonic, password);
    let account = bitcoinjs.HDNode.fromSeedHex(seedHex, network);
    return new Wallet(account);
  }

  static restoreFromWif(wif) {
    let keyPair = bitcoinjs.ECPair.fromWIF(wif, network);
    return new Wallet(null, keyPair);
  }
}
// const mnemonic = "lonely mango bachelor jewel turn allow box reject silk rent desert cage service avocado olympic";
// const password = 'sincityofmyadventure';
// const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
// webWallet.calculateBip32KeyRoot();
// console.log(webWallet.getAddress())