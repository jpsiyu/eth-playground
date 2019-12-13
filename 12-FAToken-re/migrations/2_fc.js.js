const TokenFC = artifacts.require("TokenFC");

module.exports = function(deployer, network, accounts) {
  const owner = accounts[0]
  deployer.deploy(TokenFC, owner);
};
