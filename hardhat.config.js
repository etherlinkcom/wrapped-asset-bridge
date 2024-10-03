require("dotenv").config()

require("hardhat-contract-sizer")
require("@nomiclabs/hardhat-waffle")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("@openzeppelin/hardhat-upgrades")
require("./tasks")

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  namedAccounts: {
    deployer: {
      default: 0, // wallet address 0
    },
  },

  networks: {
    etherlink: {
      url: "https://node.mainnet.etherlink.com",
      chainId: 42793,
      accounts: [PRIVATE_KEY],
    },
    base: {
      url: "https://base-rpc.publicnode.com",
      chainId: 8453,
      accounts: [PRIVATE_KEY]
    },
    ethereum: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 1,
      accounts: [PRIVATE_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: [PRIVATE_KEY],
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [PRIVATE_KEY],
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,
      accounts: [PRIVATE_KEY],
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: [PRIVATE_KEY],
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
      chainId: 10,
      accounts: [PRIVATE_KEY],
    },
    fantom: {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: [PRIVATE_KEY],
    },
    coredao: {
      url: `https://rpc.coredao.org`,
      chainId: 1116,
      accounts: [PRIVATE_KEY],
    },

    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 5,
      accounts: [PRIVATE_KEY],
    },
    "bsc-testnet": {
      url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: [PRIVATE_KEY],
    },
    "arbitrum-goerli": {
      url: `https://goerli-rollup.arbitrum.io/rpc/`,
      chainId: 421613,
      accounts: [PRIVATE_KEY],
    },
    "optimism-goerli": {
      url: `https://goerli.optimism.io/`,
      chainId: 420,
      accounts: [PRIVATE_KEY],
    },
    "fantom-testnet": {
      url: `https://rpc.testnet.fantom.network/`,
      chainId: 4002,
      accounts: [PRIVATE_KEY],
    },
    "coredao-testnet": {
      url: "https://rpc.test.btcs.network/",
      chainId: 1115,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      etherlink: "YOU_CAN_COPY_ME"
    },
    customChains: [
      {
        network: "etherlink",
        chainId: 42793,
        urls: {
          apiURL: "https://explorer.etherlink.com/api",
          browserURL: "https://explorer.etherlink.com",
        },
      },
    ],
  },

}

