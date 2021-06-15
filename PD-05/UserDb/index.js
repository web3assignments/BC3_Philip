// https://ropsten.etherscan.io/address/0x0a1D071Be3B5C1EbC79ab4118A298508D5C857A8

const contract_address = '0x0a1D071Be3B5C1EbC79ab4118A298508D5C857A8';

// Compile your contract in remix, then go to the .JSON artifact and ABI will be there.
const Userabi = [
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

    log(`Version of web3.js: ${web3.version}`);  
    var result = await web3.eth.requestAccounts().catch(x=>{log(x.message); console.log(x);});
    log(`Value from requestAccounts: ${JSON.stringify(result)}`);
    acts = await web3.eth.getAccounts().catch(log);
    log(`Here are the accounts: ${JSON.stringify(acts)}`);

    var fromadr = acts[0];
    toadr = "0xb7a502eb3F6a2De12519a4ED165b5b92c48e131C"
    account(fromadr);
    contract = new web3.eth.Contract(Userabi, contract_address);
	log(contract);
	log(contract_address);

    log(`fromadr ${fromadr} has ${Web3.utils.fromWei( 
        await web3.eth.getBalance(fromadr), 'ether')} ether` );
    log(`toadr    ${toadr} has ${Web3.utils.fromWei ( 
        await web3.eth.getBalance(toadr), 'ether')} ether` );
    log(`Transfering 0.01 ether`);
    obj= await web3.eth.sendTransaction({
        from: fromadr,
        to: toadr,
        value: Web3.utils.toWei('0.01', 'ether')
    }).catch(x=>log(x.message));
    log(`Stored in block ${obj.blockNumber}`)
    log(`fromadr ${fromadr} has ${Web3.utils.fromWei ( 
        await web3.eth.getBalance(fromadr), 'ether')} ether` );
    log(`toadr    ${toadr} has ${Web3.utils.fromWei ( 
        await web3.eth.getBalance(toadr), 'ether')} ether` );
}
window.addEventListener('DOMContentLoaded', asyncloaded);  

function account(accountstr){ 
    document.getElementById("account").innerHTML = accountstr;
}

function createUser(){
    var t = "in userfunctie";
    log(t);
    var userName = document.getElementById("registerName").value;
    log(userName);
	log(userName.type);
	log(userName.internalType);
    contract.methods.createUser(userName).send({from: acts[0]});
    log("gelukt");
}

async function readUser(){
    var t = "in readfunctie";
    log(t);
    var userId = document.getElementById("returnId").value;
    log(userId);
    
    var result = await contract.methods.readUser(userId).call({from: acts[0]}).then(x => {console.log(x); return x});
    document.getElementById("readUserName").innerText = result;
}

