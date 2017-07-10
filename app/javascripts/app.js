import { default as Web3} from 'web3';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// for testing purpose, assume coinbase is defaulAccount
// web3.eth.defaulAccount = web3.eth.coinbase;

// List of contracts with its adresses
// Must be updated with new deploys of updated contracts
var p_registerABI = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setBalance","outputs":[],"payable":false,"type":"function"}]';
var p_registerContract = web3.eth.contract(JSON.parse(p_registerABI));
var p_registerInstance = p_registerContract.at('0xA9aaa2F417bd57C87C0B751DD9fA37891dD73417');





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


//----------------Petition Deployement-----------------
//First stage of deploying the petition is deploying the according tokenContract
var id_count = 1;
window.createPetition = function createPetition() {
  var _id = id_count;
  id_count += 1;
  var _titel = document.getElementById('crpe-titel').value;
  var _description = document.getElementById('crpe-description').value;
  var _startTime = document.getElementById('crpe-starttime').value;
  var _endTime = document.getElementById('crpe-endtime').value;

  var table = document.getElementById('petitionsToConfirm');
  var row = table.insertRow(table.rows.length);
  var c1 = row.insertCell(0);
  var c2 = row.insertCell(1);
  var c3 = row.insertCell(2);
  var c4 = row.insertCell(3);
  var c5 = row.insertCell(4);
  var c6 = row.insertCell(5);

  c1.innerText = _id;
  c2.innerText = _titel;
  c3.innerText = _description;
  c4.innerText = _startTime;
  c5.innerText = _endTime;
  var row_index = (table.rows.length - 1);
  c6.innerHTML = "<a href='#' onclick='confirmPetition(" + row_index + ")'>Accept</a> <a href='#' onclick='rejectPetition(" + row_index + ")'>Reject</a>";

}

window.rejectPetition = function rejectPetition(index) {
  var table = document.getElementById('petitionsToConfirm');
  table.deleteRow(index);
  while (index < table.rows.length) {
    table.rows[index].cells[5].innerHTML = "<a href='#' onclick='confirmPetition(" + index + ")'>Accept</a> <a href='#' onclick='rejectPetition(" + index + ")'>Reject</a>";
    index += 1;
  }
}

window.confirmPetition = function confirmPetition(index) {
  var table = document.getElementById('petitionsToConfirm');
  // var pwd = prompt("Please enter password for your account " + web3.eth.defaulAccount);
  // web3.personal.unlockAccount(web3.eth.defaulAccount, pwd);
  // -----------------------input attributes

  deployTokenNPetition();
  table.deleteRow(index);
  while (index < table.rows.length) {
    table.rows[index].cells[5].innerHTML = "<a href='#' onclick='confirmPetition(" + index + ")'>Accept</a> <a href='#' onclick='rejectPetition(" + index + ")'>Reject</a>";
    index += 1;
  }
}

function deployTokenNPetition() {
  var tokenABI = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setBalance","outputs":[],"payable":false,"type":"function"}]';
  var tokenContract = web3.eth.contract(JSON.parse(tokenABI));
  var tokenBytecode = '0x6060604052341561000f57600080fd5b5b61040d8061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806370a082311461005f578063a9059cbb146100ac578063abe7f1ab146100ee578063e30443bc14610130575b600080fd5b341561006a57600080fd5b610096600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610172565b6040518082815260200191505060405180910390f35b34156100b757600080fd5b6100ec600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061018a565b005b34156100f957600080fd5b61012e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102fd565b005b341561013b57600080fd5b610170600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610399565b005b60006020528060005260406000206000915090505481565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156101d557600080fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401101561026057600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561034857600080fd5b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b50505600a165627a7a723058208a11cefeee65a0ee8e007add6b2e58233af7e138f1f52fbd9cd13e1dc390980d0029';
  var tokenGasEstimate = web3.eth.estimateGas({data: tokenBytecode});
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

          deployPetition(tmpContract.address);
        }
      } else {
        console.log(err);
      }
    }
  );
}

//Second stage is deploying the petitionContract itself
function deployPetition(_tokenAddress) {
  var petitionABI = '[{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"setId","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_votingToken","type":"address"}],"name":"setToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_status","type":"bool"}],"name":"setStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_endTime","type":"uint32"}],"name":"setEndTime","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"evaluate","outputs":[{"name":"","type":"uint256[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"}],"name":"setDescription","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"votingToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_choice","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_startTime","type":"uint32"}],"name":"setStartTime","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_id","type":"uint32"},{"name":"_description","type":"string"},{"name":"_startTime","type":"uint32"},{"name":"_endTime","type":"uint32"},{"name":"_status","type":"bool"},{"name":"_votingToken","type":"address"}],"payable":false,"type":"constructor"}]';
  var petitionContract = web3.eth.contract(JSON.parse(petitionABI));
  var petitionBytecode = '0x6060604052341561000f57600080fd5b604051610c14380380610c14833981016040528080519060200190919080518201919060200180519060200190919080519060200190919080519060200190919080519060200190919050505b856000806101000a81548163ffffffff021916908363ffffffff160217905550846001908051906020019061009292919061013c565b5083600260006101000a81548163ffffffff021916908363ffffffff16021790555082600260046101000a81548163ffffffff021916908363ffffffff16021790555081600260086101000a81548160ff02191690831515021790555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5050505050506101e1565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061017d57805160ff19168380011785556101ab565b828001600101855582156101ab579182015b828111156101aa57825182559160200191906001019061018f565b5b5090506101b891906101bc565b5090565b6101de91905b808211156101da5760008160009055506001016101c2565b5090565b90565b610a24806101f06000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631089a1d7146100d3578063144fa6d7146100fc578063200d2ed2146101355780633197cbb6146101625780635c40f6f41461019757806372298b82146101bc5780637284e416146101e557806378e97925146102745780637daa9efc146102a957806390c3f38f146102fb578063af640d0f14610358578063b03401231461038d578063b3f98adc146103e2578063e872375414610408575b600080fd5b34156100de57600080fd5b6100fa600480803563ffffffff16906020019091905050610431565b005b341561010757600080fd5b610133600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061046f565b005b341561014057600080fd5b6101486104ce565b604051808215151515815260200191505060405180910390f35b341561016d57600080fd5b6101756104e1565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b34156101a257600080fd5b6101ba600480803515159060200190919050506104f7565b005b34156101c757600080fd5b6101e3600480803563ffffffff16906020019091905050610515565b005b34156101f057600080fd5b6101f8610554565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102395780820151818401525b60208101905061021d565b50505050905090810190601f1680156102665780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561027f57600080fd5b6102876105f2565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b34156102b457600080fd5b6102bc610608565b6040518082600360200280838360005b838110156102e85780820151818401525b6020810190506102cc565b5050505090500191505060405180910390f35b341561030657600080fd5b610356600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610653565b005b341561036357600080fd5b61036b610688565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561039857600080fd5b6103a061069d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103ed57600080fd5b610406600480803560ff169060200190919050506106c3565b005b341561041357600080fd5b61042f600480803563ffffffff169060200190919050506108ec565b005b600260089054906101000a900460ff161561044b57600080fd5b806000806101000a81548163ffffffff021916908363ffffffff1602179055505b50565b600260089054906101000a900460ff161561048957600080fd5b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600260089054906101000a900460ff1681565b600260049054906101000a900463ffffffff1681565b80600260086101000a81548160ff0219169083151502179055505b50565b600260089054906101000a900460ff161561052f57600080fd5b80600260046101000a81548163ffffffff021916908363ffffffff1602179055505b50565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105ea5780601f106105bf576101008083540402835291602001916105ea565b820191906000526020600020905b8154815290600101906020018083116105cd57829003601f168201915b505050505081565b600260009054906101000a900463ffffffff1681565b61061061092b565b60038080602002604051908101604052809291908260038015610648576020028201915b815481526020019060010190808311610634575b505050505090505b90565b600260089054906101000a900460ff161561066d57600080fd5b8060019080519060200190610683929190610953565b505b50565b6000809054906101000a900463ffffffff1681565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260089054906101000a900460ff1615156106de57600080fd5b60008160ff1610806106f3575060028160ff16115b156106fd57600080fd5b6001600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156107c457600080fd5b6102c65a03f115156107d557600080fd5b5050506040518051905010156107ea57600080fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abe7f1ab3360016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15156108af57600080fd5b6102c65a03f115156108c057600080fd5b5050505b60038160ff166003811015156108d657fe5b0160005b81548092919060010191905055505b50565b600260089054906101000a900460ff161561090657600080fd5b80600260006101000a81548163ffffffff021916908363ffffffff1602179055505b50565b6060604051908101604052806003905b600081526020019060019003908161093b5790505090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061099457805160ff19168380011785556109c2565b828001600101855582156109c2579182015b828111156109c15782518255916020019190600101906109a6565b5b5090506109cf91906109d3565b5090565b6109f591905b808211156109f15760008160009055506001016109d9565b5090565b905600a165627a7a72305820bf611dc22d70b3cc6da7d26859a1ebf49a89f6a8483cf87e182932e4cbc180640029';
  var petitionGasEstimate = web3.eth.estimateGas({data: petitionBytecode});

  // var _id = 1;
  // var _description = document.getElementById("crpe-description").value;
  // // console.log('Desc ' + _description);
  // // var _startTime = document.getElementById("crpe-starttime");
  // var _startTime = 2;
  // // console.log('startTime: ' + _startTime);
  // // var _endTime = document.getElementById("crpe-endtime");
  // var _endTime = 3;
  // var _status = false;
  // var _votingToken = _tokenAddress;

  var petitionInstance = petitionContract.new(
    //----------- Constructor parameters aren't set in deployed contract??????
    // _id,
    // _description,
    // _startTime,
    // _endTime,
    // _status,
    // _votingToken,
    {
      from: web3.eth.defaulAccount,
      data: petitionBytecode,
      gas: petitionGasEstimate
    }, function(err, tmpContract){
      if(!err) {
        if(!tmpContract.address) {
          console.log('Petition-Transaction-Hash:' + tmpContract.transactionHash) // The hash of the transaction, which deploys the contract
        } else {
          petitionInstance = tmpContract
          console.log('Petition-Address:' + tmpContract.address) // the contract address
          console.log(petitionInstance.description);
          // petitionInstance.setDescription('asdfg', {from: web3.eth.defaulAccount, to: petitionInstance.address});
          // var res = p_registerInstance.insert(_id, tmpContract.address);
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
  let accId = document.getElementById('account').value;
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
  // display new Page
  document.getElementById(showPage).style.display = 'block';

  //set activeMenuElement
  var activeMenuElement = showPage.replace("page", "menu");
  document.getElementById(activeMenuElement).classList.add('active');

  return;
}




window.testFunction = function testFunction(){

}
