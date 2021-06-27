import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import logo from '../logo.svg';
import header from '../facetten-header.png';
import Move from '../abis/Move.json'

class App extends Component {

  // will be called if its attched to the DOM succesfully (lifecycle method)
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // function to load web3, this makes the browser an ethereum browser
  async loadWeb3() {
    // new way for modern ethereum browsers 
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    // old way for older ethereum browsers
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // loads blockchain data
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account of user
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Move.networks[networkId]
    if(networkData) {
      const abi = Move.abi
      // get address based on your network
      const address = networkData.address
      // get a copy of the smart contract in web3
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      // read data from the blockchain using call()
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Moves 
      for (var i = 1; i <= totalSupply; i++) {
        const move = await contract.methods.moves(i - 1).call() 
        // only adds the tokens of the user to the array
        if (move.includes(this.state.account)){
          this.setState({
          // spread operator makes a new copy of the existing array and appends the new moves
          moves: [...this.state.moves, move]
        })

        }
        
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  // call the smart contract function to mint a token
  mint = (move) => {
    this.state.contract.methods.mint(move).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        moves: [...this.state.moves, move]
      })
    })
  }

  // constructor to set the default state
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      moves: []
    }
  }

  inputSwitch(input) {

    input = parseInt(input)
    switch(true) {
 
      case (input > 99 && input < 200):
        return "100"  
      case (input > 199 && input< 300):
        return "200"
      case (input > 299 && input< 400):
        return "300"
      case (input > 399 && input< 500):
        return "400"
      case (input > 499 && input< 600):
        return "500"
      case (input > 599 && input< 1500):
        return "600"
      case (input > 1499 && input< 2000):
        return "1500"
      case (input > 1999 && input< 2500):
        return "2000"
      case (input > 2499 && input< 10000):
        return "2500"
      case (input > 9999 && input< 15000):
        return "10000"
      case (input > 14999 && input< 20000):
        return "15000"
      case (input > 19999 && input< 70000):
        return "20000"
      case (input > 69999 && input< 105000):
        return "70000"
      case (input > 104999 && input< 140000):
        return "105000"
      case (input > 139999):
        return "140000"
      default:
        alert("Input is not in range");
        return 0
    
      }
  }

  // returns the value of the token from unique id
  returnMove(move){
    // move = 1000x837625847204257
    // pubKey = 0x837625847204257
    // move.length = 24
    // pubkey.len = 
    // lengthOf = 3
    // value = 100

    // public key of user
    const pubKey = this.state.account
    // length of value = length of id - length of key
    const lengthOfValue = move.length - pubKey.length     
    // value of the token 
    const value = move.substring(0,lengthOfValue)
    return (value)
  }

  render() {
    return (
      <div>
        <div className="container-fluid bg-white">
          <nav className="navbar navbar-dark flex-md-nowrap p-0 shadow-b nav-width">
            <a
              className="navbar-brand logo col-sm-3 col-md-2 mr-0"
              href="https://www.denhaag.nl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo} className="app-logo" alt="logo" /> 
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-DHgreen"><span id="account">{this.state.account}</span></small>
              </li>
            </ul>
          </nav>
          <div className="row mb-3">
            <img src={header} className="app-logo" alt="header" />
          </div>
        </div>
        <div className="container bg-white">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Move Tokens</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const move = this.inputSwitch(this.move.value)
                  if (move !== 0) {
                    const user = this.state.account
                    const newMove = move + user
                    this.mint(newMove)
                  }
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. 100'
                    ref={(input) => { this.move = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-mint'
                    value='Mint'
                  />
                </form>

              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.moves.map((move, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <div className={"tokenImage token" + this.returnMove(move)} ></div>
                  <div className="tokenValue">{this.returnMove(move)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
