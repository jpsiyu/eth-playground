const BBB = artifacts.require("TokenBeiBaoBi");
const BN = require('bignumber.js')

module.exports = function (deployer, network, accounts) {
  const owner = accounts[0]
  const admin = accounts[1]
  const someone = accounts[2]
  deployer.deploy(BBB, owner, admin, [someone], [12345])
    .then(function(){
      console.log('BBB was deployed at', BBB.address)
    })
};

