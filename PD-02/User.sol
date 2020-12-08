pragma solidity 0.5.6;

contract User{

  struct User{
    uint id;
    string name;
  }
  User[] public users;
  uint nextId;
  
  // to create a new user
  function create(string memory name) public{
    // user will be added to the users array
    users.push(User(nextId, name));
    nextId++;
  }
  
  // to read the information of the user by giving the id
  function read(uint id) view public returns(uint, string memory){
    for(uint i = 0; i < users.length; i++){
      if(users[i].id == id){
        return(users[i].id, users[i].name);
      }
    }
  }
      
}
