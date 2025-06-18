import { config } from '../wttp.config';

export function getRpcUrl(chainId: number) {
    const chain = config.chains[chainId];
    if (!chain) {
        throw new Error(`Chain ${chainId} not found in config`);
    }
    return chain.rpcsList[0];
}

export { config };