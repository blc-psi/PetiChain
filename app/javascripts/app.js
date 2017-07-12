import { default as Web3} from 'web3';

var BigNumber = require('bignumber.js');

// To make app work on Ethereum, web3 object is used (communicates to local node through RPC calls; works with any Ethereum node exposing an RPC layer)
// create an instance of web3 using the HTTP provider
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Authority Address:
var authAddr = '0x002dec2D1E355a105bb450273D3Da39d65CFE884';
// set the default account
web3.eth.defaulAccount = authAddr;

// List of contracts with its adresses
// Must be updated with new deploys of updated contracts -----Note: Bytecode needs "0x" prefix always!!!!!
var petregABI = '[{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"hasAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"check","outputs":[{"name":"contained","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"},{"name":"_address","type":"address"}],"name":"overrideAddress","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"insert","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"}]';
var petregContract = web3.eth.contract(JSON.parse(petregABI));
var petreg = petregContract.at('0x4C4db10AecB6F2751A6DfaE63ead5839B30a1CcA');

var petABI = '[{"constant":true,"inputs":[],"name":"endTimeTest","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"setId","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_votingToken","type":"address"}],"name":"setToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_status","type":"bool"}],"name":"setStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_endTime","type":"uint32"}],"name":"setEndTime","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"}],"name":"setTitle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"evaluate","outputs":[{"name":"","type":"uint256[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"}],"name":"setDescription","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"votingToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_choice","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_startTimeTest","type":"string"}],"name":"setStartTimeTest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTimeTest","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_startTime","type":"uint32"}],"name":"setStartTime","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_endTimeTest","type":"string"}],"name":"setEndTimeTest","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_id","type":"uint32"},{"name":"_title","type":"string"},{"name":"_description","type":"string"},{"name":"_startTime","type":"uint32"},{"name":"_endTime","type":"uint32"},{"name":"_status","type":"bool"},{"name":"_votingToken","type":"address"}],"payable":false,"type":"constructor"}]';
var petCon = web3.eth.contract(JSON.parse(petABI));
var petitionBytecode = '0x606060405234156200001057600080fd5b604051620011c8380380620011c8833981016040528080519060200190919080518201919060200180518201919060200180519060200190919080519060200190919080519060200190919080519060200190919050505b866000806101000a81548163ffffffff021916908363ffffffff1602179055508560019080519060200190620000a092919062000165565b508460029080519060200190620000b992919062000165565b5083600360006101000a81548163ffffffff021916908363ffffffff16021790555082600360046101000a81548163ffffffff021916908363ffffffff16021790555081600660006101000a81548160ff02191690831515021790555080600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5050505050505062000214565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001a857805160ff1916838001178555620001d9565b82800160010185558215620001d9579182015b82811115620001d8578251825591602001919060010190620001bb565b5b509050620001e89190620001ec565b5090565b6200021191905b808211156200020d576000816000905550600101620001f3565b5090565b90565b610fa480620002246000396000f30060606040523615610110576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063010b470e146101155780631089a1d7146101a4578063144fa6d7146101cd578063200d2ed2146102065780633197cbb6146102335780634a79d50c146102685780635c40f6f4146102f757806372298b821461031c5780637284e4161461034557806372910be0146103d457806378e97925146104315780637daa9efc1461046657806390c3f38f146104b8578063af640d0f14610515578063b03401231461054a578063b3f98adc1461059f578063d6869d74146105c5578063e426727014610622578063e8723754146106b1578063eeda5568146106da575b600080fd5b341561012057600080fd5b610128610737565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101695780820151818401525b60208101905061014d565b50505050905090810190601f1680156101965780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101af57600080fd5b6101cb600480803563ffffffff169060200190919050506107d5565b005b34156101d857600080fd5b610204600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610813565b005b341561021157600080fd5b610219610872565b604051808215151515815260200191505060405180910390f35b341561023e57600080fd5b610246610885565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561027357600080fd5b61027b61089b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102bc5780820151818401525b6020810190506102a0565b50505050905090810190601f1680156102e95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561030257600080fd5b61031a60048080351515906020019091905050610939565b005b341561032757600080fd5b610343600480803563ffffffff16906020019091905050610957565b005b341561035057600080fd5b610358610996565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103995780820151818401525b60208101905061037d565b50505050905090810190601f1680156103c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103df57600080fd5b61042f600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610a34565b005b341561043c57600080fd5b610444610a69565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561047157600080fd5b610479610a7f565b6040518082600360200280838360005b838110156104a55780820151818401525b602081019050610489565b5050505090500191505060405180910390f35b34156104c357600080fd5b610513600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610acb565b005b341561052057600080fd5b610528610b00565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561055557600080fd5b61055d610b15565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156105aa57600080fd5b6105c3600480803560ff16906020019091905050610b3b565b005b34156105d057600080fd5b610620600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610d64565b005b341561062d57600080fd5b610635610d99565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106765780820151818401525b60208101905061065a565b50505050905090810190601f1680156106a35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156106bc57600080fd5b6106d8600480803563ffffffff16906020019091905050610e37565b005b34156106e557600080fd5b610735600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610e76565b005b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107cd5780601f106107a2576101008083540402835291602001916107cd565b820191906000526020600020905b8154815290600101906020018083116107b057829003601f168201915b505050505081565b600660009054906101000a900460ff16156107ef57600080fd5b806000806101000a81548163ffffffff021916908363ffffffff1602179055505b50565b600660009054906101000a900460ff161561082d57600080fd5b80600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600660009054906101000a900460ff1681565b600360049054906101000a900463ffffffff1681565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109315780601f1061090657610100808354040283529160200191610931565b820191906000526020600020905b81548152906001019060200180831161091457829003601f168201915b505050505081565b80600660006101000a81548160ff0219169083151502179055505b50565b600660009054906101000a900460ff161561097157600080fd5b80600360046101000a81548163ffffffff021916908363ffffffff1602179055505b50565b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a2c5780601f10610a0157610100808354040283529160200191610a2c565b820191906000526020600020905b815481529060010190602001808311610a0f57829003601f168201915b505050505081565b600660009054906101000a900460ff1615610a4e57600080fd5b8060019080519060200190610a64929190610eab565b505b50565b600360009054906101000a900463ffffffff1681565b610a87610f2b565b6007600380602002604051908101604052809291908260038015610ac0576020028201915b815481526020019060010190808311610aac575b505050505090505b90565b600660009054906101000a900460ff1615610ae557600080fd5b8060029080519060200190610afb929190610eab565b505b50565b6000809054906101000a900463ffffffff1681565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600660009054906101000a900460ff161515610b5657600080fd5b60008160ff161080610b6b575060028160ff16115b15610b7557600080fd5b6001600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610c3c57600080fd5b6102c65a03f11515610c4d57600080fd5b505050604051805190501015610c6257600080fd5b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abe7f1ab3360016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1515610d2757600080fd5b6102c65a03f11515610d3857600080fd5b5050505b60078160ff16600381101515610d4e57fe5b0160005b81548092919060010191905055505b50565b600660009054906101000a900460ff1615610d7e57600080fd5b8060049080519060200190610d94929190610eab565b505b50565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e2f5780601f10610e0457610100808354040283529160200191610e2f565b820191906000526020600020905b815481529060010190602001808311610e1257829003601f168201915b505050505081565b600660009054906101000a900460ff1615610e5157600080fd5b80600360006101000a81548163ffffffff021916908363ffffffff1602179055505b50565b600660009054906101000a900460ff1615610e9057600080fd5b8060059080519060200190610ea6929190610eab565b505b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610eec57805160ff1916838001178555610f1a565b82800160010185558215610f1a579182015b82811115610f19578251825591602001919060010190610efe565b5b509050610f279190610f53565b5090565b6060604051908101604052806003905b6000815260200190600190039081610f3b5790505090565b610f7591905b80821115610f71576000816000905550600101610f59565b5090565b905600a165627a7a72305820beed8d214ef7674a92e834d06e4c36f6c620f7e69b853edff2cf7715ecedf0a70029';
var tokenABI = '[{"constant":false,"inputs":[{"name":"_address","type":"address[]"},{"name":"_amount","type":"uint256"}],"name":"init","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setBalance","outputs":[],"payable":false,"type":"function"}]';
var tokenContract = web3.eth.contract(JSON.parse(tokenABI));
var tokenBytecode = '0x6060604052341561000f57600080fd5b5b6105ab8061001f6000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633e1a771d1461007b57806370a08231146100de5780638e499bcf1461012b578063a9059cbb14610154578063abe7f1ab14610196578063e30443bc146101d8575b600080fd5b341561008657600080fd5b6100dc60048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001909190505061021a565b005b34156100e957600080fd5b610115600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102a9565b6040518082815260200191505060405180910390f35b341561013657600080fd5b61013e6102c1565b6040518082815260200191505060405180910390f35b341561015f57600080fd5b610194600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102c7565b005b34156101a157600080fd5b6101d6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061043a565b005b34156101e357600080fd5b610218600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506104e6565b005b60008090505b82518110156102905781600080858481518110151561023b57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508080600101915050610220565b825182026001600082825401925050819055505b505050565b60006020528060005260406000206000915090505481565b60015481565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561031257600080fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401101561039d57600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561048557600080fd5b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806001600082825403925050819055505b5050565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550818160015403016001819055505b5050505600a165627a7a723058208bdf40f9d8cc4341bfef33787b91dda7f47eaf95a42bb5d65d93cfaf7b9986ed0029';


// These are automated functions which are executed everytime the state of the blockchain changes
// setup a filter for new blocks
var latest = web3.eth.filter('latest')
latest.watch(function() {
  // The coinbase address of the client
  var coinbase = web3.eth.coinbase;
  var defaulAccount = web3.eth.defaulAccount + " and " + coinbase;
  document.getElementById('coinbase').innerText = defaulAccount;
  // check account balance
  var balance = web3.eth.getBalance(coinbase);
  document.getElementById('balance').innerText = balance;
  // number of the most recent block
  var latestBlock = web3.eth.blockNumber;
  document.getElementById('latestBlock').innerText = latestBlock;

  listPetitions();
});

//-----------------Petitions List-------------------
var listCount = 0;
function listPetitions() {
  while (listCount <= parseInt(petreg.count())) {
    var petaddr = petreg.hasAddress(listCount);
    if (web3.isAddress(petaddr) && petaddr != 0 ) {
      var pet = petCon.at(petaddr);
      var id = listCount;
      // console.log(pet.title());
      var title = pet.title();
      var description = pet.description();
      var st = new Date(parseInt(pet.startTimeTest()));
      var startTime = st;
      var et = new Date(parseInt(pet.endTimeTest()));
      var endTime = et;
      var v_yes = parseInt(pet.evaluate.call()[0]);
      var v_no = parseInt(pet.evaluate.call()[1]);
      var v_maybe = parseInt(pet.evaluate.call()[2]);
      // var votes = [v_yes, v_no, v_maybe];

      var table = document.getElementById('petitionList');
      var row = table.insertRow(1);
      var c1 = row.insertCell(0);
      var c2 = row.insertCell(1);
      var c3 = row.insertCell(2);
      var c4 = row.insertCell(3);
      var c5 = row.insertCell(4);
      var c6 = row.insertCell(5);
      var c7 = row.insertCell(6);
      c1.innerText = id;
      c2.innerText = title;
      c3.innerText = description;
      c4.innerText = startTime;
      c5.innerText = endTime;
      c6.innerHTML = "<p>yes: " + v_yes + "<br>no: " + v_no + "<br>maybe: " + v_maybe + "</p>";
      c7.innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="goToVoting(' + id + ')">Vote</button>';
    }
    listCount += 1;
  }
}

//-----------------Voting---------------------
window.goToVoting = function goToVoting(id) {
  var pet = petCon.at(petreg.hasAddress(id));
  document.getElementById("voting_id").innerText = id;
  document.getElementById("voting_title").innerText = pet.title();
  document.getElementById("voting_desc").innerText = pet.description();
  document.getElementById("voting_st").innerText = new Date(parseInt(pet.startTimeTest()));
  document.getElementById("voting_et").innerText = new Date(parseInt(pet.endTimeTest()));

  var v_yes = parseInt(pet.evaluate.call()[0]);
  var v_no = parseInt(pet.evaluate.call()[1]);
  var v_maybe = parseInt(pet.evaluate.call()[2]);

  document.getElementById("voting_votes").innerHTML = "<p>yes: " + v_yes + "<br>no: " + v_no + "<br>maybe: " + v_maybe + "</p>";

  document.getElementById("voting_account").innerText = web3.eth.defaulAccount;
  let pwd = document.getElementById("voting_pwd").value;
  let num = document.getElementById("voting_num").value;
  var buttonHtml = '<div class="btn-group">'
  buttonHtml += '<button type="button" class="btn btn-primary" onclick="vote(' + id + ', 0,)">Yes</button>';
  buttonHtml += '<button type="button" class="btn btn-primary" onclick="vote(' + id + ', 1,)">No</button>';
  buttonHtml += '<button type="button" class="btn btn-primary" onclick="vote(' + id + ', 2,)">Maybe</button>';
  buttonHtml += '</div>'
  document.getElementById("voting_button").innerHTML = buttonHtml;

  navToPage("page-voting");
}

//-------vote()------
window.vote = function vote(id, choice) {
  console.log("adsfadsfsadfasdfasdf");
}

//----------------Petition Deployement-----------------
//First stage of deploying the petition is deploying the according tokenContract
window.createPetition = function createPetition() {
  document.getElementById('petition-error-out').innerText = "";

  var _title = document.getElementById('crpe-title').value;
  var _description = document.getElementById('crpe-description').value;
  var _startTime = document.getElementById('crpe-starttime').value;
  var _endTime = document.getElementById('crpe-endtime').value;

  // exceptions
  if (web3.eth.defaulAccount == null) {
    document.getElementById('petition-error-out').innerText = "You need to login";
    return;
  }
  if (_title === "") {
    document.getElementById('petition-error-out').innerText = "Title required";
    return;
  }
  // if (_description === "") {
  //   document.getElementById('petition-error-out').innerText = "Description required";
  //   return;
  // }
  if (_startTime == 0) {
    document.getElementById('petition-error-out').innerText = "StartTime required";
    return;
  }
  if (_endTime == 0) {
    document.getElementById('petition-error-out').innerText = "EndTime required";
    return;
  }
  // if (_endTime < _startTime) {
  //   document.getElementById('petition-error-out').innerText = "EndTime must be greater than StartTime";
  //   return;
  // }


  var table = document.getElementById('petitionsToConfirm');
  var row = table.insertRow(table.rows.length);
  var c1 = row.insertCell(0);
  var c2 = row.insertCell(1);
  var c3 = row.insertCell(2);
  var c4 = row.insertCell(3);
  var c5 = row.insertCell(4);

  c1.innerText = _title;
  c2.innerText = _description;
  c3.innerText = _startTime;
  c4.innerText = _endTime;
  var row_index = (table.rows.length - 1);
  c5.innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="confirmPetition(' + row_index + ')">Accept</button> <button type="button" class="btn btn-primary btn-sm" onclick="rejectPetition(' + row_index + ')">Reject</button>';
  // console.log(Date.parse(_startTime));
}

window.rejectPetition = function rejectPetition(index) {
  if (web3.toAscii(web3.eth.defaulAccount) != web3.toAscii(authAddr)) {
    document.getElementById('admin-error-out').innerText = "You're not allowed to accept or reject pending Petitions";
    return;
  }
  var table = document.getElementById('petitionsToConfirm');
  table.deleteRow(index);
  while (index < table.rows.length) {
    table.rows[index].cells[4].innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="confirmPetition(' + index + ')">Accept</button> <button type="button" class="btn btn-primary btn-sm" onclick="rejectPetition(' + index + ')">Reject</button>';
    index += 1;
  }
}

window.confirmPetition = function confirmPetition(index) {
  document.getElementById('admin-error-out').innerText = "";
  if (web3.eth.defaulAccount.toLowerCase() != authAddr.toLowerCase()) {
    document.getElementById('admin-error-out').innerText = "You're not allowed to accept or reject pending Petitions";
    return;
  }
  let pwd = document.getElementById('accpetPwd').value
  if (!web3.personal.unlockAccount(authAddr, pwd)) {
    document.getElementById('admin-error-out').innerText = "Wrong password!";
    return;
  }

  // var time = new Date();
  var table = document.getElementById('petitionsToConfirm');
  var row = table.rows[index];
  var title = row.cells[0].innerText;
  var description = row.cells[1].innerText;
  var startTime = new BigNumber(Date.parse(row.cells[2].innerText));
  var endTime = new BigNumber(Date.parse(row.cells[3].innerText));
  var status = true;
  var numInitialTokens = 1;

  //Given by petition registry
  var id = parseInt(petreg.count());

  //account already unlocked by check routine
  deployTokenNPetition(pwd, id, title, description, startTime, endTime, status, numInitialTokens);
  table.deleteRow(index);
  while (index < table.rows.length) {
    table.rows[index].cells[4].innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="confirmPetition(' + index + ')">Accept</button> <button type="button" class="btn btn-primary btn-sm" onclick="rejectPetition(' + index + ')">Reject</button>';
    index += 1;
  }
}

function deployTokenNPetition(_pwd, _id, _title, _description, _startTime, _endTime, _status, _numInitialTokens) {
  var tokenGasEstimate = web3.eth.estimateGas({data: tokenBytecode});
  web3.personal.unlockAccount(authAddr, _pwd);
  var tokenInstance = tokenContract.new(
    {
      data: tokenBytecode,
      gas: tokenGasEstimate,
      from: web3.eth.defaulAccount
    }, function(err, tmpContract){
      if(!err) {
        if(!tmpContract.address) {
          console.log('Token-Transaction-Hash:' + tmpContract.transactionHash) // The hash of the transaction, which deploys the contract
        } else {
          tokenInstance = tmpContract;
          console.log('Token-Address:' + tmpContract.address) // the contract address
          web3.personal.unlockAccount(authAddr, _pwd);
          tokenInstance.init(web3.eth.accounts, _numInitialTokens, {from: authAddr});
          deployPetition(_pwd, _id, _title, _description, _startTime, _endTime, _status, tokenInstance.address);
        }
      } else {
        console.log(err);
      }
    }
  );
}

//Second stage is deploying the petCon itself
function deployPetition(_pwd, _id, _title, _description, _startTime, _endTime, _status, _tokenAddress) {
  var petitionGasEstimate = web3.eth.estimateGas({data: petitionBytecode});

  web3.personal.unlockAccount(authAddr, _pwd);
  var pet = petCon.new(
    //----------- Constructor parameters aren't set in deployed contract??????
    {
      from: web3.eth.defaulAccount,
      data: petitionBytecode,
      gas: petitionGasEstimate
    }, function(err, tmpContract){
      if(!err) {
        if(!tmpContract.address) {
          console.log('Petition-Transaction-Hash:' + tmpContract.transactionHash) // The hash of the transaction, which deploys the contract
        } else {
          pet = tmpContract
          console.log('Petition-Address:' + pet.address) // the contract address

          //set Attributes
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setId(_id, {from: authAddr});
          console.log('id: ' + _id);
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setTitle(_title, {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setDescription(_description, {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setStartTime(_startTime.toNumber(), {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setStartTimeTest(_startTime.toString(), {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setEndTime(_endTime.toNumber(), {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setEndTimeTest(_endTime.toString(), {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setToken(_tokenAddress, {from: authAddr});

          //Petition submitted and opened for voting
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setStatus(_status, {from: authAddr});
          console.log('status');

          //append to PetitionRegister
          web3.personal.unlockAccount(authAddr, _pwd);
          petreg.insert(pet.address, {from: authAddr});
        }
      } else {
        console.log(err);
      }
    }
  );
}


//--------------------------Account management functions
window.login = function login() {
  var accounts = web3.eth.accounts;
  document.getElementById("login-error-out").innerText = "";
  document.getElementById("login-success-out").innerText = "";
  let accId = document.getElementById('account').value.toLowerCase();
  let accPwd = document.getElementById('password').value;
  if (!web3.isAddress(accId)) {
    document.getElementById("login-error-out").innerText = "Given input is not a valid address!";
    return;
  }
  if (accounts.indexOf(accId) < 0) {
    document.getElementById("login-error-out").innerText = "Given address is not a registered account!";
    return;
  }
  if (!web3.personal.unlockAccount(accId, accPwd)) {
    document.getElementById("login-error-out").innerText = "Wrong password!";
    document.getElementById('password').value = "";
    accPwd = "";
    return;
  } else {
    accPwd = "";
    document.getElementById('account').value = "";
    document.getElementById('password').value = "";
    web3.eth.defaulAccount = accId;
    document.getElementById('coinbase').innerText = accId;
    document.getElementById("menu-login").innerHTML = "<a href='#' onclick='logout()'><span class='glyphicon glyphicon-log-in'></span> Logout</a>";
    accId = "";
    document.getElementById("login-success-out").innerText = "Successfully logged in";
    document.getElementById("butten-login").disabled = true;
    navToPage("page-Home");
  }
}

window.logout = function logout() {
  web3.eth.defaulAccount = undefined;
  document.getElementById('coinbase').innerText = web3.eth.defaulAccount;
  document.getElementById("login-success-out").innerText = "";
  document.getElementById("butten-login").disabled = false;
  document.getElementById("signup-credential-out").innerHTML = "";
  document.getElementById("butten-signup").disabled = false;
  document.getElementById('admin-error-out').innerText = "";
  var tmpstr = '"page-login"';
  document.getElementById("menu-login").innerHTML = "<a href='#' onclick='navToPage(" + tmpstr + ")'><span class='glyphicon glyphicon-log-in'></span> Login</a>";
}

window.signup = function signup() {
  document.getElementById("signup-error-out").innerText = "";
  document.getElementById("signup-success-out").innerText = "";
  let accPwd = document.getElementById('newPassword').value;
  let accAddr;
  if (accPwd.length <= 0) {
    document.getElementById("signup-error-out").innerText = "Password cannot be empty!";
    return;
  } else {
    accAddr = web3.personal.newAccount(accPwd);
    document.getElementById("newPassword").value = "";
    accPwd="";
    web3.eth.defaulAccount = accAddr;
    document.getElementById("signup-credential-out").innerHTML = "The address of your new account is: <strong>" + accAddr + "</strong>";
    document.getElementById("butten-signup").disabled = true;
    document.getElementById('coinbase').innerText = web3.eth.defaulAccount;
    document.getElementById("menu-login").innerHTML = "<a href='#' onclick='logout()'><span class='glyphicon glyphicon-log-in'></span> Logout</a>";
  }
}

//------------------------Navigation Functions
window.navToPage = function navToPage(showPage) {
  // hide previous pages
  var pelems = document.getElementsByClassName('pages');
  for (var i = 0; i < pelems.length; i++) {
    pelems[i].style.display = 'none';
  }
  // update/remove activeMenuElement
  var menuElements = document.getElementsByClassName("menuElement");
  for (var i = 0; i < menuElements.length; i++) {
    menuElements[i].classList.remove('active');
  }
  // delete error messages
  var errelems = document.getElementsByClassName("errMsg");
  for (var i = 0; i < errelems.length; i++) {
    errelems[i].innerText = "";
  }

  // display new Page
  document.getElementById(showPage).style.display = 'block';

  //set activeMenuElement
  var activeMenuElement = showPage.replace("page", "menu");
  if (document.getElementById(activeMenuElement) != null) {
    document.getElementById(activeMenuElement).classList.add('active');
  }

  return;
}




window.testFunction = function testFunction(){
  // listPetitions();
  navToPage('page-voting');
}
