import config from "./config";
import bip39 from "bip39";
import bitcoinjs from "./bitcoin.js";

const unit = "btc";
const isSegwit = true;
const DERIVATION_PATH = "m/44'/1'/0'/0";

let network = {};
switch (config.getNetwork()) {
  case "main":
    network = bitcoinjs.bitcoin.networks.bitcoin;
    break;
  default:
    network = bitcoinjs.bitcoin.networks.bitcoin;
}

/**
 * KeyPair: accepts private key
 */
export default class Wallet {
  constructor(rootkey, keyPair) {
    this.rootkey = rootkey;
    this.keyPair = !keyPair ? rootkey.keyPair : keyPair;
    this.info = {
      address: this.getAddress(),
      balance: "loading",
      unconfirmedBalance: "loading",
      erc20: []
    };
    this.transactionList = [];
    this.init();
  }
  init() {
    const extendedKey = this.calculateBip32ExtendedKeyRoot();
    const key = extendedKey.derive(0);
    const keyPair = key.keyPair;
    this.address = keyPair.getAddress().toString();
    // get privkey
    var hasPrivkey = !key.isNeutered();
    this.privkey = "NA";
    if (hasPrivkey) {
      this.privkey = keyPair.toWIF(network);
    }
    // get pubkey
    this.pubkey = keyPair.getPublicKeyBuffer().toString('hex');
    // Segwit addresses are different
    if (isSegwit) {
      if (!segwitAvailable) {
          return;
      }
      if (isP2wpkh) {
          var keyhash = bitcoinjs.bitcoin.crypto.hash160(key.getPublicKeyBuffer());
          var scriptpubkey = bitcoinjs.bitcoin.script.witnessPubKeyHash.output.encode(keyhash);
          address = bitcoinjs.bitcoin.address.fromOutputScript(scriptpubkey, network)
      }
      else if (isP2wpkhInP2sh) {
          var keyhash = bitcoinjs.bitcoin.crypto.hash160(key.getPublicKeyBuffer());
          var scriptsig = bitcoinjs.bitcoin.script.witnessPubKeyHash.output.encode(keyhash);
          var addressbytes = bitcoinjs.bitcoin.crypto.hash160(scriptsig);
          var scriptpubkey = bitcoinjs.bitcoin.script.scriptHash.output.encode(addressbytes);
          address = bitcoinjs.bitcoin.address.fromOutputScript(scriptpubkey, network)
      }
    } 
  }
  getPrivateKey() {
    return this.privkey;
  }
  getAddress() {
    return this.address;
  }
  getPublicKey() {
    return this.pubkey;
  }
  getRootKey() {
    return this.rootkey;
  }
  calculateBip32ExtendedKeyRoot() {
    const pathBits = DERIVATION_PATH.split("/");
    let extendedKey = this.rootkey;
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
    return extendedKey;
  }

  static restoreFromMnemonic(mnemonic, password) {
    let seedHex = bip39.mnemonicToSeedHex(mnemonic, password);
    let account = bitcoinjs.bitcoin.HDNode.fromSeedHex(seedHex, network);
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