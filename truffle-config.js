const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const infuraKey = "YOUR_INFURA_KEY";
const mnemonic = "YOUR_MNEMONIC";

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545, // Ganache GUI port
            network_id: "*",
        },
        ropsten: {
            provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
            network_id: 3,
            gas: 5500000,
        }
    },
    compilers: {
        solc: {
            version: "0.8.0"
        }
    }
};
