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

	struct LeaderboardItem {
		bytes32 nick;
		uint clickTime;
	}

	LeaderboardItem[] clicksHistory;
	mapping (address => uint) clicksTotal;
	
	event ClicksUpdated(
		bytes32 nick,
		uint clicks
	);

	function sendClick() public {
		LeaderboardItem memory item = LeaderboardItem(members[msg.sender], now);
		clicksHistory.push(item);
		
		clicksTotal[msg.sender]++;

		ClicksUpdated(members[msg.sender], clicksTotal[msg.sender]);
		//return (item, clicksTotal[msg.sender]);
	}

	// function leaderboards() public returns (bytes32[], uint[]) {		
    // 	bytes32[] memory retNicks = new bytes32[](10);
    // 	uint[] memory retClicks = new uint[](10);

	// 	var index = clicks.length - 10;
	// 	if (index < 0) {
	// 		index = 0;
	// 	}
	// 	for (; index < clicks.length; index++) {
	// 		var something = clicks[index].nick;

	// 		retNicks.push(something);
	// 		retClicks.push(clicks[index].clicktime);
	// 	}

	// 	return (retNicks, retClicks);
	// }
	
	/*
	function adminAdd() {
	}

	function adminRemove() {
	}

	function setupMeeting() {
	}

	function checkIn(uint meetingId) {		
	}

	function checkOut(uint meetingId) {
	}

	function distribute(uint meetingId) {
	}
	*/
	
	// code changes for Meetup
	function testSomething() public constant returns (string something) {
	    return "something";
	}
}