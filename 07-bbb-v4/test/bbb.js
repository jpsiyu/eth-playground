const BN = require('bignumber.js')
const BBB = artifacts.require("TokenBeiBaoBi")

contract('BBB', accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]
  const someoneC = accounts[4]

  describe('initialize', () => {
    let ins
    before(() => {
      return BBB.deployed()
        .then(_ins => {
          ins = _ins
        })
    })
    it("Every account should has balance 0 after deployed!", () => {
      const r = Math.floor(Math.random() * accounts.length)
      return ins.balanceOf(accounts[r])
        .then(balance => {
          assert.equal(balance.valueOf(), 0)
        })
    })
  })

  describe('loadUserAmount', () => {
    let ins
    before(() => {
      return BBB.deployed()
        .then(_ins => {
          ins = _ins
        })
    })
    it('Only owner can call loadUserAmount', () => {
      const amount = 100
      return ins.loadUserAmount(someoneA, amount)
        .then(() => {
          return ins.balanceOf(someoneA)
        })
        .then(balance => {
          assert.equal(balance, amount)
        })
    })
    it('load multi user amount', () => {
      let instance
      let amountB = 10
      let amountC = 20
      return BBB.deployed()
        .then(_instance => {
          instance = _instance
        })
        .then(() => {
          return instance.loadOldTokenUserAmount([someoneB, someoneC], [amountB, amountC])
        })
        .then((res) => {
          return Promise.all([
            instance.balanceOf.call(someoneB),
            instance.balanceOf.call(someoneC),
          ])
        })
        .then(res => {
          const [balanceOfB, balanceOfC] = res
          //console.log('balance:', BN(balanceOfB).toNumber())
          assert.equal(balanceOfB, amountB)
          assert.equal(balanceOfC, amountC)
        })
    })
  })
})
