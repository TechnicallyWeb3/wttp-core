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
        31337: {
            name: 'Hardhat Localhost',
            alias: 'localhost',
            symbol: 'ETH',
            gateway: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            rpcsList: [
                "http://127.0.0.1:8545"
            ],
        },
        11155111: {
            name: 'Sepolia Testnet',
            alias: 'sepolia',
            symbol: 'ETH',
            explorer: 'https://sepolia.etherscan.io',
            gateway: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
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
            gateway: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            rpcsList: [
                "https://ethereum-rpc.publicnode.com",
                "https://eth.llamarpc.com",
                "https://1rpc.io/eth",
                "https://eth.drpc.org",
                "https://eth.meowrpc.com"
            ],
        },
    }
}