pragma solidity ^0.4.2;
/* @author Leonhard Wank
   This is a prototype trying to show how voting on petitions can be realised
   in Ethereum. All contracts are combined in this single file "PetiChain.sol"
   because this makes development much easier. May contain errors. */


/* ###############     TOKEN     ############### */


contract Token {
    /* array with all balances */
    mapping (address => uint256) public balanceOf;
    /* counts total number of tokens. CAUTION, CAN OVERFLOW! */
    uint256 public numTokens;

    /* initialises all addresses to the given amount of tokens
       WARNING: takes address[2**20] as argument (technical issue),
                dynamic array would be preferred */
    function init(address[] _address, uint256 _amount) {
        uint i = 0;
        while(i < _address.length) {
            balanceOf[_address[i]] = _amount;
            i++;
        }
        numTokens += _amount * _address.length;
    }

    function setBalance(address _to, uint256 _amount) {
        uint256 t = balanceOf[_to];
        balanceOf[_to] = _amount;
        numTokens = numTokens - t + _amount;
    }

    /* moves the value from the sender's account to the recipient' */
    function transfer(address _to, uint256 _value) public {
        // check if sender has enough
        if (balanceOf[msg.sender] < _value) { revert(); }
        // check overflow
        if (balanceOf[_to] + _value < balanceOf[_to]) { revert(); }
        // subtract from sender
        balanceOf[msg.sender] -= _value;
        // add to recipient
        balanceOf[_to] += _value;
    }

    /* removes tokens from the address specified */
    function remove(address _from, uint256 _value) {
        if (balanceOf[_from] < _value) { revert(); } // check if _from has enough
        balanceOf[_from] -= _value; // subtract from sender
        numTokens -= _value;
    }
}


/* ###############     PETITION     ############### */


contract Petition {
    uint32 public id; // unique id of this petition
    string public title; // short title describing the petition
    string public description; // text describing the topic of the petition
    string public startTime; // start time of the petition, UNIX time format
    string public endTime; // start time of the petition, UNIX time format
    bool public status; // status of the petition (true = open, false = closed)
    uint[3] private votes; // storage for decisions (0 = yes, 1 = no, 2 = maybe)
    Token public votingToken; // token that is used for this petition

    function Petition(
        uint32 _id,
        string _title,
        string _description,
        string _startTime,
        string _endTime,
        bool _status,
        Token _votingToken
    ) {
        id = _id;
        title = _title;
        description = _description;
        startTime = _startTime;
        endTime = _endTime;
        status = _status;
        votingToken = _votingToken;
    }

    /* initially sets all values and blocks the petition (status = true)  */
    function init(
        uint32 _id,
        string _title,
        string _description,
        string _startTime,
        string _endTime,
        Token _votingToken
    ) {
        id = _id;
        title = _title;
        description = _description;
        startTime = _startTime;
        endTime = _endTime;
        votingToken = _votingToken;
        status = true;
    }
    function setId(uint32 _id) {
        if (status) { revert(); } // allow only if petition is closed
        id = _id;
    }

    function setTitle(string _title) {
        if (status) { revert(); } // allow only if petition is closed
        title = _title;
    }

    function setDescription(string _description) {
        if (status) { revert(); } // allow only if petition is closed
        description = _description;
    }

    function setStartTime(string _startTime) {
        if (status) { revert(); } // allow only if petition is closed
        startTime = _startTime;
    }

    function setEndTime(string _endTime) {
        if (status) { revert(); } // allow only if petition is closed
        endTime = _endTime;
    }

    /*  set the status of the petition (true = open, false = closed) */
    function setStatus(bool _status) {
        status = _status;
    }

    /* associates an existing token with this petition
       takes the address of a deployed token contract as argument */
    function setToken(Token _votingToken) {
        if (status) { revert(); } // allow only if petition is closed
        votingToken = _votingToken;
    }

    /* count one new vote (0 = yes, 1 = no, 2 = maybe) */
    function vote(uint8 _choice, uint8 _numVotes) {
        if (!status) { revert(); } // allow only if petition is open
        if (_choice < 0 || _choice > 2) { revert(); } // allow only valid choices
        // allow if sender has at least numVotes tokens that can be removed
        if (votingToken.balanceOf(msg.sender) < _numVotes) {
            revert();
        } else {
            votingToken.remove(msg.sender, _numVotes);
        }
        votes[_choice] += _numVotes; // increment vote count for chosen option
    }

    /* returns the stored decisions (0 = yes, 1 = no, 2 = maybe) */
    function evaluate() returns (uint[3]) {
        return votes;
    }
}


/* ###############     REGISTER     ############### */


contract Register {
    /* array that maps IDs to addresses */
    mapping (uint32 => address) public hasAddress;
    /* array that checks whether an address was registered */
    mapping (address => bool) public exists;
    uint32 public count; // count all IDs

    /* insert a new address into the register and return the ID */
    function insert(address _address) returns (uint32) {
        if (exists[_address]) {
            revert();
        }
        hasAddress[count] = _address;
        exists[_address] = true;
        return count++;
    }

    /* replace the address for an existing ID  */
    /* WARNING: use the remove function to remove addresses from the register */
    function overrideAddress(uint32 _id, address _address) {
        if(_id <= count) {
            hasAddress[_id] = _address;
        } else {
            revert();
        }
    }

    /* remove a pair of ID and address from the register */
    function remove(uint32 _id) {
        exists[hasAddress[_id]] = false;
        hasAddress[_id] = 0;
    }

    /* check whether an ID is already registered */
    function check(uint32 _id) public returns (bool contained){
        return (_id < count);
    }

    /* returns the addresses that are stored in the register */
    /* WARNING: return array has maximum size of 2**20 (technical issue),
                first empty entry denotes the logical end of the array,
                more than 2**20 addresses cannot be returned */
    function getAllAddr() returns (address[2**20]) {
        uint32 i = 0;
        uint32 j = 0;
        address[2**20] memory allAddr;
        while(i < count) {
            if(hasAddress[i] != 0) {
                allAddr[j] = hasAddress[i];
                j++;
            }
            i++;
        }
        return allAddr;
    }
}


/* ###############     AUTHREGISTER     ############### */


contract AuthRegister {
    /* array that checks whether an address was registered */
    mapping (address => bool) public isAuth;
    uint32 public count; // count all registrations

    modifier onlyAuth {
        require(isAuth[msg.sender]);
        _;
    }

    function AuthRegister() {
        isAuth[msg.sender] = true;
    }

    /* insert a new address into the register and return the current count */
    function insert(address _address) onlyAuth returns (uint32) {
        isAuth[_address] = true;
        return count++;
    }

    /* remove an address from the register */
    function remove(address _address) onlyAuth {
        isAuth[_address] = false;
        count--;
    }
}


/* ###############     CONTROL     ############### */


contract Control {

    /* local variables */

    Register public petiRegister;
    Register public userRegister;
    AuthRegister public authRegister;
    address owner = msg.sender;
    bool initialised = false;

    /* modifiers */

    /* restricts access to the owner */
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /* restricts access to authorised users from the authRegister */
    modifier onlyAuth{
        require(initialised);
        require(authRegister.isAuth(msg.sender));
        _;
    }

    function Control(
      Register _petiRegister,
      Register _userRegister,
      AuthRegister _authRegister
    ) public {
      petiRegister = _petiRegister;
      userRegister = _userRegister;
      authRegister = _authRegister;
      initialised = true;
    }

    /* CONTROL functions below */

    /* takes addresses to already deployed registers as arguments */
    /* WARNING: must be executed before everything else */
    function init(
        Register _petiRegister,
        Register _userRegister,
        AuthRegister _authRegister
    ) public onlyOwner {
        petiRegister = _petiRegister;
        userRegister = _userRegister;
        authRegister = _authRegister;
        initialised = true;
    }

    /* creates new registers */
    /* WARNING: must be executed before everything else */
    function initFull(
    ) public onlyOwner {
        petiRegister = new Register();
        userRegister = new Register();
        authRegister = new AuthRegister();
        initialised = true;
    }

    /* sets up petition and token
       takes an existing petition and token as arguments
       TAKES TOO LONG TO EXECUTE */
    function createPetitionToken(
        uint8 _numVotesPerUser,
        uint32 _idPeti,
        string _titlePeti,
        string _descriptionPeti,
        string _startTimePeti,
        string _endTimePeti,
        address[] _userAddresses,
        Token _myToken,
        Petition _myPetition
    ) public {
        // create token
        Token myToken = _myToken;
        // initialise token
        myToken.init(_userAddresses, _numVotesPerUser);
        // create and initialise petition
        Petition myPetition = _myPetition;
        myPetition.init(
            _idPeti,
            _titlePeti,
            _descriptionPeti,
            _startTimePeti,
            _endTimePeti,
            myToken
        );
        // register petition
        petiRegister.insert(myPetition);
    }

    function getPeti(uint32 _idPeti) public returns (Petition) {
        return Petition(petiRegister.hasAddress(_idPeti));
    }

    function getToken(uint32 _idPeti) public returns (Token) {
        Petition myPeti = getPeti(_idPeti);
        return myPeti.votingToken();
    }

    /* PETITION functions below */

    function setStatusPeti(
        uint32 _idPeti,
        bool _status
    ) public onlyAuth {
        Petition myPeti = getPeti(_idPeti);
        myPeti.setStatus(_status);
    }

    function votePeti(
        uint32 _idPeti,
        uint8 _choice,
        uint8 _numVotes
    ) public {
        Petition myPeti = getPeti(_idPeti);
        myPeti.vote(_choice, _numVotes);
    }

    function evaluatePeti(
        uint32 _idPeti
    ) public returns (uint[3]) {
        Petition myPeti = getPeti(_idPeti);
        return myPeti.evaluate();
    }

    /* TOKEN functions below */

    function balanceOfToken(
        uint32 _idPeti,
        address _address
    ) public returns (uint256) {
        Token myToken = getToken(_idPeti);
        return myToken.balanceOf(_address);
    }

    function numTokens(
        uint32 _idPeti
    ) public returns (uint256) {
        Token myToken = getToken(_idPeti);
        return myToken.numTokens();
    }

    function initToken(
        uint32 _idPeti,
        address[] _address,
        uint256 _amount
    ) public onlyAuth {
        Token myToken = getToken(_idPeti);
        myToken.init(_address, _amount);
    }

    function setBalanceToken(
        uint32 _idPeti,
        address _to,
        uint256 _amount
    ) public onlyAuth {
        Token myToken = getToken(_idPeti);
        myToken.setBalance(_to, _amount);
    }

    function transferToken(
        uint32 _idPeti,
        address _to,
        uint256 _value
    ) public {
        Token myToken = getToken(_idPeti);
        myToken.transfer(_to, _value);
    }

    function removeToken(
        uint32 _idPeti,
        address _from,
        uint256 _value
    ) public onlyAuth {
        Token myToken = getToken(_idPeti);
        myToken.remove(_from, _value);
    }

    /* PETIREGISTER functions below */

      function hasAddressPetiReg(
        uint32 _idPeti
    ) public returns (address) {
        return petiRegister.hasAddress(_idPeti);
    }

    function existsPetiReg(
        address _address
    ) public returns (bool) {
        return petiRegister.exists(_address);
    }

    function countPetiReg(
    ) public returns (uint32) {
        return petiRegister.count();
    }

    function insertPetiReg(
        address _address
    ) public onlyAuth returns (uint32) {
        return petiRegister.insert(_address);
    }

    function overrideAddressPetiReg(
        uint32 _idPeti,
        address _address
    ) public onlyAuth {
        petiRegister.overrideAddress(_idPeti, _address);
    }

    function removePetiReg(
        uint32 _idPeti
    ) public onlyAuth {
        petiRegister.remove(_idPeti);
    }

    function checkPetiReg(
        uint32 _idPeti
    ) public returns (bool) {
        return petiRegister.check(_idPeti);
    }

    function getAllAddrPetiReg(
    ) public returns (address[2**20]) {
        return petiRegister.getAllAddr();
    }

    /* USERREGISTER functions below */

    function hasAddressUser(
        uint32 _idUser
    ) public returns (address) {
        return userRegister.hasAddress(_idUser);
    }

    function existsUser(
        address _address
    ) public returns (bool) {
        return userRegister.exists(_address);
    }

    function countUser(
    ) public returns (uint32) {
        return userRegister.count();
    }

    function insertUser(
        address _address
    ) public onlyAuth returns (uint32) {
        return userRegister.insert(_address);
    }

    function overrideAddressUser(
        uint32 _idUser,
        address _address
    ) public onlyAuth {
        userRegister.overrideAddress(_idUser, _address);
    }

    function removeUser(
        uint32 _idUser
    ) public onlyAuth {
        userRegister.remove(_idUser);
    }

    function checkUser(
        uint32 _idUser
    ) public returns (bool) {
        return userRegister.check(_idUser);
    }

    function getAllAddrUser(
    ) public returns (address[2**20]) {
        return userRegister.getAllAddr();
    }

    /* AUTHREGISTER functions below */

    function isAuth(
        address _address
    ) public returns (bool) {
        return authRegister.isAuth(_address);
    }

    function countAuth(
    ) public returns (uint32) {
        return authRegister.count();
    }

    function insertAuth(
        address _address
    ) public onlyAuth returns (uint32) {
        return authRegister.insert(_address);
    }

    function removeAuth(
        address _address
    ) public onlyAuth {
        authRegister.remove(_address);
    }
}
