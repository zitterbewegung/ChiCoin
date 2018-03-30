require("babel-polyfill");
import assert from "assert";
import config from "../src/lib/config.js";
import Wallet from "../src/lib/wallet.js";

let network;
let webWallet;
let mnemonic;

beforeEach(async () => {
  // Set up default network
  network = config.setNetwork("testnet");
  mnemonic = "patch mistake raven tonight bottom addict balcony celery merit relax derive soda";
});

describe("Wallet", () => {

  it.only("should return a new Mnemonic on call of generateMnemonic", () => {
    assert.ok(Wallet.generateMnemonic(), "should be able to generate Mnemonic");
  });

  it.only("should be able to validate Mnemonic", () => {
    assert.ok(Wallet.validateBip39Mnemonic(mnemonic));
  });

  it.only("should be able to get key pair from Mnemonic and password", () => {
      const password = 'sincityofmyadventure';
      const address = '19FwLgcWQMLNxe1WXM1DZsP7sB2xuKs85u';
      const mockPrivateKey = 'KwtianqP3xRZxNToi5jmUQbtBWkCQokpz1YerSup8RiLuytK28xh';
      const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
      assert.strictEqual(address, webWallet.getAddress(), "should be able to generate same address");
      assert.strictEqual(mockPrivateKey, webWallet.getPrivKey(), "should match private key")
  });


  it.only("should be able to restore from private key", () => {
    const password = 'sincityofmyadventure';
    const address = '19FwLgcWQMLNxe1WXM1DZsP7sB2xuKs85u';
    const mockPrivateKey = 'KwtianqP3xRZxNToi5jmUQbtBWkCQokpz1YerSup8RiLuytK28xh';
    const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
    const restoreWallet = Wallet.restoreFromWif(mockPrivateKey);
    assert.strictEqual(address, restoreWallet.getAddress(), "should have same address");
});

});
