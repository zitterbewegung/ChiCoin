require("babel-polyfill");
import assert from "assert";
import config from "../src/lib/config.js";
import Wallet from "../src/lib/wallet.js";

let network;
let mnemonic, password, bip32RootKey, address, mockPrivateKey;

beforeEach(async () => {
  network = config.setNetwork("testnet");
  mnemonic =
    "patch mistake raven tonight bottom addict balcony celery merit relax derive soda";
  password = "sincityofmyadventure";
  address = "19FwLgcWQMLNxe1WXM1DZsP7sB2xuKs85u";
  mockPrivateKey = "KwtianqP3xRZxNToi5jmUQbtBWkCQokpz1YerSup8RiLuytK28xh";
  bip32RootKey =
    "xprv9s21ZrQH143K2ZDvfTmnqiBGfDrpqdeaTG9f55kV1vHTJNqiBgCHw2DoPwtHDjAk8znBAEd1hQmHgYy4UBW453iVLrs7Kng159NkAvZfFeV";
});

describe("Wallet", () => {
  it("should be able to get key pair from Mnemonic and password", () => {
    const webWallet = Wallet.restoreFromMnemonic(mnemonic, password);
    assert.strictEqual(
      address,
      webWallet.getAddress(),
      "should be able to generate same address"
    );
    assert.strictEqual(
      mockPrivateKey,
      webWallet.getPrivKey(),
      "should match private key"
    );
  });

  it("should be able to restore from private key", () => {
    const webWallet = Wallet.restoreFromMnemonic(mnemonic, password);
    assert.strictEqual(
      address,
      webWallet.getAddress(),
      "should be able to generate same address"
    );
    const restoreWallet = Wallet.restoreFromWif(mockPrivateKey);
    assert.strictEqual(
      address,
      restoreWallet.getAddress(),
      "should have same address"
    );
  });

  // it.only("should be able to calculate Bip32Key Root", () => {
  //   const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
  //   const rootkey = webWallet.calculateBip32KeyRoot();
  //   assert.strictEqual(bip32RootKey, rootkey, "should have same address");
  // });
});
