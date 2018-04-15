import bip39 from "bip39";
const ENGLISH_WORDLIST = require("../../node_modules/bip39/wordlists/english.json");
const FRENCH_WORDLIST = require("../../node_modules/bip39/wordlists/french.json");
const CHINESE_SIMPLIFIED = require("../../node_modules/bip39/wordlists/chinese_simplified.json");
const SPANISH_WORDLIST = require("../../node_modules/bip39/wordlists/spanish.json");
let DEFAULT_WORDLIST = ENGLISH_WORDLIST;

export default class Mnemonic {
  constructor(strength, language) {
    this.strength = strength || 128;
    this.language = language || "english";
    if (this.language === "french") {
      DEFAULT_WORDLIST = FRENCH_WORDLIST;
    } else if (this.language === "chinese") {
      DEFAULT_WORDLIST = CHINESE_SIMPLIFIED
    } else if (this.language === "spanish") {
      DEFAULT_WORDLIST = SPANISH_WORDLIST
    } else {
      DEFAULT_WORDLIST = ENGLISH_WORDLIST
    }
  }

  generate() {
    return bip39.generateMnemonic(this.strength, null, DEFAULT_WORDLIST);
  }

  static validate(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }
}
