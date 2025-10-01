/**
 * Copyright (C) 2025 TechnicallyWeb3
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import wttpDeployments from './wttp.deployments';

export interface WttpChainConfig {
    name?: string;
    alias?: string;
    symbol?: string;
    explorer?: string;
    gateway: string;
    rpcsList: string[];
}

export interface WttpConfig {
    defaultChain: number;
    chains: {
        [chainId: number]: WttpChainConfig;
    };
}

export const config: WttpConfig = {
    defaultChain: 11155111,
    chains: {
        11155111: {
            name: 'Sepolia Testnet',
            alias: 'sepolia',
            symbol: 'ETH',
            explorer: 'https://sepolia.etherscan.io',
            gateway: wttpDeployments.chains[11155111].gateway.contractAddress,
            rpcsList: [
                "https://ethereum-sepolia-rpc.publicnode.com",
                "https://1rpc.io/sepolia",
                "https://sepolia.drpc.org",
                "https://sepolia.meowrpc.com"
            ],
        },
        1: {
            name: 'Ethereum Mainnet',
            alias: 'mainnet',
            symbol: 'ETH',
            explorer: 'https://etherscan.io',
            gateway: wttpDeployments.chains[11155111].gateway.contractAddress, // temporary until mainnet is deployed
            rpcsList: [
                "https://ethereum-rpc.publicnode.com",
                "https://eth.llamarpc.com",
                "https://1rpc.io/eth",
                "https://eth.drpc.org",
                "https://eth.meowrpc.com"
            ],
        },
        137: {
            name: 'Polygon POS',
            alias: 'polygon',
            symbol: 'MATIC',
            explorer: 'https://polygonscan.com',
            gateway: wttpDeployments.chains[137].gateway.contractAddress,
            rpcsList: [
                // "https://polygon-bor-rpc.publicnode.com",
                // "https://eth.llamarpc.com",
                "https://1rpc.io/matic",
                "https://polygon-rpc.com",
                "https://polygon.drpc.org",
                "https://polygon.meowrpc.com",
                "https://endpoints.omniatech.io/v1/matic/mainnet/public",
                "https://polygon-pokt.nodies.app",
                "https://rpc.ankr.com/polygon",

            ],
        },
    }
}