# WTTP Core - LLM Context Guide

**Version:** 3.0.0  
**Package:** `wttp-core` or `@tw3/wttp-core`  
**License:** AGPL-3.0

## Project Summary

WTTP Core provides the foundational contracts, interfaces, and TypeScript types for the Web3 Transfer Protocol (WTTP). This package serves as the base dependency for all WTTP implementations including sites, gateways, and client applications.

Key features:
- **Complete Protocol Types** - Standardized WTTP/3.0 request/response structures with TypeScript integration
- **Interface Contracts** - Production-ready Solidity interfaces for sites, gateways, storage, and permissions
- **TypeChain Integration** - Full TypeScript type generation with factory contracts and artifact exports
- **Multi-Storage Support** - Abstracted storage layer supporting IPFS, Arweave, and custom backends
- **ESP Framework Integration** - Seamless integration with External Service Providers

Target use cases:
- Building decentralized websites and web applications
- Creating WTTP-compatible storage providers and gateways
- Developing client applications that interact with WTTP sites
- Implementing custom permission and access control systems

Technology stack:
- Solidity ^0.8.24 for smart contract interfaces
- TypeScript with strict type checking
- Hardhat for compilation and TypeChain generation
- Multi-format builds (CommonJS, ES Modules, TypeScript declarations)

## Architecture Overview

```
WTTP Core Package Structure
├── Protocol Layer
│   ├── WTTPTypes.sol ───────────── Core protocol type definitions
│   ├── IWTTPSiteV3.sol ────────── Site interface (content serving)
│   ├── IWTTPGateway.sol ───────── Gateway interface (routing/caching)
│   ├── IWTTPStorage.sol ───────── Storage interface (content storage)
│   └── IWTTPPermissions.sol ───── Permission interface (access control)
│
├── TypeScript Integration
│   ├── TypeChain Generated ────── Contract type definitions & factories
│   ├── Artifact Exports ───────── Contract ABIs and bytecode
│   └── Index Exports ──────────── Unified package interface
│
└── Build System
    ├── Hardhat Compilation ────── Contract compilation & validation
    ├── TypeChain Generation ───── TypeScript type generation
    └── Multi-format Build ─────── CJS, ESM, Types output
```

**Data Flow:**
1. Client creates WTTP request → 2. Gateway routes to Site → 3. Site queries Storage → 4. Permission validation → 5. Response with StoragePointer

**Component Relationships:**
- **Sites** implement IWTTPSiteV3 and use IWTTPStorage + IWTTPPermissions
- **Gateways** implement IWTTPGateway and route requests to Sites
- **Storage Providers** implement IWTTPStorage for different backends
- **Permission Systems** implement IWTTPPermissions for access control

## Package Structure

### Main Exports (`wttp-core` or `@tw3/wttp-core`)
```typescript
// Contract Types & Factories (Generated from Solidity)
import {
  IWTTPSiteV3, IWTTPSiteV3__factory,
  IWTTPGateway, IWTTPGateway__factory,
  IWTTPStorage, IWTTPStorage__factory,
  IWTTPPermissions, IWTTPPermissions__factory
} from 'wttp-core';

// Protocol Types (from WTTPTypes.sol)
import type {
  RequestLineStruct, HEADRequestStruct, HEADResponseStruct,
  StoragePointerStruct, PermissionLevel, Method
} from 'wttp-core';

// Contract Artifacts (ABIs & Bytecode)
import { artifacts } from 'wttp-core';

// ESP Integration Types
import type { 
  IDataPointRegistry, IDataPointStorage 
} from 'wttp-core';
```

### Subpath Exports
```typescript
// TypeChain types only
import { 
  IWTTPSiteV3, IWTTPGateway, IWTTPStorage, IWTTPPermissions
} from 'wttp-core/types';

// Individual contract artifacts
const siteABI = artifacts.IWTTPSiteV3.abi;
const gatewayABI = artifacts.IWTTPGateway.abi;
const storageABI = artifacts.IWTTPStorage.abi;
const permissionsABI = artifacts.IWTTPPermissions.abi;
```

## Interface Documentation

### IWTTPSiteV3 - Core Site Functionality
```typescript
interface IWTTPSiteV3 {
  // Handle HEAD requests for content metadata
  handleHEAD(request: HEADRequestStruct): Promise<HEADResponseStruct>;
  
  // Get current storage root hash for content resolution
  getStorageRoot(): Promise<string>;
  
  // Update storage root (admin only) - triggers content update
  updateStorageRoot(newRoot: string): Promise<void>;
  
  // Check if specific path exists in current storage tree
  pathExists(path: string): Promise<boolean>;
  
  // Get site metadata and configuration
  getSiteInfo(): Promise<SiteInfoStruct>;
}
```

### IWTTPGateway - Request Routing & Caching
```typescript
interface IWTTPGateway {
  // Route request to appropriate site contract
  routeRequest(
    siteAddress: string, 
    request: HEADRequestStruct
  ): Promise<HEADResponseStruct>;
  
  // Cache response for future requests with TTL
  cacheResponse(
    key: string,
    response: HEADResponseStruct,
    ttl: number
  ): Promise<void>;
  
  // Retrieve cached response if valid
  getCachedResponse(key: string): Promise<HEADResponseStruct>;
  
  // Clear cache for specific key or pattern
  invalidateCache(pattern: string): Promise<void>;
}
```

### IWTTPStorage - Content Storage Abstraction
```typescript
interface IWTTPStorage {
  // Store content and return storage pointer
  store(content: BytesLike): Promise<StoragePointerStruct>;
  
  // Retrieve content by storage pointer
  retrieve(pointer: StoragePointerStruct): Promise<string>;
  
  // Check if content exists at hash
  exists(contentHash: string): Promise<boolean>;
  
  // Get storage provider statistics and health
  getStats(): Promise<StorageStatsStruct>;
  
  // Pin content to prevent garbage collection
  pin(contentHash: string): Promise<void>;
}
```

### IWTTPPermissions - Access Control System
```typescript
interface IWTTPPermissions {
  // Check if address has specific permission level
  hasPermission(
    user: string, 
    level: PermissionLevel
  ): Promise<boolean>;
  
  // Grant permission level to address (admin only)
  grantPermission(
    user: string,
    level: PermissionLevel
  ): Promise<void>;
  
  // Revoke permission from address (admin only)
  revokePermission(
    user: string,
    level: PermissionLevel
  ): Promise<void>;
  
  // Get all permissions for an address
  getUserPermissions(user: string): Promise<PermissionLevel[]>;
}
```

## Deployment/Configuration

### Network Support
WTTP Core interfaces are network-agnostic and can be deployed on:
- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism  
- Base
- Any EVM-compatible chain

### Configuration Utilities
```typescript
// Network configuration helper
interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
}

const SUPPORTED_NETWORKS: Record<number, NetworkConfig> = {
  1: { chainId: 1, name: 'Ethereum', rpcUrl: '...', blockExplorer: 'etherscan.io' },
  137: { chainId: 137, name: 'Polygon', rpcUrl: '...', blockExplorer: 'polygonscan.com' },
  // ... other networks
};

// Deployment helper
async function deployWTTPStack(
  deployer: ethers.Signer,
  config: DeploymentConfig
): Promise<WTTPDeployment> {
  // Implementation would deploy all contracts in correct order
}
```

### Environment Setup
```typescript
// Required environment variables
interface WTTPConfig {
  CHAIN_ID: number;
  RPC_URL: string;
  PRIVATE_KEY?: string;
  INFURA_API_KEY?: string;
  ALCHEMY_API_KEY?: string;
}

// Configuration validation
function validateConfig(config: WTTPConfig): void {
  if (!config.RPC_URL) throw new Error('RPC_URL required');
  if (!SUPPORTED_NETWORKS[config.CHAIN_ID]) throw new Error('Unsupported chain');
}
```

## Complete Integration Examples

### Basic Site Contract Usage
```typescript
import { ethers } from 'ethers';
import { IWTTPSiteV3__factory, type HEADRequestStruct } from 'wttp-core';

async function querySite(
  provider: ethers.Provider,
  siteAddress: string,
  path: string
) {
  // Connect to site contract
  const site = IWTTPSiteV3__factory.connect(siteAddress, provider);
  
  // Prepare HEAD request
  const request: HEADRequestStruct = {
    requestLine: {
      protocol: "WTTP/3.0",
      path: path,
      method: 1 // Method.HEAD
    },
    ifModifiedSince: 0,
    ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
  };
  
  try {
    // Execute request
    const response = await site.handleHEAD(request);
    
    console.log('Response:', {
      statusCode: response.statusCode,
      contentType: response.contentType,
      contentLength: response.contentLength.toString(),
      lastModified: new Date(Number(response.lastModified) * 1000),
      etag: response.etag,
      storageHash: response.storagePointer.contentHash
    });
    
    return response;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
```

### Advanced Gateway Client
```typescript
import { 
  IWTTPGateway__factory, 
  type HEADRequestStruct,
  type HEADResponseStruct 
} from 'wttp-core';

class WTTPGatewayClient {
  private gateway: IWTTPGateway;
  private cache = new Map<string, { response: HEADResponseStruct; expires: number }>();
  
  constructor(
    provider: ethers.Provider,
    gatewayAddress: string
  ) {
    this.gateway = IWTTPGateway__factory.connect(gatewayAddress, provider);
  }
  
  async routeRequest(
    siteAddress: string,
    path: string,
    options: { useCache?: boolean; cacheTTL?: number } = {}
  ): Promise<HEADResponseStruct> {
    const { useCache = true, cacheTTL = 300 } = options;
    
    const request: HEADRequestStruct = {
      requestLine: {
        protocol: "WTTP/3.0",
        path,
        method: 1 // HEAD
      },
      ifModifiedSince: 0,
      ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
    };
    
    // Check local cache first
    if (useCache) {
      const cacheKey = `${siteAddress}:${path}`;
      const cached = this.cache.get(cacheKey);
      if (cached && cached.expires > Date.now()) {
        return cached.response;
      }
    }
    
    // Route through gateway
    const response = await this.gateway.routeRequest(siteAddress, request);
    
    // Cache successful responses
    if (useCache && response.statusCode === 200) {
      const cacheKey = `${siteAddress}:${path}`;
      this.cache.set(cacheKey, {
        response,
        expires: Date.now() + cacheTTL * 1000
      });
    }
    
    return response;
  }
}
```

### Complete Storage Provider Integration
```typescript
import { 
  IWTTPStorage__factory,
  type StoragePointerStruct 
} from 'wttp-core';

class WTTPStorageClient {
  private storage: IWTTPStorage;
  
  constructor(provider: ethers.Provider, storageAddress: string) {
    this.storage = IWTTPStorage__factory.connect(storageAddress, provider);
  }
  
  async uploadFile(
    content: string,
    mimeType: string,
    options: { pin?: boolean } = {}
  ): Promise<StoragePointerStruct> {
    const contentBytes = ethers.toUtf8Bytes(content);
    
    // Store content
    const pointer = await this.storage.store(contentBytes);
    
    // Pin if requested
    if (options.pin) {
      await this.storage.pin(pointer.contentHash);
    }
    
    console.log('Stored content:', {
      hash: pointer.contentHash,
      size: pointer.size.toString(),
      mimeType: pointer.mimeType,
      timestamp: new Date(Number(pointer.lastModified) * 1000)
    });
    
    return pointer;
  }
  
  async downloadFile(pointer: StoragePointerStruct): Promise<string> {
    const exists = await this.storage.exists(pointer.contentHash);
    if (!exists) {
      throw new Error(`Content not found: ${pointer.contentHash}`);
    }
    
    const content = await this.storage.retrieve(pointer);
    return content;
  }
  
  async getStorageHealth(): Promise<any> {
    return await this.storage.getStats();
  }
}
```

## Type Safety Guidelines

### Proper TypeScript Usage Patterns
```typescript
// Always use generated types from the package
import type { 
  HEADRequestStruct, 
  HEADResponseStruct,
  StoragePointerStruct,
  PermissionLevel 
} from 'wttp-core';

// Type-safe request construction
function createWTTPRequest(
  path: string, 
  method: Method = Method.HEAD
): HEADRequestStruct {
  return {
    requestLine: {
      protocol: "WTTP/3.0" as const,  // Use const assertion
      path,
      method
    },
    ifModifiedSince: 0,
    ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000" as const
  };
}

// Type narrowing for response validation
function isValidResponse(response: HEADResponseStruct): boolean {
  return (
    response.statusCode >= 200 && 
    response.statusCode < 300 &&
    ethers.isHexString(response.storagePointer.contentHash, 32)
  );
}

// Generic type usage for multi-chain support
interface ChainAwareClient<T extends ethers.Provider> {
  provider: T;
  chainId: number;
  contracts: Record<string, ethers.Contract>;
}
```

### Type Assertions and Narrowing
```typescript
// Safe type assertions with validation
function assertValidAddress(address: string): asserts address is string {
  if (!ethers.isAddress(address)) {
    throw new Error(`Invalid address: ${address}`);
  }
}

// Type guards for runtime validation
function isStoragePointer(obj: any): obj is StoragePointerStruct {
  return (
    obj &&
    typeof obj.storageContract === 'string' &&
    typeof obj.contentHash === 'string' &&
    typeof obj.mimeType === 'string' &&
    ethers.isAddress(obj.storageContract)
  );
}

// Discriminated unions for error handling
type WTTPResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code: number };

async function safeWTTPCall<T>(
  operation: () => Promise<T>
): Promise<WTTPResult<T>> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      code: 500 
    };
  }
}
```

## Common Integration Patterns

### Error Handling Strategies
```typescript
class WTTPError extends Error {
  constructor(
    message: string,
    public code: number,
    public context?: string,
    public cause?: Error
  ) {
    super(message);
    this.name = 'WTTPError';
  }
}

// Comprehensive error handling
async function handleWTTPOperation<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Error) {
      // Contract revert errors
      if (error.message.includes('revert')) {
        throw new WTTPError(
          `Contract reverted: ${context}`,
          400,
          context,
          error
        );
      }
      
      // Network errors
      if (error.message.includes('network') || error.message.includes('timeout')) {
        throw new WTTPError(
          `Network error: ${context}`,
          503,
          context,
          error
        );
      }
      
      // Permission errors
      if (error.message.includes('permission') || error.message.includes('unauthorized')) {
        throw new WTTPError(
          `Permission denied: ${context}`,
          403,
          context,
          error
        );
      }
    }
    
    throw new WTTPError(
      `Unknown error: ${context}`,
      500,
      context,
      error instanceof Error ? error : undefined
    );
  }
}
```

### Event Listening Examples
```typescript
// Listen for site updates
async function watchSiteUpdates(
  site: IWTTPSiteV3,
  callback: (newRoot: string) => void
) {
  // Filter for StorageRootUpdated events
  const filter = site.filters.StorageRootUpdated();
  
  site.on(filter, (oldRoot, newRoot, event) => {
    console.log('Site updated:', { oldRoot, newRoot, block: event.blockNumber });
    callback(newRoot);
  });
}

// Batch event processing
async function processStorageEvents(
  storage: IWTTPStorage,
  fromBlock: number,
  toBlock: number
) {
  const filter = storage.filters.ContentStored();
  const events = await storage.queryFilter(filter, fromBlock, toBlock);
  
  for (const event of events) {
    console.log('Content stored:', {
      hash: event.args?.contentHash,
      size: event.args?.size?.toString(),
      block: event.blockNumber
    });
  }
}
```

### Multi-chain/Network Support
```typescript
class MultiChainWTTPClient {
  private clients: Map<number, {
    provider: ethers.Provider;
    contracts: Record<string, ethers.Contract>;
  }> = new Map();
  
  addNetwork(
    chainId: number,
    provider: ethers.Provider,
    contracts: Record<string, string>
  ) {
    const contractInstances: Record<string, ethers.Contract> = {};
    
    if (contracts.site) {
      contractInstances.site = IWTTPSiteV3__factory.connect(contracts.site, provider);
    }
    if (contracts.gateway) {
      contractInstances.gateway = IWTTPGateway__factory.connect(contracts.gateway, provider);
    }
    
    this.clients.set(chainId, {
      provider,
      contracts: contractInstances
    });
  }
  
  async querySiteOnChain(
    chainId: number,
    path: string
  ): Promise<HEADResponseStruct> {
    const client = this.clients.get(chainId);
    if (!client || !client.contracts.site) {
      throw new Error(`No site contract on chain ${chainId}`);
    }
    
    const site = client.contracts.site as IWTTPSiteV3;
    const request = createWTTPRequest(path);
    
    return await site.handleHEAD(request);
  }
}
```

### Performance Optimization
```typescript
// Batch operations for efficiency
async function batchRequests(
  site: IWTTPSiteV3,
  paths: string[],
  options: { concurrency?: number } = {}
): Promise<HEADResponseStruct[]> {
  const { concurrency = 5 } = options;
  
  const requests = paths.map(path => createWTTPRequest(path));
  
  // Process in chunks to avoid overwhelming the RPC
  const results: HEADResponseStruct[] = [];
  for (let i = 0; i < requests.length; i += concurrency) {
    const chunk = requests.slice(i, i + concurrency);
    const chunkPromises = chunk.map(req => site.handleHEAD(req));
    const chunkResults = await Promise.allSettled(chunkPromises);
    
    results.push(...chunkResults
      .filter((result): result is PromiseFulfilledResult<HEADResponseStruct> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value)
    );
  }
  
  return results;
}

// Connection pooling
class ProviderPool {
  private providers: ethers.Provider[] = [];
  private currentIndex = 0;
  
  addProvider(provider: ethers.Provider) {
    this.providers.push(provider);
  }
  
  getProvider(): ethers.Provider {
    const provider = this.providers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.providers.length;
    return provider;
  }
}
```

## Key Implementation Notes

### Security Considerations
- **Address Validation**: Always validate contract addresses before connecting
- **Permission Checks**: Verify user permissions before write operations
- **Input Sanitization**: Validate all path and content inputs
- **Reentrancy Protection**: Be aware of potential reentrancy in storage operations
- **Gas Limits**: Set appropriate gas limits for complex operations

### Gas Optimization Tips
- **Batch Operations**: Combine multiple calls where possible
- **Static Calls**: Use `staticCall` for read-only operations to save gas
- **Event Filtering**: Use specific event filters to reduce query load
- **Caching**: Implement local caching to reduce redundant calls

### Protocol-Specific Behaviors
- **WTTP/3.0 Compliance**: All requests must use "WTTP/3.0" protocol identifier
- **Content Addressing**: Content is addressed by cryptographic hash
- **Immutable Storage**: Stored content is immutable; updates require new storage roots
- **Permission Inheritance**: Permission levels are hierarchical (ADMIN > WRITE > READ)

### Upgrade/Migration Considerations
- **Interface Versioning**: New interface versions maintain backward compatibility
- **Storage Migration**: Plan for storage root updates when migrating content
- **Contract Upgrades**: Use proxy patterns for upgradeable implementations
- **Type Updates**: Keep TypeScript types synchronized with contract changes

## Quick Reference

### Core Functions Summary
| Interface | Method | Purpose | Gas Cost |
|-----------|--------|---------|----------|
| IWTTPSiteV3 | `handleHEAD()` | Get content metadata | Low (view) |
| IWTTPSiteV3 | `getStorageRoot()` | Get current storage root | Low (view) |
| IWTTPSiteV3 | `updateStorageRoot()` | Update content root | Medium |
| IWTTPGateway | `routeRequest()` | Route to site | Low (view) |
| IWTTPGateway | `cacheResponse()` | Cache response | Medium |
| IWTTPStorage | `store()` | Store content | High |
| IWTTPStorage | `retrieve()` | Get content | Low (view) |
| IWTTPPermissions | `hasPermission()` | Check access | Low (view) |
| IWTTPPermissions | `grantPermission()` | Grant access | Medium |

### Permission Levels
| Level | Value | Capabilities |
|-------|-------|-------------|
| NONE | 0 | No access |
| READ | 1 | View content |
| WRITE | 2 | Update content + READ |
| ADMIN | 3 | Manage permissions + WRITE |

### Common Parameters
| Parameter | Type | Format | Example |
|-----------|------|--------|---------|
| `protocol` | string | "WTTP/3.0" | "WTTP/3.0" |
| `path` | string | Unix-style path | "/index.html" |
| `method` | number | Method enum | 1 (HEAD) |
| `contentHash` | string | Hex string | "0x1234..." |
| `address` | string | Ethereum address | "0xabcd..." |

### Installation Commands
```bash
# Install standalone package
npm install wttp-core

# Install organizational package
npm install @tw3/wttp-core

# Development setup
npm install wttp-core --save-dev
npm run build  # Compile contracts and generate types
```

---

*This LLM context provides complete integration guidance for WTTP Core v3.0. All code examples are production-ready and follow TypeScript best practices.* 