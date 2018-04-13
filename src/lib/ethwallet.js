import bip39 from "bip39";
import config from "./config";
import ethUtil from "ethereumjs-util";

const HDKey = require("hdkey");
const bitcoinjs = require("bitcoinjs-lib");

const unit = "CHI";
let network = {};
switch (config.getNetwork()) {
  case "main":
    network = "mainnetObj";
    break;
  default:
    network = bitcoinjs.networks.bitcoin;
}
/**
 * KeyPair: accepts private key
 */
const Wallet =  class Wallet {
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
  getPublicKey() {
    return this.keyPair.getPublicKeyBuffer().toString('hex');
  }
  getAddress() {
    const privKeyBuffer = this.keyPair.d.toBuffer(32);
    const privkey = privKeyBuffer.toString("hex");
    const addressBuffer = ethUtil.privateToAddress(privKeyBuffer);
    const hexAddress = addressBuffer.toString("hex");
    return hexAddress;
  }
  getPrivateKey() {
    const privKeyBuffer = this.keyPair.d.toBuffer(32);
    const privkey = privKeyBuffer.toString("hex");
    return privkey;
  }
  getEthPublicKey() {
    const ethUtilpubkey = ethUtil.addHexPrefix(this.getPublicKey());
    return ethUtilpubkey;
  }
  getEthAddress() {
    const checksumAddress = ethUtil.toChecksumAddress(this.getAddress());
    const address = ethUtil.addHexPrefix(checksumAddress);
    return address;
  }
  getEthPrivateKey() {
    const privkey = this.getPrivateKey();
    const ethUtilprivkey = ethUtil.addHexPrefix(privkey);
    return ethUtilprivkey;
  }

  static generateMnemonic() {
    return bip39.generateMnemonic();
  }

  static validateBip39Mnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }

  static restoreFromMnemonic(mnemonic, password) {
    const seedHex = bip39.mnemonicToSeedHex(mnemonic, password);
    const account = bitcoinjs.HDNode.fromSeedHex(seedHex, network); // bip32RootKey
    const keyPair = account.keyPair;
    return new Wallet(keyPair);
    
  }
}

export default Wallet;