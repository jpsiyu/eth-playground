const BNH = artifacts.require("TokenBNH");
const BBB = artifacts.require('TokenBeiBaoBiV2')

module.exports = function (deployer, network, accounts) {
  const owner = accounts[0]
  const admin = accounts[1]
  deployer.deploy(BNH, owner, admin)
    .then(() => {
      return deployer.deploy(BBB, owner, admin, BNH.address, [owner, admin])
    })
};

