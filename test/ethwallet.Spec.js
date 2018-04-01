require("babel-polyfill");
import assert from "assert";
import config from "../src/lib/config.js";
import Wallet from "../src/lib/ethwallet.js";

let network;
let mnemonic, bip38Seed, password, address, mockPrivateKey;

beforeEach(async () => {
  // Set up degetbip44DerivationPathfault network
  network = config.setNetwork("testnet");
  password = '';
  mnemonic = "patch mistake raven tonight bottom addict balcony celery merit relax derive soda";
  bip38Seed = 'fd632a5cb668e957a23781e4a22daad87ed7ad018cf24d0272a63bd35f99cc52229e6f5f6dc2fceb81379a51da7d781b4e197fa6f03b12237dafc87f460605fb';
});

describe("Wallet", () => {

  it("should be able to get key pair from Mnemonic and password", () => {
    const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
    assert.ok(webWallet);
    assert.strictEqual("03e12e29b2d9a88dec07cce1317cfd9cc6554859abb2cf6746f27c283e9ddb0f80", webWallet.getPublicKey());
    assert.strictEqual("c58806e5f1325c97ff14d863ca9c0b4ef32a2aa45b9e967219b800738da75cde", webWallet.getPrivateKey());
    assert.strictEqual("28f60c6c9174e21054b4a326dd407a2d3f8f2ad2", webWallet.getAddress(), "address not matching");

    assert.strictEqual("0x03e12e29b2d9a88dec07cce1317cfd9cc6554859abb2cf6746f27c283e9ddb0f80", webWallet.getEthPublicKey(), "publickey not matching");
    assert.strictEqual("0x28F60c6C9174e21054B4a326Dd407a2d3F8f2AD2", webWallet.getEthAddress(), "address not matching");
    assert.strictEqual("0xc58806e5f1325c97ff14d863ca9c0b4ef32a2aa45b9e967219b800738da75cde", webWallet.getEthPrivateKey(), "privatekey not matching");
    
    
  });

  // it.only("should calculate correct derivate path", () => {
  //   const derivatingPath = Wallet.getbip44DerivationPath();
  //   const mockderivationPath = "m/44'/60'/0'/0"
  //   assert.strictEqual(mockderivationPath, derivatingPath, "should be able to get correct derivation path");

  // });

  it("should be able to restore using Mnemonic", () => {
    
  });

});
