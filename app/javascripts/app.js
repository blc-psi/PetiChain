import { default as Web3} from 'web3';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// for testing purpose, assume coinbase is defaulAccount
web3.eth.defaulAccount = web3.eth.coinbase;

// List of contract with its adresses


// These are automated functions which are executed everytime the state of the blockchain changes
var latest = web3.eth.filter('latest')
latest.watch(function() {
  var coinbase = web3.eth.coinbase;
  var defaulAccount = web3.eth.defaulAccount;
  document.getElementById('coinbase').innerText = coinbase + ' and ' + defaulAccount;
  var balance = web3.eth.getBalance(coinbase);
  document.getElementById('balance').innerText = balance;
  var latestBlock = web3.eth.blockNumber;
  document.getElementById('latestBlock').innerText = latestBlock;
});

// This is how you make a function call from an onclick="createPetition()" button or whatever
var id_count = 1;
window.createPetition = function createPetition() {
  // first deploy token contract
  var tokenABI = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setBalance","outputs":[],"payable":false,"type":"function"}]';
  var tokenContract = web3.eth.contract(JSON.parse(tokenABI));
  var tokenBytecode = '0x6060604052341561000f57600080fd5b5b61040d8061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806370a082311461005f578063a9059cbb146100ac578063abe7f1ab146100ee578063e30443bc14610130575b600080fd5b341561006a57600080fd5b610096600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610172565b6040518082815260200191505060405180910390f35b34156100b757600080fd5b6100ec600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061018a565b005b34156100f957600080fd5b61012e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102fd565b005b341561013b57600080fd5b610170600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610399565b005b60006020528060005260406000206000915090505481565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156101d557600080fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401101561026057600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561034857600080fd5b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b50505600a165627a7a723058208a11cefeee65a0ee8e007add6b2e58233af7e138f1f52fbd9cd13e1dc390980d0029';
  var tokenGasEstimate = web3.eth.estimateGas({data: tokenBytecode});
  var tokenInstance = tokenContract.new(
    {
      data: tokenBytecode,
      gas: tokenGasEstimate,
      from: web3.eth.defaulAccount
    }, function(err, myContract){
      if(!err) {
        if(!myContract.address) {
          console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
        } else {
          console.log(myContract.address) // the contract address
        }
      } else {
        console.log(err);
      }
    }
  )
  var inpTitel = document.getElementById("crpe-titel");
  var inpDesc = document.getElementById("crpe-description");

  // document.getElementById("crpe-output").innerText = inpTitel.value;
  return true;
}
