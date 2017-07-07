# PetiChain
PetiChain uses the ethereum blockchain to create petitions and votings which are then immutable.
## Installation
Installation process for the use with parity on Linux:
```
git clone https://github.com/blc-psi/PetiChain.git petichain
cd petichain
npm i -g webpack
./init.sh
ln -s $PWD/build/ $HOME/.local/share/io.parity.ethereum/dapps/PetiChain
```

## Usage
To use the Dapp simple start parity and navigate to the dapp.
- In case XMLHttpRequest fails to connect, use parity with this option: `--rpccorsdomain "*"`
- changes and programming is made in app/ and contracts/
- use `webpack` to update build-version after you saved your changes

## Contributing
1. See Installation
2. Programming is done in app/ and contracts/
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin`
