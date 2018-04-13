import config from "./config";
import bip39 from "bip39";
const bitcoinjs = require("bitcoinjs-lib");

const unit = "CHI";

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
  constructor(keyPair) {
    this.keyPair = keyPair;
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
  getLanguage() {
    return language;
  }

  static restoreFromMnemonic(mnemonic, password) {
    let seedHex = bip39.mnemonicToSeedHex(mnemonic, password);
    let account = bitcoinjs.HDNode.fromSeedHex(seedHex, network);
    let keyPair = account.keyPair;
    return new Wallet(keyPair);
  }

  static restoreFromWif(wif) {
    let keyPair = bitcoinjs.ECPair.fromWIF(wif, network);
    return new Wallet(keyPair);
  }
}
