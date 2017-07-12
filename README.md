# PetiChain
PetiChain uses the ethereum blockchain to create petitions and votings which are then immutable.
## Installation
Installation process for the use with parity on Linux:
```
git clone https://github.com/blc-psi/PetiChain.git petichain
cd petichain
npm i -g webpack
./init.sh
webpack
cp app/manifest.json build/
ln -s $PWD/build/ $HOME/.local/share/io.parity.ethereum/dapps/PetiChain
```

## Usage
Before using the Dapp for the first time or on a different chain you need to check and maybe change a few parameters.
1. Check if a petition register has already been uploaded to the chain you are using and if its address matches the parameter `var petregAddress = '0x4C4db10AecB6F2751A6DfaE63ead5839B30a1CcA';` (line 10) in `app/javascripts/app.js`
..- if the petition register is not present or you want to use a new one, you need to upload it manually by using its bytecode and ABI: ```
petregBytecode: 6060604052341561000f57600080fd5b5b61046c8061001f6000396000f30060606040523615610075576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062d84fd81461007a57806306661abd146100a35780632708d68f146100d85780632b1f2f00146101415780638023b10f14610182578063bc902ad2146101ca575b600080fd5b341561008557600080fd5b6100a1600480803563ffffffff16906020019091905050610223565b005b34156100ae57600080fd5b6100b6610285565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b34156100e357600080fd5b6100ff600480803563ffffffff1690602001909190505061029b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561014c57600080fd5b610168600480803563ffffffff169060200190919050506102ce565b604051808215151515815260200191505060405180910390f35b341561018d57600080fd5b6101c8600480803563ffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102fa565b005b34156101d557600080fd5b610201600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061038d565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b60008060008363ffffffff1663ffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600160009054906101000a900463ffffffff1681565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160009054906101000a900463ffffffff1663ffffffff168263ffffffff16111590505b919050565b600160009054906101000a900463ffffffff1663ffffffff168263ffffffff1611151561038357806000808463ffffffff1663ffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610388565b600080fd5b5b5050565b600081600080600160009054906101000a900463ffffffff1663ffffffff1663ffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600081819054906101000a900463ffffffff168092919060010191906101000a81548163ffffffff021916908363ffffffff16021790555090505b9190505600a165627a7a723058207e8421d9428a685156c25262299a3f57be4048bb30fdafd45760e8160c273d080029
petregABI: [{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"hasAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"}],"name":"check","outputs":[{"name":"contained","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"},{"name":"_address","type":"address"}],"name":"overrideAddress","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"insert","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"}]
```
- Run parity with following options: `parity --chain dev --rpccorsdomain "*" --jsonrpc-apis web3,eth,net,parity,parity_accounts,rpc,personal`
- change --chain if you want to
- register contract must be deployed manually once in the beginning (and every time it is changed)
- changes and programming is made in app/ and contracts/
- use `webpack` to update build-version after you saved your changes
- with `webpack --watch` the build-version is automatically updated when a file is changed and saved

## Contributing
1. See Installation
2. Programming is done in app/ and contracts/
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin`


parseInt(pet.evaluate.call()[0])
