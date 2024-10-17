const DuckdaoToken = artifacts.require("DuckdaoToken");

module.exports = function (deployer) {
  const initialSupply = 1000000; // Replace with your desired initial supply
  deployer.deploy(DuckdaoToken, initialSupply);
};
