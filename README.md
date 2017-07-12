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
    - if the petition register is not present or you want to use a new one, you have to deploy it manually by using its bytecode and ABI. You can compile the Register.sol code yourself or paste the code in here (https://remix.ethereum.org/).
    - set the `petregAddress` according to the address you get when deployed and mined
2. Set the authority address, which represents the organization which can actually confirm and deploy the petitions given by random users. You can use any account you have access to and change `var authAddr = '0x002dec2D1E355a105bb450273D3Da39d65CFE884';` accordingly.
3. Be aware that you need enough ether/gas to deploy the petitions (and petition register). Also every use needs sufficient gas to vote for a petition.

Run parity with following options: `parity --chain dev --rpccorsdomain "*" --jsonrpc-apis web3,eth,net,parity,parity_accounts,rpc,personal`. Otherwise, parity would block some requests to the blockchain and some web3.js calls wouldn't work. Change the `--chain` option to the one you want to use

## Coding and Contributing
- All programming is done in `/app` and `/contracts`
- To apply changes done in `/app` run `webpack` in the project directory. For continually applying changes when saving files, use `webpack --watch`. You need to reload the webpage afterwards.
- When editing contracts, the according ABI and bytecode parameters in the top section of `app/javascripts/app.js`. Also be aware that you might need to update some function calls in `app.js`
