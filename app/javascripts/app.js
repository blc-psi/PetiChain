import { default as Web3} from 'web3';

var BigNumber = require('bignumber.js');

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Addresses:
var controlAddr = '0x3EFe133380F4ff619df60B05d69c79e35305981E';

// List of contracts details
// Must be updated with new deploys of updated contracts -----Note: Bytecode needs "0x" prefix always!!!!!
var controlABI = '[{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferToken","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_petiRegister","type":"address"},{"name":"_userRegister","type":"address"},{"name":"_authRegister","type":"address"}],"name":"init","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"isAuth","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"insertAuth","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authRegister","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"}],"name":"getToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setBalanceToken","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"initFull","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"userRegister","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"countUser","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"}],"name":"removePetiReg","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"removeToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"petiRegister","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"removeAuth","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"}],"name":"hasAddressPetiReg","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"}],"name":"evaluatePeti","outputs":[{"name":"","type":"uint256[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"}],"name":"getPeti","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"}],"name":"numTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"}],"name":"checkPetiReg","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"countPetiReg","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idUser","type":"uint32"}],"name":"hasAddressUser","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idUser","type":"uint32"},{"name":"_address","type":"address"}],"name":"overrideAddressUser","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_address","type":"address"}],"name":"balanceOfToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getAllAddrPetiReg","outputs":[{"name":"","type":"address[1048576]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"existsPetiReg","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idUser","type":"uint32"}],"name":"removeUser","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_address","type":"address"}],"name":"overrideAddressPetiReg","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_status","type":"bool"}],"name":"setStatusPeti","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"insertPetiReg","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_numVotesPerUser","type":"uint8"},{"name":"_idPeti","type":"uint32"},{"name":"_titlePeti","type":"string"},{"name":"_descriptionPeti","type":"string"},{"name":"_startTimePeti","type":"string"},{"name":"_endTimePeti","type":"string"},{"name":"_userAddresses","type":"address[]"},{"name":"_myToken","type":"address"},{"name":"_myPetition","type":"address"}],"name":"createPetitionToken","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"countAuth","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_address","type":"address[]"},{"name":"_amount","type":"uint256"}],"name":"initToken","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"insertUser","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getAllAddrUser","outputs":[{"name":"","type":"address[1048576]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPeti","type":"uint32"},{"name":"_choice","type":"uint8"},{"name":"_numVotes","type":"uint8"}],"name":"votePeti","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idUser","type":"uint32"}],"name":"checkUser","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"existsUser","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"_petiRegister","type":"address"},{"name":"_userRegister","type":"address"},{"name":"_authRegister","type":"address"}],"payable":false,"type":"constructor"}]';
var controlCon = web3.eth.contract(JSON.parse(controlABI));
var control = controlCon.at(controlAddr);

var petABI = '[{"constant":false,"inputs":[{"name":"_startTime","type":"string"}],"name":"setStartTime","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"setId","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_votingToken","type":"address"}],"name":"setToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"},{"name":"_title","type":"string"},{"name":"_description","type":"string"},{"name":"_startTime","type":"string"},{"name":"_endTime","type":"string"},{"name":"_votingToken","type":"address"}],"name":"init","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_status","type":"bool"}],"name":"setStatus","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"}],"name":"setTitle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"evaluate","outputs":[{"name":"","type":"uint256[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"}],"name":"setDescription","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_endTime","type":"string"}],"name":"setEndTime","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"votingToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_choice","type":"uint8"},{"name":"_numVotes","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_id","type":"uint32"},{"name":"_title","type":"string"},{"name":"_description","type":"string"},{"name":"_startTime","type":"string"},{"name":"_endTime","type":"string"},{"name":"_status","type":"bool"},{"name":"_votingToken","type":"address"}],"payable":false,"type":"constructor"}]';
var petCon = web3.eth.contract(JSON.parse(petABI));
var petitionBytecode = '0x606060405234156200001057600080fd5b6040516200127838038062001278833981016040528080519060200190919080518201919060200180518201919060200180518201919060200180518201919060200180519060200190919080519060200190919050505b866000806101000a81548163ffffffff021916908363ffffffff1602179055508560019080519060200190620000a092919062000155565b508460029080519060200190620000b992919062000155565b508360039080519060200190620000d292919062000155565b508260049080519060200190620000eb92919062000155565b5081600560006101000a81548160ff02191690831515021790555080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5050505050505062000204565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200019857805160ff1916838001178555620001c9565b82800160010185558215620001c9579182015b82811115620001c8578251825591602001919060010190620001ab565b5b509050620001d89190620001dc565b5090565b6200020191905b80821115620001fd576000816000905550600101620001e3565b5090565b90565b61106480620002146000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ca35882146100f45780631089a1d714610151578063144fa6d71461017a578063200d2ed2146101b357806325463c6c146101e05780633197cbb6146103345780634a79d50c146103c35780635c40f6f4146104525780637284e4161461047757806372910be01461050657806378e97925146105635780637daa9efc146105f257806390c3f38f1461064457806391b5ddd3146106a1578063af640d0f146106fe578063b034012314610733578063df49c4de14610788575b600080fd5b34156100ff57600080fd5b61014f600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506107ba565b005b341561015c57600080fd5b610178600480803563ffffffff169060200190919050506107ef565b005b341561018557600080fd5b6101b1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061082d565b005b34156101be57600080fd5b6101c661088c565b604051808215151515815260200191505060405180910390f35b34156101eb57600080fd5b610332600480803563ffffffff1690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061089f565b005b341561033f57600080fd5b610347610980565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103885780820151818401525b60208101905061036c565b50505050905090810190601f1680156103b55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103ce57600080fd5b6103d6610a1e565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104175780820151818401525b6020810190506103fb565b50505050905090810190601f1680156104445780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561045d57600080fd5b61047560048080351515906020019091905050610abc565b005b341561048257600080fd5b61048a610ada565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104cb5780820151818401525b6020810190506104af565b50505050905090810190601f1680156104f85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561051157600080fd5b610561600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610b78565b005b341561056e57600080fd5b610576610bad565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105b75780820151818401525b60208101905061059b565b50505050905090810190601f1680156105e45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156105fd57600080fd5b610605610c4b565b6040518082600360200280838360005b838110156106315780820151818401525b602081019050610615565b5050505090500191505060405180910390f35b341561064f57600080fd5b61069f600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610c97565b005b34156106ac57600080fd5b6106fc600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610ccc565b005b341561070957600080fd5b610711610d01565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561073e57600080fd5b610746610d16565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561079357600080fd5b6107b8600480803560ff1690602001909190803560ff16906020019091905050610d3c565b005b600560009054906101000a900460ff16156107d457600080fd5b80600390805190602001906107ea929190610f6b565b505b50565b600560009054906101000a900460ff161561080957600080fd5b806000806101000a81548163ffffffff021916908363ffffffff1602179055505b50565b600560009054906101000a900460ff161561084757600080fd5b80600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600560009054906101000a900460ff1681565b856000806101000a81548163ffffffff021916908363ffffffff16021790555084600190805190602001906108d5929190610f6b565b5083600290805190602001906108ec929190610f6b565b508260039080519060200190610903929190610f6b565b50816004908051906020019061091a929190610f6b565b5080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600560006101000a81548160ff0219169083151502179055505b505050505050565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a165780601f106109eb57610100808354040283529160200191610a16565b820191906000526020600020905b8154815290600101906020018083116109f957829003601f168201915b505050505081565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ab45780601f10610a8957610100808354040283529160200191610ab4565b820191906000526020600020905b815481529060010190602001808311610a9757829003601f168201915b505050505081565b80600560006101000a81548160ff0219169083151502179055505b50565b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b705780601f10610b4557610100808354040283529160200191610b70565b820191906000526020600020905b815481529060010190602001808311610b5357829003601f168201915b505050505081565b600560009054906101000a900460ff1615610b9257600080fd5b8060019080519060200190610ba8929190610f6b565b505b50565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c435780601f10610c1857610100808354040283529160200191610c43565b820191906000526020600020905b815481529060010190602001808311610c2657829003601f168201915b505050505081565b610c53610feb565b6006600380602002604051908101604052809291908260038015610c8c576020028201915b815481526020019060010190808311610c78575b505050505090505b90565b600560009054906101000a900460ff1615610cb157600080fd5b8060029080519060200190610cc7929190610f6b565b505b50565b600560009054906101000a900460ff1615610ce657600080fd5b8060049080519060200190610cfc929190610f6b565b505b50565b6000809054906101000a900463ffffffff1681565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560009054906101000a900460ff161515610d5757600080fd5b60008260ff161080610d6c575060028260ff16115b15610d7657600080fd5b8060ff16600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610e3f57600080fd5b6102c65a03f11515610e5057600080fd5b505050604051805190501015610e6557600080fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abe7f1ab33836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260ff16815260200192505050600060405180830381600087803b1515610f2c57600080fd5b6102c65a03f11515610f3d57600080fd5b5050505b8060ff1660068360ff16600381101515610f5757fe5b0160005b82825401925050819055505b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610fac57805160ff1916838001178555610fda565b82800160010185558215610fda579182015b82811115610fd9578251825591602001919060010190610fbe565b5b509050610fe79190611013565b5090565b6060604051908101604052806003905b6000815260200190600190039081610ffb5790505090565b61103591905b80821115611031576000816000905550600101611019565b5090565b905600a165627a7a7230582064f213f987760577fb05fc70eb1a29553bbb7dc58a1886d8791fff638b8580010029';
var tokenABI = '[{"constant":false,"inputs":[{"name":"_address","type":"address[]"},{"name":"_amount","type":"uint256"}],"name":"init","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setBalance","outputs":[],"payable":false,"type":"function"}]';
var tokenCon = web3.eth.contract(JSON.parse(tokenABI));
var tokenBytecode = '0x6060604052341561000f57600080fd5b5b6105ab8061001f6000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633e1a771d1461007b57806370a08231146100de5780638e499bcf1461012b578063a9059cbb14610154578063abe7f1ab14610196578063e30443bc146101d8575b600080fd5b341561008657600080fd5b6100dc60048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001909190505061021a565b005b34156100e957600080fd5b610115600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102a9565b6040518082815260200191505060405180910390f35b341561013657600080fd5b61013e6102c1565b6040518082815260200191505060405180910390f35b341561015f57600080fd5b610194600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102c7565b005b34156101a157600080fd5b6101d6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061043a565b005b34156101e357600080fd5b610218600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506104e6565b005b60008090505b82518110156102905781600080858481518110151561023b57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508080600101915050610220565b825182026001600082825401925050819055505b505050565b60006020528060005260406000206000915090505481565b60015481565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561031257600080fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401101561039d57600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b5050565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561048557600080fd5b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806001600082825403925050819055505b5050565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550818160015403016001819055505b5050505600a165627a7a7230582094d5c92f8c17493ddb4c81c156319cf7c7f5c9f8e9cef4a6cd388bb665e77ab50029';


// These are automated functions which are executed everytime the state of the blockchain changes
var latest = web3.eth.filter('latest')
latest.watch(function() {
  var coinbase = web3.eth.coinbase;
  var defaultAccount = web3.eth.defaultAccount;
  document.getElementById('coinbase').innerText = defaultAccount;
  var balance = web3.eth.getBalance(coinbase);
  document.getElementById('balance').innerText = balance;
  var latestBlock = web3.eth.blockNumber;
  document.getElementById('latestBlock').innerText = latestBlock;

  listPetitions();
});

//-----------------Petitions List-------------------
var listCount = 0;
window.listPetitions = function listPetitions() {
  var i = 1; //to skip table header
  var table = document.getElementById('petitionList');
  var token;
  var pet;
  //update vote counts vor all previous petitions
  while (i < table.rows.length) {
    let id = table.rows[i].cells[0].innerText;
    let remaining = parseInt(control.balanceOfToken.call(id, web3.eth.defaultAccount));

    table.rows[i].cells[5].innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="goToVoting(' + id + ')">Votes: ' + remaining + '</button>';
    i += 1;
  }
  //Update list with new petitions
  while (listCount < parseInt(control.countPetiReg.call())) {
    pet = petCon.at(control.hasAddressPetiReg.call(listCount));

    token = tokenCon.at(pet.votingToken());
    let remaining = parseInt(control.balanceOfToken.call(listCount, web3.eth.defaultAccount));

    var row = table.insertRow(1);
    var c0 = row.insertCell(0);
    var c1 = row.insertCell(1);
    var c2 = row.insertCell(2);
    var c3 = row.insertCell(3);
    var c4 = row.insertCell(4);
    var c6 = row.insertCell(5);
    c0.innerText = listCount;
    c1.innerText = pet.title();
    c2.innerText = pet.description();
    c3.innerText = new Date(parseInt(pet.startTime()));
    c4.innerText = new Date(parseInt(pet.endTime()));
    c6.innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="goToVoting(' + listCount + ')">Votes: ' + remaining + '</button>';
    listCount += 1;
  }
}

//___________________Voting__________________
//-----------------------go to voting page and set html contents to selected petition attributes
window.goToVoting = function goToVoting(id) {
  var pet = petCon.at(control.hasAddressPetiReg.call(id));
  document.getElementById("voting_id").innerText = id;
  document.getElementById("voting_title").innerText = pet.title();
  document.getElementById("voting_desc").innerText = pet.description();
  var startTime = new Date(parseInt(pet.startTime()));
  var endTime = new Date(parseInt(pet.endTime()));
  document.getElementById("voting_st").innerText = startTime;
  document.getElementById("voting_et").innerText = endTime;
  document.getElementById('voting_act').innerText = "active";

  var evaluation = pet.evaluate.call();
  var v_yes = parseInt(evaluation[0]);
  var v_no = parseInt(evaluation[1]);
  var v_maybe = parseInt(evaluation[2]);

  document.getElementById("voting_votes").innerHTML = "<p>yes: " + v_yes + "<br>no: " + v_no + "<br>maybe: " + v_maybe + "</p>";

  document.getElementById("voting_account").innerText = web3.eth.defaultAccount;
  var remaining = parseInt(control.balanceOfToken.call(id, web3.eth.defaultAccount));
  document.getElementById("voting_tokens").innerText = remaining;

  //check for start and end time and disable buttons if needed
  var currTime = new Date();
  if (currTime < startTime || currTime > endTime) {
    var voteButton = '<button type="button" class="btn btn-primary disabled">Currently inactive</button>';
    document.getElementById("voting_button").innerHTML = voteButton;
    var transferButton = '<button type="button" class="btn btn-primary disabled">Currently inactive</button>'
    document.getElementById("transfer_button").innerHTML = transferButton;

    if (currTime < startTime) {
      document.getElementById('voting_act').innerText = "Petition has not started yet";
    } else if (currTime > endTime) {
      document.getElementById('voting_act').innerText = "Petition has already ended";
    }
  } else {
    var voteButton = '<div class="btn-group">'
    voteButton += '<button type="button" class="btn btn-primary" onclick="vote(' + id + ', 0,)">Yes</button>';
    voteButton += '<button type="button" class="btn btn-primary" onclick="vote(' + id + ', 1,)">No</button>';
    voteButton += '<button type="button" class="btn btn-primary" onclick="vote(' + id + ', 2,)">Maybe</button>';
    voteButton += '</div>'
    document.getElementById("voting_button").innerHTML = voteButton;

    var transferButton = '<button type="button" class="btn btn-primary" onclick="transfer(' + id + ')">Transfer</button>'
    document.getElementById("transfer_button").innerHTML = transferButton;
  }

  //navigate to voting page
  navToPage("page-voting");
}

//-----------------------Vote for petition-----------------------
window.vote = function vote(id, choice) {
  var pet = petCon.at(control.hasAddressPetiReg.call(id));
  var maxVotes = parseInt(control.balanceOfToken.call(id, web3.eth.defaultAccount));
  let pwd = document.getElementById('voting_pwd').value;
  let num = document.getElementById('voting_num').value;

  if (web3.eth.defaultAccount == null) {
    document.getElementById('vote-error-out').innerText = "You need to login";
    return;
  }
  if (num <= 0) {
    document.getElementById('vote-error-out').innerText = "Number cannot be 0 or negativ";
    return;
  }
  if (num > maxVotes) {
    document.getElementById('vote-error-out').innerText = "You don't have enough tokens";
    return;
  }
  if (!web3.personal.unlockAccount(web3.eth.defaultAccount, pwd)) {
    document.getElementById('vote-error-out').innerText = "Wrong password!";
    return;
  }

  web3.personal.unlockAccount(web3.eth.defaultAccount, pwd);
  pet.vote(choice, num, {from: web3.eth.defaultAccount});

  //update Voting Page
  goToVoting(id);
  return;
}


//-----------------------transfer token of selected petition------------------------
window.transfer = function transfer(id) {
  var pet = petCon.at(control.hasAddressPetiReg.call(id));
  var token = tokenCon.at(pet.votingToken());
  var maxVotes = parseInt(control.balanceOfToken.call(id, web3.eth.defaultAccount));
  let pwd = document.getElementById('transfer_pwd').value;
  let num = document.getElementById('transfer_num').value;
  let rec = document.getElementById('transfer_recipient').value.toLowerCase();

  if (web3.eth.defaultAccount == null) {
    document.getElementById('vote-error-out').innerText = "You need to login";
    return;
  }
  if (!web3.isAddress(rec)) {
    document.getElementById('vote-error-out').innerText = "Not a valid address";
    return;
  }
  if (web3.eth.accounts.indexOf(rec) < 0) {
    document.getElementById("vote-error-out").innerText = "Given address is not a registered account!";
    return;
  }
  if (num <= 0) {
    document.getElementById('vote-error-out').innerText = "Number cannot be 0 or negativ";
    return;
  }
  if (num > maxVotes) {
    document.getElementById('vote-error-out').innerText = "You don't have enough tokens";
    return;
  }
  if (!web3.personal.unlockAccount(web3.eth.defaultAccount, pwd)) {
    document.getElementById('vote-error-out').innerText = "Wrong password!";
    return;
  }

  //unlocked by password check
  token.transfer(rec, num);

  //update voting page
  goToVoting(id);
}


//___________________Creating Petitions___________________
//-------------------------User creates Petition which gets queried to await confirmation--------------------
window.createPetition = function createPetition() {
  document.getElementById('petition-error-out').innerText = "";

  var _title = document.getElementById('crpe-title').value;
  var _description = document.getElementById('crpe-description').value;
  var _startTime = document.getElementById('crpe-starttime').value;
  var _endTime = document.getElementById('crpe-endtime').value;
  var _num = document.getElementById('crpe-num').value;

  // exceptions. empty values are not allowed etc.
  if (web3.eth.defaultAccount == null) {
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
  var currTime = new Date();
  if (Date.parse(_startTime) < currTime.getTime()) {
    document.getElementById('petition-error-out').innerText = "StartTime must be in the future";
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
  if (_num <= 0) {
    document.getElementById('petition-error-out').innerText = "Token Number must be greater than 0";
    return;
  }

  //query User input in html table on admin page for confirmation by authority
  var table = document.getElementById('petitionsToConfirm');
  var row = table.insertRow(table.rows.length);
  var c0 = row.insertCell(0);
  var c1 = row.insertCell(1);
  var c2 = row.insertCell(2);
  var c3 = row.insertCell(3);
  var c4 = row.insertCell(4);
  var c5 = row.insertCell(5);

  c0.innerText = _title;
  c1.innerText = _description;
  c2.innerText = _startTime;
  c3.innerText = _endTime;
  c4.innerText = _num;
  var row_index = (table.rows.length - 1);
  c5.innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="confirmPetition(' + row_index + ')">Accept</button> <button type="button" class="btn btn-primary btn-sm" onclick="rejectPetition(' + row_index + ')">Reject</button>';
}

//-------------------------Reject Petition (Authority only)-------------------------
window.rejectPetition = function rejectPetition(index) {
  if (!control.isAuth.call(web3.eth.defaultAccount)) {
    document.getElementById('admin-error-out').innerText = "You're not allowed to accept or reject pending Petitions";
    return;
  }
  let pwd = document.getElementById('accpetPwd').value
  if (!web3.personal.unlockAccount(web3.eth.defaultAccount, pwd)) {
    document.getElementById('admin-error-out').innerText = "Wrong password!";
    return;
  }
  var table = document.getElementById('petitionsToConfirm');
  table.deleteRow(index);
  while (index < table.rows.length) {
    table.rows[index].cells[5].innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="confirmPetition(' + index + ')">Accept</button> <button type="button" class="btn btn-primary btn-sm" onclick="rejectPetition(' + index + ')">Reject</button>';
    index += 1;
  }
}

//-------------------------confirm Petition (Authority only)-------------------------
//------------------------------triggers token and petition deployement--------------
window.confirmPetition = function confirmPetition(index) {
  document.getElementById('admin-error-out').innerText = "";
  if (!control.isAuth.call(web3.eth.defaultAccount)) {
    document.getElementById('admin-error-out').innerText = "You're not allowed to accept or reject pending Petitions";
    return;
  }
  let pwd = document.getElementById('accpetPwd').value
  if (!web3.personal.unlockAccount(web3.eth.defaultAccount, pwd)) {
    document.getElementById('admin-error-out').innerText = "Wrong password!";
    return;
  }

  var table = document.getElementById('petitionsToConfirm');
  var row = table.rows[index];
  var title = row.cells[0].innerText;
  var description = row.cells[1].innerText;
  var startTime = new BigNumber(Date.parse(row.cells[2].innerText));
  var endTime = new BigNumber(Date.parse(row.cells[3].innerText));
  var numInitialTokens = row.cells[4].innerText;

  //ID given by petition registry
  var id = parseInt(control.countPetiReg.call());

  //call function for deploying token and petition. Seperated for readability
  deployTokenNPetition(pwd, id, title, description, startTime, endTime, numInitialTokens);

  //update petitions to confirm
  table.deleteRow(index);
  while (index < table.rows.length) {
    table.rows[index].cells[5].innerHTML = '<button type="button" class="btn btn-primary btn-sm" onclick="confirmPetition(' + index + ')">Accept</button> <button type="button" class="btn btn-primary btn-sm" onclick="rejectPetition(' + index + ')">Reject</button>';
    index += 1;
  }
}

//------------------------Deploy Token and call deployPetition after successfully deployed------------
function deployTokenNPetition(_pwd, _id, _title, _description, _startTime, _endTime, _numInitialTokens) {
  var tokenGasEstimate = web3.eth.estimateGas({data: tokenBytecode});
  web3.personal.unlockAccount(web3.eth.defaultAccount, _pwd);
  var tokenInstance = tokenCon.new(
    {
      data: tokenBytecode,
      gas: tokenGasEstimate,
      from: web3.eth.defaultAccount
    }, function(err, tmpContract){
      if(!err) {
        if(!tmpContract.address) {
          console.log('Token-Transaction-Hash:' + tmpContract.transactionHash) // The hash of the transaction, which deploys the contract
        } else {
          //this section is triggered after successfully deploying the contract
          //placed here because it would cause an error if initialisation or petition deployement is called to soon
          tokenInstance = tmpContract;
          console.log('Token-Address:' + tmpContract.address) // the contract address
          web3.personal.unlockAccount(web3.eth.defaultAccount, _pwd);
          tokenInstance.init(web3.eth.accounts, _numInitialTokens, {from: web3.eth.defaultAccount});
          deployPetition(_pwd, _id, _title, _description, _startTime, _endTime, tokenInstance.address);
        }
      } else {
        console.log(err);
      }
    }
  );
}

//------------------------Deploy Petition after Token Deployement------------
function deployPetition(_pwd, _id, _title, _description, _startTime, _endTime, _tokenAddress) {
  var petitionGasEstimate = web3.eth.estimateGas({data: petitionBytecode});

  web3.personal.unlockAccount(web3.eth.defaultAccount, _pwd);
  var pet = petCon.new(
    {
      from: web3.eth.defaultAccount,
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
          web3.personal.unlockAccount(web3.eth.defaultAccount, _pwd);
          pet.init(_id, _title, _description, _startTime.toString(), _endTime.toString(), _tokenAddress);

          //append to PetitionRegister
          web3.personal.unlockAccount(web3.eth.defaultAccount, _pwd);
          control.insertPetiReg(pet.address);
        }
      } else {
        console.log(err);
      }
    }
  );
}

//___________________Account Management Functions____________________
//-------------------------Login-------------------------
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
  //test if account is registered (only accounts registered on the node can be checked at this state)
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
    web3.eth.defaultAccount = accId;
    listPetitions();
    document.getElementById('coinbase').innerText = accId;
    document.getElementById("menu-login").innerHTML = "<a href='#' onclick='logout()'><span class='glyphicon glyphicon-log-in'></span> Logout</a>";
    accId = "";
    document.getElementById("login-success-out").innerText = "Successfully logged in";
    document.getElementById("butten-login").disabled = true;
    navToPage("page-Home");
  }
}

//-------------------------Logout-------------------------
window.logout = function logout() {
  web3.eth.defaultAccount = undefined;
  //update account specific html contents to empty
  listPetitions();
  document.getElementById('coinbase').innerText = web3.eth.defaultAccount;
  document.getElementById("login-success-out").innerText = "";
  document.getElementById("butten-login").disabled = false;
  document.getElementById("signup-credential-out").innerHTML = "";
  document.getElementById("butten-signup").disabled = false;
  document.getElementById('admin-error-out').innerText = "";
  var tmpstr = '"page-login"';
  document.getElementById("menu-login").innerHTML = "<a href='#' onclick='navToPage(" + tmpstr + ")'><span class='glyphicon glyphicon-log-in'></span> Login</a>";
  navToPage("page-Home");
}

//-------------------------SignUp-------------------------
window.signup = function signup() {
  document.getElementById("signup-error-out").innerText = "";
  document.getElementById("signup-success-out").innerText = "";
  let accPwd = document.getElementById('newPassword').value;
  let accAddr;
  if (accPwd.length <= 0) {
    document.getElementById("signup-error-out").innerText = "Password cannot be empty!";
    return;
  } else {
    //create Account
    accAddr = web3.personal.newAccount(accPwd);
    //set default Account to the newly created one
    web3.eth.defaultAccount = accAddr;
    web3.personal.unlockAccount(web3.eth.defaultAccount, accPwd);
    control.insertUser(accAddr); //not really in use.
    //delete password value afterwards
    document.getElementById("newPassword").value = "";
    accPwd="";
    //update account specific html contents
    listPetitions();
    document.getElementById("signup-credential-out").innerHTML = "The address of your new account is: <strong>" + accAddr + "</strong>";
    document.getElementById("butten-signup").disabled = true;
    document.getElementById('coinbase').innerText = web3.eth.defaultAccount;
    document.getElementById("menu-login").innerHTML = "<a href='#' onclick='logout()'><span class='glyphicon glyphicon-log-in'></span> Logout</a>";
  }
}


//___________________Page Navigation Function____________________
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
  //delete input values e.g. passwords
  var inpelems = document.getElementsByClassName("inpElem");
  for (var i = 0; i < inpelems.length; i++) {
    inpelems[i].value = "";
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
