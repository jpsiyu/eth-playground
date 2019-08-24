const Migrations = artifacts.require("Migrations");
const security = require('../../config/security')

module.exports = function (deployer, network, accounts) {
  if(network == 'development')[
    web3.eth.personal.unlockAccount(accounts[0], security.password)
  ]
  deployer.deploy(Migrations);
};
