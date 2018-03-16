window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  startApp();
});

function startApp() {
  web3.version.getNetwork((err, netId) => {
    switch (netId) {
      case "1":
        console.log('This is mainnet')
        break
      case "2":
        console.log('This is the deprecated Morden test network.')
        break
      case "3":
        console.log('This is the ropsten test network.')
        break
      case "4":
        console.log('This is the Rinkeby test network.')
        break
      case "42":
        console.log('This is the Kovan test network.')
        break
      default:
        console.log('This is an unknown network.')
    }
  });
}

function getContract() {
  var cbpContract = web3.eth.contract(contractAbi).at(contractAddress);
  return cbpContract;
}

function getName() {
  getContract().isMember(function(err, res) {
    console.log(res);
    $("#username").val(web3.toAscii(res));
  });
}

function changeName() {
  var nick = $("#username").val();
  if (nick) {
    getContract().register(web3.fromAscii(nick), function(err, res) {
      alert("Name changed");
    });
  }
}