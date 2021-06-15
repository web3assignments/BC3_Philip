// SPDX-License-Identifier:	AFL-3.0
pragma solidity >=0.5.0;

contract UserContract{
  
  event NewUser(uint userId, string name);
  
  struct User{
    string name;
  }
  User[] public users;
  mapping(string => bool) _userExists;
  
  // to create a new user
  function createUser(string memory _name) public{
    // requires unique name in order to execute the following code
    require(!_userExists[_name]);
    // user will be added to the users array
    users.push(User(_name));
    // user.push(); doesnot return int anymore
    uint id = users.length - 1;
    emit NewUser(id, _name);
    // gives value true to name in the mapping
    _userExists[_name] = true;
  }
  
  // to read the information of the user by giving the id
  function readUser(uint _id) view public returns(string memory){
    return users[_id].name;    
  }
  
  // to update the name of the user
  function updateUser(uint _id, string memory _name) public{
      // requires unique name in order to execute the following code
    require(!_userExists[_name]);
    _userExists[users[_id].name] = false;
    users[_id].name = _name;
    _userExists[_name] = true;
  }
  
  // to remove the user
  function removeUser(uint _id) public{
   _userExists[users[_id].name] = false;
   delete users[_id];
  }
      
}