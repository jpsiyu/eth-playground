pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GTM is ERC20{
  uint8 public decimals = 18;
  string public name = "GTM Token";
  string public symbol = "GTM";

  constructor () public {
    uint totalSupply = 100000000;
    totalSupply = totalSupply * 10 ** uint256(decimals);
    _mint(msg.sender, totalSupply);
  }
}
