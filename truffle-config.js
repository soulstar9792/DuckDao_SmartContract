module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost
        port: 8545,            // Standard Ethereum port (Ganache, for example)
        network_id: "*",       // Any network
      },
      rinkeby: {
        provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`),
        network_id: 4,         // Rinkeby's id
        gas: 5500000,          // Gas limit
      },
    },
    compilers: {
      solc: {
        version: "0.8.20",      // Fetch exact version from solc-bin
      },
    },
  };
  