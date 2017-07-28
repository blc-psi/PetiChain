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
1. Check if a control contract and the according registers have already been deployed to the chain you are using and if its address matches the parameter `var controlAddr = '...';` (line 9) in `app/javascripts/app.js`
    - if the control contract is not present or you want to use a new one and reset the petition-, user- and authority register, you can use the following command inside the directory of the git download: `node newRegAndControl.js *accountAddress* *password*`. After running the script, you will get the contract address which you need to set the parameter to. The specified account will also be the first authority account.
    - if there is an error with deploying the contracts automatically, you can deploy them manually via parity or some other way. You can find the necessary ABIs and Bytecodes for the register and control contracts in the upper section of `newRegAndControl.js`
    - set the `controlAddr` according to the address you get when deployed and mined and add the address to the authority register
2. You will need at least one account which is registered in the authority register to be able to deploy petitions. Ask the owner of the specified control contract to add your account to the list. If you created your own authority register, your account is added automatically. Any other account must be inserted via the `insert(*address*)` function of the authority contract by someone who's already registered.
3. Be aware that you need enough ether/gas to deploy the petitions (and petition register). Also every user needs sufficient gas to vote for a petition.

Run parity with following options:
`parity --chain dev --rpccorsdomain "*" --jsonrpc-apis web3,eth,net,parity,parity_accounts,rpc,personal`
Otherwise, parity would block some requests to the blockchain and some web3.js calls wouldn't work. Change the `--chain` option to the one you want to use.

## Coding and Contributing
- All programming is done in `/app` and `/contracts`
- To apply changes done in `/app` run `webpack` in the project directory. For continually applying changes when saving files, use `webpack --watch`. You need to reload the webpage afterwards.
- When editing contracts, the according ABI and bytecode parameters in the top section of `app/javascripts/app.js` need to be updated. Also be aware that you might need to update some function calls in `app.js`
