const express = require('express');
const Web3 = require('web3');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/YOUR_INFURA_KEY"));
const contractABI = [ /* Contract ABI goes here */ ];
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const plagiarismContract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/addDocument', async (req, res) => {
    const { hash, account, privateKey } = req.body;
    try {
        const data = plagiarismContract.methods.addDocument(hash).encodeABI();
        const tx = { to: contractAddress, gas: 2000000, data };
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ success: true, receipt });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/checkPlagiarism/:hash', async (req, res) => {
    const { hash } = req.params;
    try {
        const exists = await plagiarismContract.methods.checkPlagiarism(hash).call();
        res.json({ exists });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
cd