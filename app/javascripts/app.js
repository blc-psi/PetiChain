import { default as Web3} from 'web3';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// These are automated functions which are executed everytime the state of the blockchain changes
var latest = web3.eth.filter('latest')
latest.watch(function() {
  var coinbase = web3.eth.coinbase;
  document.getElementById('coinbase').innerText = coinbase;
  var balance = web3.eth.getBalance(coinbase);
  document.getElementById('balance').innerText = balance;
  var latestBlock = web3.eth.blockNumber;
  document.getElementById('latestBlock').innerText = latestBlock;
});
