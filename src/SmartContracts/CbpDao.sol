pragma solidity ^0.4.4;

contract Mortal {
	address public owner;
	function mortal() public {
		owner = msg.sender;
	}

	modifier onlyOwner {
		require(msg.sender == owner);
		
		_;
	}

	function kill() onlyOwner public {
		selfdestruct(owner);
	}
}

contract CbpDao is Mortal {
	mapping (address => bytes32) members;
	function isMember() public constant returns (bytes32 name) {
		return members[msg.sender];
	}

	function register(bytes32 _name) public {
		/* Disallow double registration... give test tokens
		if (members[msg.sender] != 0) {
			throw("Already registered");
		}
		*/

		// TODO: Check if Nick taken

		members[msg.sender] = _name;
	}
}