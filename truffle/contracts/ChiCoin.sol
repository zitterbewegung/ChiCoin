pragma solidity ^0.4.2;


import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract ChiCoin is StandardToken {

  string public constant name = "ChiCoin"; // solium-disable-line uppercase
  string public constant symbol = "CHI"; // solium-disable-line uppercase
  uint8 public constant decimals = 2; // solium-disable-line uppercase

  uint256 public constant INITIAL_SUPPLY = 9882634;

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
  }

}
