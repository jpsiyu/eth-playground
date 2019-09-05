const BN = require('bignumber.js')
const vmerror = require('../lib/vmerror.js')
const BBB = artifacts.require("TokenBeiBaoBi")

contract('BBB', accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]
  const someoneC = accounts[4]
  const someoneD = accounts[5]

  describe('Initialize', () => {
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

  describe('LoadUserAmount', () => {
    let ins
    before(() => {
      return BBB.deployed()
        .then(_ins => {
          ins = _ins
        })
    })
    it('Load one user amount', () => {
      const amount = 100
      return ins.loadUserAmount(someoneA, amount)
        .then(() => {
          return ins.balanceOf(someoneA)
        })
        .then(balance => {
          assert.equal(balance, amount)
        })
    })
    it('Load multi user amount', () => {
      let amountB = 10
      let amountC = 20
      return ins.loadOldTokenUserAmount([someoneB, someoneC], [amountB, amountC])
        .then(() => {
          return Promise.all([
            ins.balanceOf.call(someoneB),
            ins.balanceOf.call(someoneC),
          ])
        })
        .then(res => {
          const [balanceOfB, balanceOfC] = res
          //console.log('balance:', BN(balanceOfB).toNumber())
          assert.equal(balanceOfB, amountB)
          assert.equal(balanceOfC, amountC)
        })
    })
    it('Only owner can load user amount', () => {
      return ins.loadUserAmount(someoneA, 10, { from: admin })
        .catch(err => {
          assert(err.message.startsWith(vmerror.head(vmerror.ErrType.revert)))
        })
    })
  })

  describe('MotivateTeam', () => {
    let ins
    before(() => {
      return BBB.deployed()
        .then(_ins => {
          ins = _ins
        })
    })
    it('Max motivate amount', () => {
      //const amount =  BN(100000000 * 1e18).toString()
      const amount = 100000000
      return ins.motivateTeam(0, someoneD, amount)
        .then(() => {
          return ins.balanceOf(someoneD)
        })
        .then(balance => {
          assert.equal(balance, amount)
        })
    })
  })
})
