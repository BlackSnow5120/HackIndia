const PlagiarismCheck = artifacts.require("PlagiarismCheck");

module.exports = function(deployer) {
    deployer.deploy(PlagiarismCheck);
};
