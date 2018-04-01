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
    let privkey = privKeyBuffer.toString("hex");
    let addressBuffer = ethUtil.privateToAddress(privKeyBuffer);
    let hexAddress = addressBuffer.toString("hex");
    return hexAddress;
  }
  getPrivateKey() {
    const privKeyBuffer = this.keyPair.d.toBuffer(32);
    let privkey = privKeyBuffer.toString("hex");
    return privkey;
  }
  getEthPublicKey() {
    let ethUtilpubkey = ethUtil.addHexPrefix(this.getPublicKey());
    return ethUtilpubkey;
  }
  getEthAddress() {
    const privKeyBuffer = this.keyPair.d.toBuffer(32);
    let addressBuffer = ethUtil.privateToAddress(privKeyBuffer);
    let hexAddress = addressBuffer.toString("hex");
    let checksumAddress = ethUtil.toChecksumAddress(hexAddress);
    let address = ethUtil.addHexPrefix(checksumAddress);
    return address;
  }
  getEthPrivateKey() {
    let privkey = this.getPrivateKey();
    let ethUtilprivkey = ethUtil.addHexPrefix(privkey);
    return ethUtilprivkey;
  }

  static generateMnemonic() {
    return bip39.generateMnemonic();
  }

  static validateBip39Mnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }

  static restoreFromMnemonic(mnemonic, password) {
    let seedHex = bip39.mnemonicToSeedHex(mnemonic, password);
    let account = bitcoinjs.HDNode.fromSeedHex(seedHex, network); // bip32RootKey
    let keyPair = account.keyPair;
    return new Wallet(keyPair);
    
  }
}
export default Wallet;