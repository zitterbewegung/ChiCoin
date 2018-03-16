window.addEventListener('load', function() {
  initWeb3();
  setTimeout(startApp, 200);
});

function initWeb3() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
}

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
  
  getContract().isMember(function(err, res) {
    if (res == 0) {
      formState("register-form");
    } else {
      showMainForm(res);
    }
  });
}

function getContract() {
  var cbpContract = web3.eth.contract(contractAbi).at(contractAddress);
  return cbpContract;
}

function changeName() {
  var nick = $("#txtNickname").val();
  if (nick) {    
    formState("loading-form");
    $(".loading-message").html("Registering on<br />Ethereum Blockchain");
    getContract().register(web3.fromAscii(nick), function(err, res) {
      if (err) {
        formState("register-form");
      } else {
        finishRegistration();
      }
    });
  }
}

function formState(active) {
  $(".register-form").hide();
  $(".main-form").hide();
  $(".loading-form").hide();

  $("."+ active).show();
} 

function finishRegistration() {
  getContract().isMember(function(err, res) {
    if (res == 0) {
      setTimeout(finishRegistration, 2000);
    } else {
      showMainForm(res);
    }
  });
}

function showMainForm(res) {
  formState("main-form");

  $("#username").html(web3.toAscii(res));
}

function sendClick(sender) {
  sender.hide();

  getContract().sendClick(function(err, res) {
    if (res == 0) {
      alert("Error");
    } else {
      $("#txtClickCount").html("You've clicked "+ res.totalClicks + " time(s)");
    }

    sender.show();
  });
}