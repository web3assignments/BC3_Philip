var UserContract = artifacts.require("UserContract");
module.exports = function(deployer){
    deployer.deploy(UserContract);
    // Additional contracts can be deployed here
};