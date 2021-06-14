// Let's use the contract we deployed on the Rinkeby test network!
// Contract Address: https://rinkeby.etherscan.io/address/0x99BFa4c14D07993f3D1cB03bd27dF9ac8c2E6B8A

const contract_address = '0x99BFa4c14D07993f3D1cB03bd27dF9ac8c2E6B8A';

// Compile your contract in remix, then go to the .JSON artifact and ABI will be there.
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "create",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "userId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "NewUser",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "remove",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "update",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "read",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

function log(logstr) {   
    document.getElementById("log").innerHTML +=logstr+"\n";
}



var contract;
var acts;

async function asyncloaded() {            
    web3 = new Web3(Web3.givenProvider); //provider from metamask

    log(`Version of web3.js: ${web3.version}`);  
    var result = await web3.eth.requestAccounts().catch(x=>{log(x.message); console.log(x);});
    log(`Value from requestAccounts: ${JSON.stringify(result)}`);
    acts = await web3.eth.getAccounts().catch(log);
    log(`Here are the accounts: ${JSON.stringify(acts)}`);

    var fromadr = acts[0];
    // toadr = "0xb7a502eb3F6a2De12519a4ED165b5b92c48e131C"
    account(fromadr);

    contract = new web3.eth.Contract(abi, contract_address);
    // log(`fromadr ${fromadr} has ${Web3.utils.fromWei( 
    //     await web3.eth.getBalance(fromadr), 'ether')} ether` );
    // log(`toadr    ${toadr} has ${Web3.utils.fromWei ( 
    //     await web3.eth.getBalance(toadr), 'ether')} ether` );
    // log(`Transfering 0.01 ether`);
    // obj= await web3.eth.sendTransaction({
    //     from: fromadr,
    //     to: toadr,
    //     value: Web3.utils.toWei('0.01', 'ether')
    // }).catch(x=>log(x.message));
    // log(`Stored in block ${obj.blockNumber}`)
    // log(`fromadr ${fromadr} has ${Web3.utils.fromWei ( 
    //     await web3.eth.getBalance(fromadr), 'ether')} ether` );
    // log(`toadr    ${toadr} has ${Web3.utils.fromWei ( 
    //     await web3.eth.getBalance(toadr), 'ether')} ether` );
}
window.addEventListener('DOMContentLoaded', asyncloaded);  

function account(accountstr){ 
    document.getElementById("account").innerHTML = accountstr;
}

function createUser(){
    var userName = document.getElementById("registerName").value;
    contract.methods.create(userName).send({from: acts[0]}).then(x => console.log(x));
}

function returnUser(){
    var userId = document.getElementById("returnId").value;
    var result = await contract.methods.read(userId).send({from: acts[0]}).then(x => console.log(x));
    document.getElementById("readUserName").innerText = result;
}
