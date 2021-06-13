pragma solidity ^0.5.6;

contract UserContract{
  
  event NewUser(uint userId, string name);
  
  struct User{
    string name;
  }
  User[] public users;
  mapping(string => bool) _userExists;
  
  // to create a new user
  function create(string memory _name) public{
    // requires unique name in order to execute the following code
    require(!_userExists[_name]);
    // user will be added to the users array
    uint id = users.push(User(_name)) - 1;
    emit NewUser(id, _name);
    // gives value true to name in the mapping
    _userExists[_name] = true;
  }
  
  // to read the information of the user by giving the id
  function read(uint _id) view public returns(string memory){
    return users[_id].name;    
  }
  
  // to update the name of the user
  function update(uint _id, string memory _name) public{
      // requires unique name in order to execute the following code
    require(!_userExists[_name]);
    _userExists[users[_id].name] = false;
    users[_id].name = _name;
    _userExists[_name] = true;
  }
  
  // to remove the user
  function remove(uint _id) public{
   _userExists[users[_id].name] = false;
   delete users[_id];
  }
      
}