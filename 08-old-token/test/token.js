const BN = require('bignumber.js')
const vmerror = require('../lib/vmerror.js')
const TOKEN = artifacts.require("TokenBNH")

contract('TOKEN', accounts => {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]
  const someoneC = accounts[4]

  let ins
  beforeEach(() => {
    return TOKEN.new(owner, admin)
      .then(_ins => {
        ins = _ins
      })
  })

  describe('Initialize', () => {
    const ownerBalance = '47500000000000000000000000'
    const adminBalance = '2500000000000000000000000'
    //const contractBalance = '950000000000000000000000000'
    //console.log('contract addr', TOKEN.address)
    it(`fter initialize, balance of owner is ${ownerBalance}, balance of admin is ${adminBalance}`, () => {
      return Promise
        .all([
          ins.balanceOf(owner),
          ins.balanceOf(admin),
          //ins.balanceOf(TOKEN.address)
        ])
        .then(res => {
          assert.equal(res[0], ownerBalance)
          assert.equal(res[1], adminBalance)
          //assert.equal(res[2], contractBalance)
        })
    })
  })

  describe('Short address attack', () => {
    const amount = 100
    it('Short address attack should throw invalid address error', () => {
      const shortAddr = someoneA.substring(0, someoneA.length - 1)
      return ins.transfer(shortAddr, amount)
        .catch(err => {
          assert(err.message.startsWith((vmerror.ErrType.invalidAddr)))
        })
    })
  })
})
