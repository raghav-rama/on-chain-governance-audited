import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-finder';
import 'hardhat-storage-vault';
import 'solidity-docgen';
import 'hardhat-contract-sizer';
import 'hardhat-tracer';
import './tasks';

dotenvConfig({ path: __dirname + '/.env' });

function getWallet() {
  return process.env.DEPLOYER_WALLET_PRIVATE_KEY !== undefined
    ? [process.env.DEPLOYER_WALLET_PRIVATE_KEY]
    : [];
}

const config: HardhatUserConfig = {
  solidity: {
    version: process.env.SOLC_VERSION || '0.8.18',
    settings: {
      viaIR:
        (process.env.SOLIDITY_VIA_IR &&
          'true' === process.env.SOLIDITY_VIA_IR.toLowerCase()) ||
        false,
      optimizer: {
        enabled:
          (process.env.SOLIDITY_OPTIMIZER &&
            'true' === process.env.SOLIDITY_OPTIMIZER.toLowerCase()) ||
          false,
        runs:
          (process.env.SOLIDITY_OPTIMIZER_RUNS &&
            Boolean(parseInt(process.env.SOLIDITY_OPTIMIZER_RUNS)) &&
            parseInt(process.env.SOLIDITY_OPTIMIZER_RUNS)) ||
          200
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout']
        }
      }
    }
  },
  storageVault: {
    check: {
      storeFile: 'storage-store-lock.json'
    },
    lock: {
      storeFile: 'storage-store-lock.json',
      prettify: true
    }
  },
  finder: {
    prettify: true
  },
  docgen: {
    outputDir: './docs'
  },
  contractSizer: {
    runOnCompile: false,
    strict: true
  },
  gasReporter: {
    enabled:
      (process.env.REPORT_GAS &&
        'true' === process.env.REPORT_GAS.toLowerCase()) ||
      false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || '',
    gasPriceApi:
      process.env.GAS_PRICE_API ||
      'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
    token: 'ETH',
    currency: 'USD'
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize:
        (process.env.ALLOW_UNLIMITED_CONTRACT_SIZE &&
          'true' === process.env.ALLOW_UNLIMITED_CONTRACT_SIZE.toLowerCase()) ||
        false
    },
    custom: {
      url: process.env.CUSTOM_NETWORK_URL || '',
      accounts: {
        count:
          (process.env.CUSTOM_NETWORK_ACCOUNTS_COUNT &&
            Boolean(parseInt(process.env.CUSTOM_NETWORK_ACCOUNTS_COUNT)) &&
            parseInt(process.env.CUSTOM_NETWORK_ACCOUNTS_COUNT)) ||
          0,
        mnemonic: process.env.CUSTOM_NETWORK_ACCOUNTS_MNEMONIC || '',
        path: process.env.CUSTOM_NETWORK_ACCOUNTS_PATH || ''
      }
    },
    baseTestnet: {
      url: process.env.BASE_TESTNET_RPC_URL || '',
      accounts: getWallet()
    }
  },
  etherscan: {
    apiKey: {
      baseTestnet: process.env.BASE_SEPOLIA_SCAN || ''
    },
    customChains: [
      {
        network: 'custom',
        chainId:
          (process.env.CUSTOM_NETWORK_CHAIN_ID &&
            Boolean(parseInt(process.env.CUSTOM_NETWORK_CHAIN_ID)) &&
            parseInt(process.env.CUSTOM_NETWORK_CHAIN_ID)) ||
          0,
        urls: {
          apiURL: process.env.CUSTOM_NETWORK_API_URL || '',
          browserURL: process.env.CUSTOM_NETWORK_BROWSER_URL || ''
        }
      }
    ]
  }
};

export default config;
