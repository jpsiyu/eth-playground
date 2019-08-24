const Migrations = artifacts.require("HelloWorld");

module.exports = function (deployer, network, accounts) {
  if(network == 'development')[
    web3.eth.personal.unlockAccount(accounts[0], '123456')
  ]
  deployer.deploy(Migrations);
};
