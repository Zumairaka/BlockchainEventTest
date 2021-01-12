// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EventTest {
    struct user {
        string name;
        uint8 age;
        uint128 phone;
    }
    
    mapping (uint => user) userData;
    
    event notify(uint indexed id, string name);
    
    function setUser(uint id, string memory name, uint8 age, uint128 phone ) public {
        userData[id] = user(name, age, phone);
        emit notify(id, name);
    }
    
    function getUser(uint id) public view returns (uint, string memory name, uint8 age, uint128 phone) {
        name = userData[id].name;
        age = userData[id].age;
        phone = userData[id].phone;
        
        return (id, name, age, phone);
    }
}
