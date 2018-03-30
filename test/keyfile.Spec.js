require("babel-polyfill");
import assert from "assert";
import config from "../src/lib/config.js";
import Wallet from "../src/lib/wallet.js";
import keyfile from "../src/lib/aeskeyfile.js";

let password;
let mnemonic;

beforeEach(async () => {
  password = "sincityofmyadventure";
  mnemonic = "patch mistake raven tonight bottom addict balcony celery merit relax derive soda";
  
});

describe("Keyfile", () => {
  it("should be able to encode file and decode", () => {
    const webWallet  = Wallet.restoreFromMnemonic(mnemonic, password);
    const privateKey = webWallet.getPrivKey();
    const encodedData = keyfile.encode(privateKey, password);
    const decodedData = keyfile.decode(encodedData, password);
    assert.ok(encodedData);
    assert.deepStrictEqual(privateKey, decodedData, "should be able to encode and decode");
  });

});
