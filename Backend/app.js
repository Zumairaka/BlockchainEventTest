const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Web3 = require('web3');

// smart contract connection
const contractJson = require(path.join(__dirname, './truffle/build/contracts/EventTest.json'));
const contractAddress = contractJson.networks['5777'].address;
const contractAbi = contractJson.abi;
web3 = new Web3( new Web3.providers.HttpProvider('http://localhost:7545'));

MyContract = new web3.eth.Contract(contractAbi, contractAddress);

const app = express();

// routes
const userRouter = require('./routes/user');

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/userReg', userRouter);

// server connection
app.listen(3000, () => {
    console.log('Server running at 3000');
})