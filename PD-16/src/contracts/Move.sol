pragma solidity 0.5.0;

import "./ERC721Full.sol";
/**
 * The Move contract is an implementation of the ERC721
 */
contract Move is ERC721Full {

	// array that keeps track of the tokens 
	string[] public moves; 
	// mapping that keeps track of the token exists
	mapping(string => bool) _moveExists;

	// passing name and symbol in constructor
	constructor() ERC721Full("Move", "MOVE") public {
	}

	// e.g. move = "1000xc30Ec9b5bd2e7433C12C3c8FFc875b1eA80347C1"
  	// unique move exists of a token value and a public key of the user
  	function mint(string memory _move) public {
  	  // require uniqe move (require = false => nothing happens in this function)
   	  require(!_moveExists[_move]);
   	  // add move to the array
   	  uint _id = moves.push(_move);
   	  // call mint function in ERC721Full
      _mint(msg.sender, _id);
      // gives value true for move in the mapping
      _moveExists[_move] = true;
  }
	
}
