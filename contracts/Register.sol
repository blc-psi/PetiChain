pragma solidity ^0.4.2;


contract Register {
    
    /* array that maps IDs to addresses */
    mapping (uint32 => address) public hasAddress;
    uint32 public count; // count all IDs
    
    /* insert a new address into the register and return the ID */
    function insert(address _address) returns (uint32) {
        hasAddress[count] = _address;
        return count++;
    }
    
    /* replace the address for an existing ID  */
    function overrideAddress(uint32 _id, address _address) {
        if(_id <= count) {
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
        return (_id <= count);
    }
}
