const ChiCoin = artifacts.require('ChiCoin');
//////////////////////////////////////////////////////////////////////////////////////////
// contract('ChiCoin', function(accounts) {					        //
//   it("should have 9882634 in totalSupply", function() {			        //
//     return ChiCoin.deployed().then(function(instance) {			        //
//       return instance.balanceOf.call(accounts[0]);				        //
//     }).then(function(balance) {						        //
//       assert.equal(balance.valueOf(), 9882634, "10000 wasn't in the first account"); //
//     });									        //
//   });									        //
// });										        //
//////////////////////////////////////////////////////////////////////////////////////////
contract('ChiCoin', function(accounts) {
  it("should have 9882634 in totalSupply", function() {
    return ChiCoin.deployed().then(function(instance) {
      return instance.totalSupply.call();
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 9882634, "10000 wasn't in the first account");
    });
  });
});
