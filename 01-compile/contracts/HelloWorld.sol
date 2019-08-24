pragma solidity >0.4.15;

contract HelloWorld{
  address owner;
  string greeting = "Hello World";

  function greet() public view returns(string memory) {
    return greeting;
  }

  function kill() public {
    require(owner == msg.sender, "Owner's right!");
    selfdestruct(msg.sender);
  }
}