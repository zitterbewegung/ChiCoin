require("babel-polyfill");
import assert from "assert";
import config from "../src/lib/config.js";
import Wallet from "../src/lib/wallet.js";
import bitcoinjs from "../src/lib/bitcoin.js";

let network;
let mnemonic, password, mockbip32RootKey,
 mockbip32ExtendedKey, mockAddress,mockExtendedPublicKey,
 mockPublicKey, mockPrivateKey;

beforeEach(async () => {
  network = bitcoinjs.bitcoin.networks.testnet;
  mnemonic = "patch mistake raven tonight bottom addict balcony celery merit relax derive soda";
  password = "sincityofmyadventure";
  mockAddress = "mzFS26UQXxwvEVey9k4GBYYmhALka6PsqS";
  mockPublicKey = "02e0040072db66b13a4daac4b7cc8a81994661bed22f839bb60261c213a50d7894";
  mockPrivateKey = "cTUSZuuZNZjVg2iWkUNz4XB8reW3LwbbibxjMiKr6uyXqhDnjTxN";
  mockbip32RootKey = "tprv8ZgxMBicQKsPf4XbVf1Y2pVzfiKxiVBkGtq44xz3jxD5sVorM77CqX2ipYYPogBJN8sPEbWhkzdD6twJApoow2VqYSzefTYFfZLgnWmL9CR";
  mockbip32ExtendedKey = "tprv8i5UwW5Ukv5aTPs8C2fUsrdHatSBfE2xMqYywtFbZ2xVjeAtVGzuG2JGJ14Y2PCiGXfGyTzEtcGKUxjpEeAfqkez1cBT5HcLMQrtHoorvx7";
  mockExtendedPublicKey = "tpubDEmX5v7iuHmFLrtv5gL5HGHQ9ux7pZDrw99mEQHtyJkta8Rf7fpVSWv8U7eSdjp6C8dSERintXmq8XtePyUTRhjL2jgSg5CJYq8zDnf6quC"
});

describe("Wallet", () => {

  it("should be able to restore from private key", () => {
    const webWallet = Wallet.restoreFromMnemonic(mnemonic, password);
    const extendedKey = webWallet.calculateBip32ExtendedKeyRoot();
    const key = extendedKey.derive(0);
    var keyPair = key.keyPair;
    // address
    var address = keyPair.getAddress().toString();
    // get privkey
    var hasPrivkey = !key.isNeutered();
    var privkey = "NA";
    if (hasPrivkey) {
        privkey = keyPair.toWIF(network);
    }
    // get pubkey
    var pubkey = keyPair.getPublicKeyBuffer().toString('hex');
    assert.strictEqual(
      mockAddress,
      webWallet.getAddress(),
      "should have same address"
    );
    assert.strictEqual(
      mockPublicKey,
      webWallet.getPublicKey(),
      "should be able to generate same public Key"
    );
    assert.strictEqual(
      mockPrivateKey,
      webWallet.getPrivateKey(),
      "should be able to generate same privateKey"
    );
  });

  it("should be able to calculate correct Root Key", () => {
    const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
    const rootkey = webWallet.getRootKey();
    const rootKeyBase58 = rootkey.toBase58();
    assert.strictEqual(mockbip32RootKey, rootKeyBase58, "should have same address");
  });

  it("should be able to calculate Extended key from Root Key", () => {
    const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
    const extendedKey = webWallet.calculateBip32ExtendedKeyRoot();
    const extendedPrivatekey = extendedKey.toBase58();
    const extendedPublicKey = extendedKey.neutered().toBase58();
    assert.strictEqual(mockbip32ExtendedKey, extendedPrivatekey, "should have same private address");
    assert.strictEqual(mockExtendedPublicKey, extendedPublicKey, "should have same public address");
    
  });

});
