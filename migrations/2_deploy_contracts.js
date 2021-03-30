const DadBucks = artifacts.require("DadBucks.sol");

module.exports = function (deployer) {
  deployer.deploy(DadBucks, 1000000);
};
