pragma solidity ^0.4.2;


contract Token {
    /* array with all balances */
    mapping (address => uint256) public balanceOf;
    
    function setBalance(address _to, uint256 _amount) {
        balanceOf[_to] = _amount;
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
    }
}


contract Petition {
    uint32 public id; // unique id of this petition
    string public description; // text describing the topic of the petition
    uint32 public startTime; // start time of the petition, use YYYYMMDDHHMMSS format
    uint32 public endTime; // end time of the petition, use YYYYMMDDHHMMSS format
    bool public status; // status of the petition (true = open, false = closed)
    uint[3] private votes; // storage for decisions (0 = yes, 1 = no, 2 = maybe)
    Token public votingToken; // token that is used for this petition
    
    function petition(
        uint32 _id,
        string _description,
        uint32 _startTime,
        uint32 _endTime,
        bool _status,
        Token _votingToken
    ) {
        id = _id;
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
    
    function setStatus(bool _status) {
        status = _status;
    }
    
    /* associates an existing token with this petition */
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
