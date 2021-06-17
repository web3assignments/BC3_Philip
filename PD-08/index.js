// https://ropsten.etherscan.io/address/0xFf245ff8e943Af9C996A7CAb8Be74653180931AC

const contract_address = '0xFf245ff8e943Af9C996A7CAb8Be74653180931AC';

// Compile your contract in remix, then go to the .JSON artifact and ABI will be there.
const Userabi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
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
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_myid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_result",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_proof",
				"type": "bytes"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTemp",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "priceOfUrl",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "readUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "removeUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestTemp",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "temp",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
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
		"name": "updateUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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

    var result = await web3.eth.requestAccounts().catch(x=>{log(x.message); console.log(x);});
    acts = await web3.eth.getAccounts().catch(log);


    var fromadr = acts[0];
    account(fromadr);
    contract = new web3.eth.Contract(Userabi, contract_address);
	
}
window.addEventListener('DOMContentLoaded', asyncloaded);  

function account(accountstr){ 
    document.getElementById("account").innerHTML = accountstr;
}

function createUser(){
    var userName = document.getElementById("registerName").value;

    contract.methods.createUser(userName).send({from: acts[0]});
}

async function readUser(){
    var userId = document.getElementById("returnId").value;
   
    var result = await contract.methods.readUser(userId).call({from: acts[0]}).then(x => {console.log(x); return x});
    document.getElementById("readUserName").innerText = result;
}

async function getTemp(){
    var result = await contract.methods.getTemp().call().then(x => {console.log(x); return x});   
    document.getElementById('temperature').innerText = result;
}

