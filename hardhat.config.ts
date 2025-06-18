/**
 * Copyright (C) 2025 TechnicallyWeb3
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 */

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-build";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Import tasks
import "./tasks/deploy";

// console.log(process.env.GATEWAY_DEPLOYER_MNEMONIC.split(" ")[0]); // verify mnemonic without full exposure
const testMnemonic = "test test test test test test test test test test test junk";
const testKey = ethers.Wallet.fromPhrase(testMnemonic).privateKey;
const testKey1 = ethers.HDNodeWallet.fromPhrase(testMnemonic, undefined, "m/44'/60'/0'/0/1").privateKey;
const testKey2 = ethers.HDNodeWallet.fromPhrase(testMnemonic, undefined, "m/44'/60'/0'/0/2").privateKey;
const testKey3 = ethers.HDNodeWallet.fromPhrase(testMnemonic, undefined, "m/44'/60'/0'/0/3").privateKey;
const testKey4 = ethers.HDNodeWallet.fromPhrase(testMnemonic, undefined, "m/44'/60'/0'/0/4").privateKey;
const deployerMnemonic = process.env.GATEWAY_DEPLOYER_MNEMONIC || testMnemonic; // process.env.GATEWAY_DEPLOYER_MNEMONIC || 
const deployerKey = ethers.Wallet.fromPhrase(deployerMnemonic).privateKey;
const ownerMnemonic = process.env.OWNER_MNEMONIC || testMnemonic; // process.env.GATEWAY_OWNER_MNEMONIC || 
const ownerKey = ethers.Wallet.fromPhrase(ownerMnemonic).privateKey;

const testHardhatAccounts = [
  {
    privateKey: ownerKey,
    balance: "10000000000000000000000"
  },
  {
    privateKey: deployerKey,
    balance: "0"
  },
  {
    privateKey: testKey,
    balance: "10000000000000000000000"
  },
  {
    privateKey: testKey1,
    balance: "10000000000000000000000"
  },
  {
    privateKey: testKey2,
    balance: "10000000000000000000000"
  },
  {
    privateKey: testKey3,
    balance: "10000000000000000000000"
  },
  {
    privateKey: testKey4,
    balance: "10000000000000000000000"
  }
]
const hardhatAccounts = [
  {
    privateKey: deployerKey,
    balance: "0"
  },
  {
    privateKey: ownerKey,
    balance: "10000000000000000000000"
  }
]

const testAccounts = [testKey, testKey1, testKey2, testKey3, testKey4];
const accounts = [ownerKey, deployerKey];

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: testHardhatAccounts,
    },
    localhost: {
      chainId: 31337,
      url: "http://localhost:8545",
      accounts: accounts,
      blockGasLimit: 30000000,
    },
    sepolia: {
      chainId: 11155111,
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: accounts,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
    }
  },
};

export default config;
