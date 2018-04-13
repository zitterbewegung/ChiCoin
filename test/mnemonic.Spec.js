require("babel-polyfill");
import assert from "assert";
import Mnemonic from "../src/lib/mnemonic.js";

let DEFAULT_MNEMONIC;
beforeEach(async () => {
    // Set up default values.
    DEFAULT_MNEMONIC = "patch mistake raven tonight bottom addict balcony celery merit relax derive soda";
});

describe("Mnemonic", () => {

  it("should return a new Mnemonic on call of generateMnemonic", () => {
    const mnemoic = new Mnemonic();
    assert.ok(mnemoic.generateMnemonic(), "should be able to generate Mnemonic");
  });

  it("should be able to validate Mnemonic", () => {
    assert.ok(Mnemonic.validateBip39Mnemonic(DEFAULT_MNEMONIC));
  });

});
