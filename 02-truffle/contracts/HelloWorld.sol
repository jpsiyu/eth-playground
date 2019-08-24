pragma solidity >=0.4.21 <0.6.0;

contract HelloWorld{
  address owner;
  string public greeting;

  constructor() public {
    greeting = "Hello World";
  }

  function greet() public view returns(string memory) {
    return greeting;
  }

  function getNum() public pure returns (uint8) {
    return 8;
  }

  function kill() public {
    require(owner == msg.sender, "Owner's right!");
    selfdestruct(msg.sender);
  }
}