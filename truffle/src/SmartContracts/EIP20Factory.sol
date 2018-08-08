import "./ChiToken.sol";

pragma solidity ^0.4.21;

//this is the factory that ConsenSys uses for their token

contract EIP20Factory {

    mapping(address => address[]) public created;
    mapping(address => bool) public isEIP20; 
    bytes public EIP20ByteCode; 

    function EIP20Factory() public {
        //upon creation of the factory, deploy a ChiToken
        address verifiedToken = createEIP20(10000, "Verify Token", 3, "ChiToken");
        EIP20ByteCode = codeAt(verifiedToken);
    }

    //verifies if a contract that has been deployed is a Human Standard Token.
    //NOTE: This is a very expensive function, and should only be used in an eth_call. ~800k gas
    function verifyEIP20(address _tokenContract) public view returns (bool) {
        bytes memory fetchedTokenByteCode = codeAt(_tokenContract);

        if (fetchedTokenByteCode.length != EIP20ByteCode.length) {
            return false; //clear mismatch
        }

      //starting iterating through it if lengths match
        for (uint i = 0; i < fetchedTokenByteCode.length; i++) {
            if (fetchedTokenByteCode[i] != EIP20ByteCode[i]) {
                return false;
            }
        }
        return true;
    }

    function createChiToken(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol)
        public
    returns (address) {

        ChiToken newToken = (new ChiToken(_initialAmount, _name, _decimals, _symbol));
        created[msg.sender].push(address(newToken));
        isChiToken[address(newToken)] = true;
        
        newToken.transfer(msg.sender, _initialAmount);
        return address(newToken);
    }

    //Needs to be changed for live contracts
    
    function codeAt(address _addr) internal view returns (bytes outputCode) {
        assembly {
            // retrieve the size of the code, this needs assembly
            let size := extcodesize(_addr)
            // allocate output byte array - this could also be done without assembly
            // by using outputCode = new bytes(size)
            outputCode := mload(0x40)
            // new "memory end" including padding
            mstore(0x40, add(outputCode, and(add(add(size, 0x20), 0x1f), not(0x1f))))
            // store length in memory
            mstore(outputCode, size)
            // actually retrieve the code, this needs assembly
            extcodecopy(_addr, add(outputCode, 0x20), 0, size)
        }
    }
}
