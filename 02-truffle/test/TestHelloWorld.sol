pragma solidity >=0.4.22 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HelloWorld.sol";

contract TestHelloWorld {

  function testGetNum() public {
    HelloWorld hello = HelloWorld(DeployedAddresses.HelloWorld());
    Assert.equal(hello.getNum(), uint(8), 'getNum should return 8');
  }
}
