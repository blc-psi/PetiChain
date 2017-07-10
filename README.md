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
To use the Dapp simple start parity and navigate to the dapp.
-Run parity with following options: `parity --chain dev --rpccorsdomain "*" --jsonrpc-apis web3,eth,net,parity,parity_accounts,rpc,personal`
- change --chain if you want to
- register contract must be deployed manually once in the beginning (and every time it is changed)
<!-- - In case XMLHttpRequest fails to connect, use parity with this option: `--rpccorsdomain "*"`
- for use of personal API use option `--jsonrpc-api personal` -->
- changes and programming is made in app/ and contracts/
- use `webpack` to update build-version after you saved your changes
- with `webpack --watch` the build-version is automatically updated when a file is changed and saved

## Contributing
1. See Installation
2. Programming is done in app/ and contracts/
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin`
