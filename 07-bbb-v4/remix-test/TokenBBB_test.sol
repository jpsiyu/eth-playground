pragma solidity >=0.4.0 <0.6.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./TokenBBB.24.new.run.sol";

// file name has to end with '_test.sol'
contract TokenBBB {
  TokenBeiBaoBi $;
  address[] accounts;
  function beforeAll() public {
    accounts = [
      address(0xCA35B7D915458Ef540aee6068dfE2F44E8fa733C),
      address(0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C),
      address(0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB),
      address(0x583031D1113aD414F02576BD6afaBfb302140225),
      address(0xdD870fA1b7C4700F2BD7f44238821C26f7392148)
    ];
    address owner = accounts[0];
    address admin = accounts[1];
    $ = new TokenBeiBaoBi(owner, admin);
  }

  function checkBalance() public {
    uint b = $.balanceOf(accounts[0]);
    Assert.equal(b, 0, "balance not zero");
  }

  function loadUserAmount() public {
    $.loadUserAmount(accounts[0], 100);
    uint b = $.balanceOf(accounts[0]);
    Assert.equal(b, 100, "balance should be 100");
  }
}
