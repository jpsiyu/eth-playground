const ShapeCalculator = artifacts.require("ShapeCalculator");

module.exports = function (deployer) {
  deployer.deploy(ShapeCalculator);
};
