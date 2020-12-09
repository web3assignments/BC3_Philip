pragma solidity 0.5.6;

contract UserContract{
  
  struct User{
    string name;
  }
  User[] public users;
  
  // to create a new user
  function create(string memory name) public{
    // user will be added to the users array
    users.push(User(name));
  }
  
  // to read the information of the user by giving the id
  function read(uint id) view public returns(string memory){
    return users[id].name;    
  }
  
  // to update the name of the user
  function update(uint id, string memory name) public{
    users[id].name = name;    
  }
  
  // to remove the user
  function remove(uint id) public{
   delete users[id];
  }
      
}
