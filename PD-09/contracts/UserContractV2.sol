// SPDX-License-Identifier:	MIT
pragma solidity >=0.5.0;
import "./Initializable.sol";

/// @title A Database for users
/// @author Philip Bouwens
/// @notice You can use this contract for a basic database
/// @dev Contract includes modifier, selfdestruct and natspec comments
contract UserContractV2 is Initializable{
  
  event NewUser(uint userId, string name);
  
  struct User{
    string name;
  }

  User[] public users;
  address public previousAddress;
  mapping(string => bool) _userExists;

  function initialize() public initializer{
    previousAddress = msg.sender;
  }

  // function destroy() public{
  //   selfdestruct(msg.sender);
  // }
  
  /// @notice Create a new user
  /// @dev requires unique name in order to add to the users array and mapp user exists
  /// @param _name The name of the user
  function createUser(string memory _name) public{
    require(!_userExists[_name]);
    users.push(User(_name));
    uint id = users.length - 1;
    emit NewUser(id, _name);
    _userExists[_name] = true;
  }
  
  /// @notice Returns the name of the user by id
  /// @dev Returns only a the name
  /// @param _id The id of the user
  function readUser(uint _id) view public returns(string memory){
    return users[_id].name;    
  }
  
  /// @notice Updates the name of the user by id
  /// @dev Updates only a the name of the user, requires an unique name
  /// @param _id The id of the user
  /// @param _name The name of the use
  function updateUser(uint _id, string memory _name) public{
    require(!_userExists[_name]);
    _userExists[users[_id].name] = false;
    users[_id].name = _name;
    _userExists[_name] = true;
  }
  
  /// @notice Removes the name of the user by id
  /// @dev Removes only a the name
  /// @param _id The id of the user
  function removeUser(uint _id) public{
   _userExists[users[_id].name] = false;
   delete users[_id];
  }

  modifier onlyBy(address _account) {
      require(msg.sender == _account, "Sender not authorized.");
      _;
  }

  function changePreviousAddress(address _newAddress) public onlyBy(previousAddress) {
        previousAddress = _newAddress;
  }
      
}