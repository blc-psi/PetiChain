pragma solidity ^0.4.2;


contract Token {
    /* array with all balances */
    mapping (address => uint256) public balanceOf;
    /* counts total number of tokens. CAUTION, CAN OVERFLOW! */
    uint256 public numTokens;
    
    /* initialises all addresses to the given amount of tokens */
    function Token(address[] _address, uint256 _amount) {
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
        if (balanceOf[msg.sender] < _value) { throw; } // check if sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) { throw; } // check overflow
        balanceOf[msg.sender] -= _value; // subtract from sender
        balanceOf[_to] += _value; // add to recipient
    }

    /* removes one token from the address specified */
    function remove(address _from, uint256 _value) {
        if (balanceOf[_from] < _value) { throw; } // check if _from has enough
        balanceOf[_from] -= _value; // subtract from sender
        numTokens -= _value;
    }
}


contract Petition {
    uint32 public id; // unique id of this petition
    string public title; // short title describing the petition
    string public description; // text describing the topic of the petition
    uint32 public startTime; // start time of the petition, UNIX time format
    uint32 public endTime; // end time of the petition, UNIX time format
    string public startTimeTest; // start time of the petition, test variable
    string public endTimeTest; // start time of the petition, test variable
    bool public status; // status of the petition (true = open, false = closed)
    uint[3] private votes; // storage for decisions (0 = yes, 1 = no, 2 = maybe)
    Token public votingToken; // token that is used for this petition

    function Petition(
        uint32 _id,
        string _title,
        string _description,
        uint32 _startTime,
        uint32 _endTime,
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

    function setId(uint32 _id) {
        if (status) { throw; } // allow only if petition is closed
        id = _id;
    }

    function setTitle(string _title) {
        if (status) { throw; } // allow only if petition is closed
        title = _title;
    }

    function setDescription(string _description) {
        if (status) { throw; } // allow only if petition is closed
        description = _description;
    }

    function setStartTime(uint32 _startTime) {
        if (status) { throw; } // allow only if petition is closed
        startTime = _startTime;
    }

    function setEndTime(uint32 _endTime) {
        if (status) { throw; } // allow only if petition is closed
        endTime = _endTime;
    }
    
    function setStartTimeTest(string _startTimeTest) {
        if (status) { throw; } // allow only if petition is closed
        startTimeTest = _startTimeTest;
    }

    function setEndTimeTest(string _endTimeTest) {
        if (status) { throw; } // allow only if petition is closed
        endTimeTest = _endTimeTest;
    }
    
    /*  set the status of the petition (true = open, false = closed) */
    function setStatus(bool _status) {
        status = _status;
    }

    /* associates an existing token with this petition
       takes the address of a deployed token contract as argument */
    function setToken(Token _votingToken) {
        if (status) { throw; } // allow only if petition is closed
        votingToken = _votingToken;
    }

    /* count one new vote (0 = yes, 1 = no, 2 = maybe) */
    function vote(uint8 _choice) {
        if (!status) { throw; } // allow only if petition is open
        if (_choice < 0 || _choice > 2) { throw; } // allow only valid choices
        // allow only if sender has at least one token that can be removed
        if (votingToken.balanceOf(msg.sender) < 1) {
            throw;
        } else {
            votingToken.remove(msg.sender, 1);
        }
        votes[_choice]++; // increment vote count for chosen option
    }

    /* returns the stored decisions (0 = yes, 1 = no, 2 = maybe) */
    function evaluate() returns (uint[3]) {
        return votes;
    }
}
