const { deployProxy } = require('@openzeppelin/truffle-upgrades');
var UserContract = artifacts.require("UserContract");

module.exports = async function(deployer){
    const UserContractAddress = await deployProxy(UserContract, {deployer});
    console.log(`Address of UserContract: ${UserContractAddress.address}`)
    // Additional contracts can be deployed here
};