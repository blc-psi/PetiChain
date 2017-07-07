pragma solidity ^0.4.2;


contract Register {
    
    /* array that maps IDs to addresses */
    mapping (uint32 => address) public hasAddress;
    
    /* insert a new pair of ID and address into the register */
    function insert(uint32 _id, address _address) {
        if(hasAddress[_id] == 0) {
            hasAddress[_id] = _address;
        } else {
            throw;
        }
    }
    
    /* remove a pair of ID and address from the register */
    function remove(uint32 _id) {
        hasAddress[_id] = 0;
    }
    
    /* check whether an ID is already registered */
    function check(uint32 _id) public returns (bool contained){
        if(hasAddress[_id] == 0) {
            return false;
        } else {
            return true;
        }
    }
}
