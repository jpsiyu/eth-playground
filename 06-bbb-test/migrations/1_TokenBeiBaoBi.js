const Migrations = artifacts.require("TokenBeiBaoBi");

module.exports = function (deployer, network, accounts) {
  const owner = accounts[0]
  const admin = accounts[1]
  deployer.deploy(Migrations, owner, admin, [owner, admin]);
};

