const BBBV3 = artifacts.require("TokenBeiBaoBiV3");

module.exports = function (deployer, network, accounts) {
  const owner = accounts[0]
  const admin = accounts[1]
  const someoneA = accounts[2]
  const someoneB = accounts[3]
  deployer.deploy(BBBV3, owner, admin, [someoneA, someoneB], [100, 200]);
};

