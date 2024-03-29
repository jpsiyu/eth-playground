pragma solidity ^0.4.0;
import "./FieldChainCoin.sol";

contract FieldChainCoinCtlContract is Ownable{
    FieldChainCoin facoin;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    mapping (address => bool) accessAllowed;
    constructor(address _dataContractAddr) public {
        facoin = FieldChainCoin(_dataContractAddr);
        accessAllowed[msg.sender] = true;
    }


    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (facoin.getBalance(msg.sender) < amount) return false;

        //facoin.setBalance(msg.sender, facoin.getBalance(msg.sender) - amount);
        facoin.getBalance(msg.sender) - amount;
        //facoin.setBalance(receiver, facoin.getBalance(receiver) + amount);
        facoin.getBalance(receiver) + amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function getBalance(address addr) public view returns(uint) {

        return facoin.getBalance(addr);
    }

    function allowAccess(address _addr) onlyOwner public {
        accessAllowed[_addr] = true;
    }

    function denyAccess(address _addr) onlyOwner public {
        accessAllowed[_addr] = false;
    }
}
