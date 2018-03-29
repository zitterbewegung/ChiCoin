pragma solidity ^0.4.4;

contract Mortal {
	address public owner;
	string public ownerName;

	function Mortal(string name) public {
		owner = msg.sender;
		ownerName = name;
	}

	modifier onlyOwner {
		require(msg.sender == owner);
		_;
	}

	function kill() onlyOwner public {
		selfdestruct(owner);
	}
    
    function GetOwnerName() public view returns (string) {
        return ownerName;
    }
}