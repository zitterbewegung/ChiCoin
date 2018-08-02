var ChiCoin = artifacts.require("ChiCoin");

module.exports = function(deployer){

    deployer.deploy(ChiCoin);
    
};
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
