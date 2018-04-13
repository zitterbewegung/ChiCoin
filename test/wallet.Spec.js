require("babel-polyfill");
import assert from "assert";
import config from "../src/lib/config.js";
import Wallet from "../src/lib/wallet.js";

let network;
let mnemonic, password, bip32RootKey;

beforeEach(async () => {
  // Set up default network
  network = config.setNetwork("testnet");
  mnemonic = "lonely mango bachelor jewel turn allow box reject silk rent desert cage service avocado olympic";
  password = 'sincityofmyadventure';
  bip32RootKey = 'xprv9s21ZrQH143K2ZDvfTmnqiBGfDrpqdeaTG9f55kV1vHTJNqiBgCHw2DoPwtHDjAk8znBAEd1hQmHgYy4UBW453iVLrs7Kng159NkAvZfFeV';
});

describe("Wallet", () => {

  it("should be able to get key pair from Mnemonic and password", () => {
      const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
      assert.strictEqual(address, webWallet.getAddress(), "should be able to generate same address");
      assert.strictEqual(mockPrivateKey, webWallet.getPrivKey(), "should match private key")
  });


  it("should be able to restore from private key", () => {
    const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
    const restoreWallet = Wallet.restoreFromWif(mockPrivateKey);
    assert.strictEqual(address, restoreWallet.getAddress(), "should have same address");
  });

  it.only("should be able to calculate Bip32Key Root", () => {
    const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
    const rootkey = webWallet.calculateBip32KeyRoot();
    assert.strictEqual(bip32RootKey, rootkey, "should have same address");
  });

});
