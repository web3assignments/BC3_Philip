// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract User_ERC20_Token is ERC20 {

    /// @dev Constructor that gives _msgSender() all of existing tokens.
    constructor () ERC20("User_Token", "USRT") {
        _mint(msg.sender, 10000 * (10 ** 18));
    }
}