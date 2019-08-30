const BBB = artifacts.require("TokenBeiBaoBi")

contract("BBB", accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someone = accounts[2]

  it("first account should be owner", () => {
    return BBB.deployed(owner.admin)
      .then(instance => {
        assert(instance.owner, owner)
      })
  })

  it("balanceOf owner account should not be 47500000e18", () => {
    return BBB.deployed(owner, admin)
      .then(instance => {
        return instance.balanceOf.call(owner)
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 47500000e18)
      })
  })

  it("balanceOf admin account should not be 2500000e18", () => {
    return BBB.deployed(owner, admin)
      .then(instance => {
        return instance.balanceOf.call(admin)
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 2500000e18)
      })
  })
  it("balanceOf random account should not be 0", () => {
    return BBB.deployed(owner, admin)
      .then(instance => {
        return instance.balanceOf.call(someone)
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 0)
      })
  })
})