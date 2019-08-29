const Migrations = artifacts.require("TokenBeiBaoBi");

module.exports = function (deployer, network, accounts) {
  const owner = accounts[0]
  const admin = accounts[1]
  const someone = accounts[2]
  deployer.deploy(Migrations, owner, admin, [someone], [12345]);
};

