import bip39 from "bip39";
const ENGLISH_WORDLIST = require("../../node_modules/bip39/wordlists/english.json");
const FRENCH_WORDLIST = require("../../node_modules/bip39/wordlists/french.json");

function init() {
  
}
export default class Mnemonic {
  constructor(strength, language) {
    this.strength = strength || 128;
    this.language = language || "english";
    if (this.language === "french") {
    }
  }

  generateMnemonic() {
    return bip39.generateMnemonic(this.strength, null, ENGLISH_WORDLIST);
  }

  static validateBip39Mnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }
}
