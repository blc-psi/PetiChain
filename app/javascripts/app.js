import { default as Web3} from 'web3';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var BigNumber = require('bignumber.js');

// Authority Address:
var authAddr = '0x002dec2D1E355a105bb450273D3Da39d65CFE884';
web3.eth.defaulAccount = authAddr;

// List of contracts with its adresses
// Must be updated with new deploys of updated contracts -----Note: Bytecode needs "0x" prefix always!!!!!
var petregABI = '[{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"hasAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"check","outputs":[{"name":"contained","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"},{"name":"_address","type":"address"}],"name":"overrideAddress","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"insert","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"}]';
var petregContract = web3.eth.contract(JSON.parse(petregABI));
var petreg = petregContract.at('0xfd3B444FD20E41CC29F64441c0583A5D3807469F');

var petABI = '[{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"setId","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_votingToken","type":"address"}],"name":"setToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_status","type":"bool"}],"name":"setStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_endTime","type":"uint32"}],"name":"setEndTime","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"}],"name":"setTitle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"evaluate","outputs":[{"name":"","type":"uint256[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"}],"name":"setDescription","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"votingToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_choice","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_startTime","type":"uint32"}],"name":"setStartTime","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_id","type":"uint32"},{"name":"_title","type":"string"},{"name":"_description","type":"string"},{"name":"_startTime","type":"uint32"},{"name":"_endTime","type":"uint32"},{"name":"_status","type":"bool"},{"name":"_votingToken","type":"address"}],"payable":false,"type":"constructor"}]';
var petCon = web3.eth.contract(JSON.parse(petABI));
var petitionBytecode = '0x6060604052341561000f57600080fd5b604051610e0b380380610e0b833981016040528080519060200190919080518201919060200180518201919060200180519060200190919080519060200190919080519060200190919080519060200190919050505b866000806101000a81548163ffffffff021916908363ffffffff160217905550856001908051906020019061009b92919061015d565b5084600290805190602001906100b292919061015d565b5083600360006101000a81548163ffffffff021916908363ffffffff16021790555082600360046101000a81548163ffffffff021916908363ffffffff16021790555081600360086101000a81548160ff02191690831515021790555080600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50505050505050610202565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019e57805160ff19168380011785556101cc565b828001600101855582156101cc579182015b828111156101cb5782518255916020019190600101906101b0565b5b5090506101d991906101dd565b5090565b6101ff91905b808211156101fb5760008160009055506001016101e3565b5090565b90565b610bfa806102116000396000f300606060405236156100e4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631089a1d7146100e9578063144fa6d714610112578063200d2ed21461014b5780633197cbb6146101785780634a79d50c146101ad5780635c40f6f41461023c57806372298b82146102615780637284e4161461028a57806372910be01461031957806378e97925146103765780637daa9efc146103ab57806390c3f38f146103fd578063af640d0f1461045a578063b03401231461048f578063b3f98adc146104e4578063e87237541461050a575b600080fd5b34156100f457600080fd5b610110600480803563ffffffff16906020019091905050610533565b005b341561011d57600080fd5b610149600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610571565b005b341561015657600080fd5b61015e6105d0565b604051808215151515815260200191505060405180910390f35b341561018357600080fd5b61018b6105e3565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b34156101b857600080fd5b6101c06105f9565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102015780820151818401525b6020810190506101e5565b50505050905090810190601f16801561022e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561024757600080fd5b61025f60048080351515906020019091905050610697565b005b341561026c57600080fd5b610288600480803563ffffffff169060200190919050506106b5565b005b341561029557600080fd5b61029d6106f4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102de5780820151818401525b6020810190506102c2565b50505050905090810190601f16801561030b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561032457600080fd5b610374600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610792565b005b341561038157600080fd5b6103896107c7565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b34156103b657600080fd5b6103be6107dd565b6040518082600360200280838360005b838110156103ea5780820151818401525b6020810190506103ce565b5050505090500191505060405180910390f35b341561040857600080fd5b610458600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610829565b005b341561046557600080fd5b61046d61085e565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561049a57600080fd5b6104a2610873565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156104ef57600080fd5b610508600480803560ff16906020019091905050610899565b005b341561051557600080fd5b610531600480803563ffffffff16906020019091905050610ac2565b005b600360089054906101000a900460ff161561054d57600080fd5b806000806101000a81548163ffffffff021916908363ffffffff1602179055505b50565b600360089054906101000a900460ff161561058b57600080fd5b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600360089054906101000a900460ff1681565b600360049054906101000a900463ffffffff1681565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561068f5780601f106106645761010080835404028352916020019161068f565b820191906000526020600020905b81548152906001019060200180831161067257829003601f168201915b505050505081565b80600360086101000a81548160ff0219169083151502179055505b50565b600360089054906101000a900460ff16156106cf57600080fd5b80600360046101000a81548163ffffffff021916908363ffffffff1602179055505b50565b60028054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561078a5780601f1061075f5761010080835404028352916020019161078a565b820191906000526020600020905b81548152906001019060200180831161076d57829003601f168201915b505050505081565b600360089054906101000a900460ff16156107ac57600080fd5b80600190805190602001906107c2929190610b01565b505b50565b600360009054906101000a900463ffffffff1681565b6107e5610b81565b600460038060200260405190810160405280929190826003801561081e576020028201915b81548152602001906001019080831161080a575b505050505090505b90565b600360089054906101000a900460ff161561084357600080fd5b8060029080519060200190610859929190610b01565b505b50565b6000809054906101000a900463ffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360089054906101000a900460ff1615156108b457600080fd5b60008160ff1610806108c9575060028160ff16115b156108d357600080fd5b6001600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561099a57600080fd5b6102c65a03f115156109ab57600080fd5b5050506040518051905010156109c057600080fd5b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abe7f1ab3360016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1515610a8557600080fd5b6102c65a03f11515610a9657600080fd5b5050505b60048160ff16600381101515610aac57fe5b0160005b81548092919060010191905055505b50565b600360089054906101000a900460ff1615610adc57600080fd5b80600360006101000a81548163ffffffff021916908363ffffffff1602179055505b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4257805160ff1916838001178555610b70565b82800160010185558215610b70579182015b82811115610b6f578251825591602001919060010190610b54565b5b509050610b7d9190610ba9565b5090565b6060604051908101604052806003905b6000815260200190600190039081610b915790505090565b610bcb91905b80821115610bc7576000816000905550600101610baf565b5090565b905600a165627a7a72305820e6a7aacc4771cd7ef8e028a973352e5f42f35dc5710520b460ef086ef40f626a0029';
var tokenABI = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setBalance","outputs":[],"payable":false,"type":"function"}]';
var tokenContract = web3.eth.contract(JSON.parse(tokenABI));
var tokenBytecode = '0x6060604052341561000f57600080fd5b5b61040d8061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806370a082311461005f578063a9059cbb146100ac578063abe7f1ab146100ee578063e30443bc14610130575b600080fd5b341561006a57600080fd5b610096600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610172565b6040518082815260200191505060405180910390f35b34156100b757600080fd5b6100ec600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061018a565b005b34156100f957600080fd5b61012e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102fd565b005b341561013b57600080fd5b610170600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610399565b005b60006020528060005260406000206000915090505481565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156101d557600080fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401101561026057600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561034857600080fd5b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b50505600a165627a7a7230582098a7ba524f0435142e5ec3a7e96553f305c672111a56d2b95b1ecbc6f35f1cfe0029';


// These are automated functions which are executed everytime the state of the blockchain changes
var latest = web3.eth.filter('latest')
latest.watch(function() {
  var coinbase = web3.eth.coinbase;
  var defaulAccount = web3.eth.defaulAccount + " and " + coinbase;
  document.getElementById('coinbase').innerText = defaulAccount;
  var balance = web3.eth.getBalance(coinbase);
  document.getElementById('balance').innerText = balance;
  var latestBlock = web3.eth.blockNumber;
  document.getElementById('latestBlock').innerText = latestBlock;
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
      var startTime = parseInt(pet.startTime());
      var endTime = parseInt(pet.endTime());
      var votes = 0;
      var voteFor = "";

      var table = document.getElementById('petitionList');
      var row = table.insertRow(1);
      var c1 = row.insertCell(0);
      var c2 = row.insertCell(1);
      var c3 = row.insertCell(2);
      var c4 = row.insertCell(3);
      var c5 = row.insertCell(4);
      var c6 = row.insertCell(5);
      var c7 = row.insertCell(6);
      c1.innerText = "asdfjaskdl";
    }
    listCount += 1;
  }
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
  if (_description === "") {
    document.getElementById('petition-error-out').innerText = "Description required";
    return;
  }
  if (_startTime == 0) {
    document.getElementById('petition-error-out').innerText = "StartTime required";
    return;
  }
  if (_endTime == 0) {
    document.getElementById('petition-error-out').innerText = "EndTime required";
    return;
  }
  if (_endTime < _startTime) {
    document.getElementById('petition-error-out').innerText = "EndTime must be greater than StartTime";
    return;
  }


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
    // console.log(web3.eth.defaulAccount);
    // console.log(authAddr);
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
  // console.log(startTime.toNumber());
  var endTime = new BigNumber(Date.parse(row.cells[3].innerText));
  // console.log(Date.parse(endTime));
  var status = true;

  //Given by petition registry
  var id = parseInt(petreg.count());

  //account already unlocked by check routine
  deployTokenNPetition(pwd, id, title, description, startTime, endTime, status);
  table.deleteRow(index);
  while (index < table.rows.length) {
    table.rows[index].cells[4].innerHTML = "<a href='#' onclick='confirmPetition(" + index + ")'>Accept</a> <a href='#' onclick='rejectPetition(" + index + ")'>Reject</a>";
    index += 1;
  }
}

function deployTokenNPetition(_pwd, _id, _title, _description, _startTime, _endTime, _status) {
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
          console.log('Token-Address:' + tmpContract.address) // the contract address
          deployPetition(_pwd, _id, _title, _description, _startTime, _endTime, _status, tmpContract.address);
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
          pet.setTitle(_title, {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setDescription(_description, {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setStartTime(_startTime.toNumber(), {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setEndTime(_endTime.toNumber(), {from: authAddr});
          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setStatus(_status, {from: authAddr});

          //append to PetitionRegister
          web3.personal.unlockAccount(authAddr, _pwd);
          var id = petreg.insert(pet.address, {from: authAddr});
          console.log(id);
          console.log(_id);

          web3.personal.unlockAccount(authAddr, _pwd);
          pet.setId(_id, {from: authAddr});

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
  document.getElementById(activeMenuElement).classList.add('active');

  return;
}




window.testFunction = function testFunction(){
  listPetitions();
}
