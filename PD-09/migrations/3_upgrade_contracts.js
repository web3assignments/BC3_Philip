const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
var User1 = artifacts.require("UserContract");
var User2 = artifacts.require("UserContractV2");

module.exports = async function(deployer) {    
    const UserContract=await User1.deployed()
    const User2Contract=await upgradeProxy(UserContract.address, User2,{ deployer });
    console.log(`Address of UserContract: ${UserContract.address}`)
    console.log(`Address of USer2Contract: ${User2Contract.address}`)
}