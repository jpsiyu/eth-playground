pragma solidity >=0.4.0 <0.6.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./TokenBBB.24.new.run.sol";

// file name has to end with '_test.sol'
contract test_1 {
    TokenBeiBaoBi $;
    function beforeAll() public {
        address owner = address(0xca35b7d915458ef540ade6068dfe2f44e8fa733c);
        address admin = address(0x14723a09acff6d2a60dcdf7aa4aff308fddc160c);
        $ = new TokenBeiBaoBi(owner, admin);
    }

    function check1() public {
        // use 'Assert' to test the contract
        Assert.equal(uint(2), uint(1), "error message");
        Assert.equal(uint(2), uint(2), "error message");
    }

}