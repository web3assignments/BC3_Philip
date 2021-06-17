// SPDX-License-Identifier:	AFL-3.0
pragma solidity ^0.6.0;
import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";
// import "https://raw.githubusercontent.com/provable-things/ethereum-api/master/provableAPI_0.6.sol"


contract UserContract is usingProvable{
  
  event NewUser(uint userId, string name);

  //Provable variables
  string  public temp;
  uint256 public priceOfUrl;
  constructor() public payable {}
  
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

  function __callback(bytes32 /* myid prevent warning*/ , string memory result ) override public {
       if (msg.sender != provable_cbAddress()) revert();
       temp = result;
   }

   function requestTemp() public payable {
       priceOfUrl = provable_getPrice("URL");
       require (address(this).balance >= priceOfUrl,
            "please add some ETH to cover for the query fee");
       provable_query("URL", 
            "json(http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam).liveweer[0].temp");
   }

   function getTemp() public view returns (string memory) {
       return temp;
   }
      
}
