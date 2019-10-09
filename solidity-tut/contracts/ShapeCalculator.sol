pragma solidity >= 0.4.0 <0.6.0;

contract ShapeCalculator{
  function rectangle(uint w, uint h) public pure returns(uint s, uint p){
    s = w * h;
    p = 2 * ( w + h);  
  }
}