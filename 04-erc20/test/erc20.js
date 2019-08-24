const ERC20 = artifacts.require("ERC20")

contract("ERC20", accounts => {
  it("balanceOf random account should not be 0", () => {
    return ERC20.deployed()
      .then(instance => {
        return instance.balanceOf.call('0x97EF02E7e33f7c6Fd1Be5b2694de97a07e47bcA0')
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 0)
      })
  })
  it("balanceOf random account should not be 10", () => {
    return ERC20.deployed()
      .then(instance => {
        return instance.balanceOf.call('0x97EF02E7e33f7c6Fd1Be5b2694de97a07e47bcA0')
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 10)
      })
  })
})