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

TODO: Describe the installation process
## Usage
To use the Dapp simple start parity and navigate to the dapp.
- In case XMLHttpRequest fails to connect, use parity with this option: `--rpccorsdomain "*"`
- changes and programming is made in app/ and contracts/
- use `webpack` to update build-version after you saved your changes

TODO: Write usage instructions
## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## History
TODO: Write history
## Credits
TODO: Write credits
## License
TODO: Write license
