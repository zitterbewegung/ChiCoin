require("babel-polyfill");
import assert from "assert";
import store from "../src/lib/config.js";

let network;
const key = "network";
const value = "testnet";

beforeEach(async () => {
  // Set up default network
  network = store.set(key, value);
});

describe("Config", () => {
  it.only("test store returns default value", () => {
    const storevalue = store.get(key);
    assert.strictEqual(
      value,
      storevalue,
      "Default network value is not correct."
    );
    assert.equal();
  });

  it.only("should be able to set a new value for network", () => {
    const newValue = 'blank';
    store.set(key, newValue);
    const storeValue = store.get(key, value);
    assert.strictEqual(newValue, storeValue);
  });
  
});
