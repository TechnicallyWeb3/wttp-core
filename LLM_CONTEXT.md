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
- **Multi-Storage Support** - Abstracted storage layer supporting IPFS, Arweave, and custom backends via ESP integration
- **Role-Based Access Control** - Comprehensive permission system for resource management

Target use cases:
- Building decentralized websites and web applications
- Creating WTTP-compatible storage providers and gateways
- Developing client applications that interact with WTTP sites
- Implementing custom permission and access control systems

Technology stack:
- Solidity ^0.8.20 for smart contract interfaces
- TypeScript with strict type checking
- Hardhat for compilation and TypeChain generation
- Multi-format builds (CommonJS, ES Modules, TypeScript declarations)

## Architecture Overview

```
WTTP Core Package Structure
├── Protocol Layer
│   ├── WTTPTypes.sol ───────────── Core protocol type definitions
│   ├── IWTTPSite.sol ──────────── Site interface (content serving)
│   ├── IWTTPGateway.sol ───────── Gateway interface (routing/range handling)
│   ├── IWTTPStorage.sol ───────── Storage interface (content storage)
│   └── IWTTPPermissions.sol ───── Permission interface (role-based access)
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
1. Client creates WTTP request → 2. Gateway handles ranges/routing → 3. Site queries Storage → 4. Permission validation → 5. Response with data points

**Component Relationships:**
- **Sites** implement IWTTPSite and use IWTTPStorage + IWTTPPermissions
- **Gateways** implement IWTTPGateway and provide range/caching functionality
- **Storage Providers** implement IWTTPStorage for different backends
- **Permission Systems** implement IWTTPPermissions for role-based access control

## Package Structure

### Main Exports (`wttp-core` or `@tw3/wttp-core`)
```typescript
// Contract Types & Factories (Generated from Solidity)
import {
  IWTTPSite, IWTTPSite__factory,
  IWTTPGateway, IWTTPGateway__factory,
  IWTTPStorage, IWTTPStorage__factory,
  IWTTPPermissions, IWTTPPermissions__factory
} from 'wttp-core';

// Protocol Types (from WTTPTypes.sol)
import type {
  RequestLine, ResponseLine, HEADRequest, HEADResponse,
  LOCATERequest, LOCATEResponse, GETRequest, GETResponse,
  PUTRequest, PATCHRequest, DEFINERequest, DEFINEResponse,
  OPTIONSResponse, ResourceMetadata, HeaderInfo, DataRegistration,
  Method, CacheControl, Redirect, Range
} from 'wttp-core';

// Contract Artifacts (ABIs & Bytecode)
import { artifacts } from 'wttp-core';

// ESP Integration Types (from @tw3/esp dependency)
import type { 
  IDataPointRegistry, IDataPointStorage 
} from 'wttp-core';
```

### Subpath Exports
```typescript
// TypeChain types only
import { 
  IWTTPSite, IWTTPGateway, IWTTPStorage, IWTTPPermissions
} from 'wttp-core/types';

// Individual contract artifacts
const siteABI = artifacts.IWTTPSite.abi;
const gatewayABI = artifacts.IWTTPGateway.abi;
const storageABI = artifacts.IWTTPStorage.abi;
const permissionsABI = artifacts.IWTTPPermissions.abi;
const typesABI = artifacts.WTTPTypes.abi;
```

## Interface Documentation

### IWTTPSite - Core Site Functionality
```typescript
interface IWTTPSite {
  // Get Data Point Storage contract instance
  DPS(): Promise<IDataPointStorage>;
  
  // Get Data Point Registry contract instance
  DPR(): Promise<IDataPointRegistry>;
  
  // Handle OPTIONS requests to check available methods
  OPTIONS(optionsRequest: RequestLine): Promise<OPTIONSResponse>;
  
  // Handle HEAD requests for metadata retrieval
  HEAD(headRequest: HEADRequest): Promise<HEADResponse>;
  
  // Handle LOCATE requests to find resource storage locations
  LOCATE(locateRequest: HEADRequest): Promise<LOCATEResponse>;
  
  // Handle GET requests for content retrieval
  GET(getRequest: HEADRequest): Promise<LOCATEResponse>;
}
```

### IWTTPGateway - Request Routing & Range Handling
```typescript
interface IWTTPGateway {
  // Forward OPTIONS requests to a specified site
  OPTIONS(
    _site: string, 
    _optionsRequest: RequestLine
  ): Promise<OPTIONSResponse>;
  
  // Handle GET requests with byte range support
  GET(
    _site: string, 
    _getRequest: GETRequest
  ): Promise<GETResponse>;
  
  // Forward HEAD requests to a specified site
  HEAD(
    _site: string, 
    _headRequest: HEADRequest
  ): Promise<HEADResponse>;
  
  // Handle LOCATE requests with data point range support
  LOCATE(
    _site: string, 
    _locateRequest: LOCATERequest
  ): Promise<LOCATEResponse>;
}
```

### IWTTPStorage - Content Storage & Resource Management
```typescript
interface IWTTPStorage {
  // Get Data Point Storage contract instance
  DPS(): Promise<IDataPointStorage>;
  
  // Get Data Point Registry contract instance
  DPR(): Promise<IDataPointRegistry>;
  
  // Update the Data Point Registry contract address
  setDPR(_dpr: string): Promise<void>;
  
  // Create a new header in storage
  createHeader(_header: HeaderInfo): Promise<string>;
  
  // Retrieve header information by its address
  readHeader(_headerAddress: string): Promise<HeaderInfo>;
  
  // Set the default header information
  setDefaultHeader(_header: HeaderInfo): Promise<void>;
  
  // Get metadata for a resource path
  readMetadata(_path: string): Promise<ResourceMetadata>;
  
  // Update metadata for a resource
  updateMetadata(_path: string, _metadata: ResourceMetadata): Promise<void>;
  
  // Delete metadata for a resource
  deleteMetadata(_path: string): Promise<void>;
  
  // Create a new data point for a resource
  createResource(
    _path: string, 
    _dataRegistration: DataRegistration
  ): Promise<string>;
  
  // Get all data point addresses for a resource
  readResource(_path: string): Promise<string[]>;
  
  // Update a specific chunk of a resource
  updateResource(
    _path: string, 
    _dataPointAddress: string, 
    _chunkIndex: BigNumberish
  ): Promise<void>;
  
  // Remove a resource and its metadata
  deleteResource(_path: string): Promise<void>;
  
  // Bulk upload of data points for a resource
  uploadResource(
    _path: string, 
    _dataRegistration: DataRegistration[]
  ): Promise<string[]>;
}
```

### IWTTPPermissions - Role-Based Access Control
```typescript
interface IWTTPPermissions {
  // Check if an account has a specific role
  hasRole(role: string, account: string): Promise<boolean>;
  
  // Create a new resource-specific admin role
  createResourceRole(_role: string): Promise<void>;
  
  // Change the SITE_ADMIN_ROLE identifier
  changeSiteAdmin(_newSiteAdmin: string): Promise<void>;
  
  // Grant a role to an account
  grantRole(role: string, account: string): Promise<void>;
  
  // Revoke a role from an account
  revokeRole(role: string, account: string): Promise<void>;
  
  // Renounce a role for the calling account
  renounceRole(role: string, callerConfirmation: string): Promise<void>;
  
  // Get the admin role that controls a role
  getRoleAdmin(role: string): Promise<string>;
  
  // Get the default admin role
  DEFAULT_ADMIN_ROLE(): Promise<string>;
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

// Method enum for type safety
enum Method {
  HEAD = 0,
  GET = 1,
  POST = 2,
  PUT = 3,
  PATCH = 4,
  DELETE = 5,
  OPTIONS = 6,
  LOCATE = 7,
  DEFINE = 8
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
import { IWTTPSite__factory, type HEADRequest, Method } from 'wttp-core';

async function querySite(
  provider: ethers.Provider,
  siteAddress: string,
  path: string
) {
  // Connect to site contract
  const site = IWTTPSite__factory.connect(siteAddress, provider);
  
  // Prepare HEAD request
  const request: HEADRequest = {
    requestLine: {
      protocol: "WTTP/3.0",
      path: path,
      method: Method.HEAD
    },
    ifModifiedSince: 0,
    ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
  };
  
  try {
    // Execute request
    const response = await site.HEAD(request);
    
    console.log('Response:', {
      statusCode: response.responseLine.code,
      protocol: response.responseLine.protocol,
      mimeType: response.metadata.mimeType,
      size: response.metadata.size.toString(),
      lastModified: new Date(Number(response.metadata.lastModified) * 1000),
      etag: response.etag
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
  type HEADRequest,
  type GETRequest,
  type GETResponse,
  Method 
} from 'wttp-core';

class WTTPGatewayClient {
  private gateway: IWTTPGateway;
  
  constructor(
    provider: ethers.Provider,
    gatewayAddress: string
  ) {
    this.gateway = IWTTPGateway__factory.connect(gatewayAddress, provider);
  }
  
  async getContent(
    siteAddress: string,
    path: string,
    options: { 
      rangeBytes?: { start: number; end: number };
      useHead?: boolean;
    } = {}
  ): Promise<GETResponse | HEADResponse> {
    const { rangeBytes, useHead = false } = options;
    
    if (useHead) {
      // Use HEAD request for metadata only
      const headRequest: HEADRequest = {
        requestLine: {
          protocol: "WTTP/3.0",
          path,
          method: Method.HEAD
        },
        ifModifiedSince: 0,
        ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
      };
      
      return await this.gateway.HEAD(siteAddress, headRequest);
    } else {
      // Use GET request for content
      const getRequest: GETRequest = {
        head: {
          requestLine: {
            protocol: "WTTP/3.0",
            path,
            method: Method.GET
          },
          ifModifiedSince: 0,
          ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
        },
        rangeBytes: rangeBytes ? {
          start: rangeBytes.start,
          end: rangeBytes.end
        } : { start: 0, end: 0 } // 0 means to end
      };
      
      return await this.gateway.GET(siteAddress, getRequest);
    }
  }
  
  async locateDataPoints(
    siteAddress: string,
    path: string,
    chunkRange?: { start: number; end: number }
  ): Promise<LOCATEResponse> {
    const locateRequest: LOCATERequest = {
      head: {
        requestLine: {
          protocol: "WTTP/3.0",
          path,
          method: Method.LOCATE
        },
        ifModifiedSince: 0,
        ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      rangeChunks: chunkRange ? {
        start: chunkRange.start,
        end: chunkRange.end
      } : { start: 0, end: 0 } // 0 means all chunks
    };
    
    return await this.gateway.LOCATE(siteAddress, locateRequest);
  }
}
```

### Complete Storage Provider Integration
```typescript
import { 
  IWTTPStorage__factory,
  type ResourceMetadata,
  type HeaderInfo,
  type DataRegistration
} from 'wttp-core';

class WTTPStorageClient {
  private storage: IWTTPStorage;
  
  constructor(provider: ethers.Provider, storageAddress: string) {
    this.storage = IWTTPStorage__factory.connect(storageAddress, provider);
  }
  
  async uploadResource(
    path: string,
    chunks: { data: string; publisher: string }[],
    metadata: {
      mimeType: string;
      charset?: string;
      encoding?: string;
      language?: string;
    }
  ): Promise<string[]> {
    // Prepare data registrations
    const dataRegistrations: DataRegistration[] = chunks.map((chunk, index) => ({
      data: ethers.toUtf8Bytes(chunk.data),
      chunkIndex: index,
      publisher: chunk.publisher
    }));
    
    // Upload all chunks
    const dataPointAddresses = await this.storage.uploadResource(path, dataRegistrations);
    
    // Update metadata
    const resourceMetadata: ResourceMetadata = {
      mimeType: ethers.encodeBytes32String(metadata.mimeType.slice(0, 31)),
      charset: metadata.charset ? ethers.encodeBytes32String(metadata.charset.slice(0, 31)) : "0x0000000000000000000000000000000000000000000000000000000000000000",
      encoding: metadata.encoding ? ethers.encodeBytes32String(metadata.encoding.slice(0, 31)) : "0x0000000000000000000000000000000000000000000000000000000000000000",
      language: metadata.language ? ethers.encodeBytes32String(metadata.language.slice(0, 31)) : "0x0000000000000000000000000000000000000000000000000000000000000000",
      size: chunks.reduce((total, chunk) => total + chunk.data.length, 0),
      version: 1,
      lastModified: Math.floor(Date.now() / 1000),
      header: "0x0000000000000000000000000000000000000000000000000000000000000000" // Default header
    };
    
    await this.storage.updateMetadata(path, resourceMetadata);
    
    console.log('Uploaded resource:', {
      path,
      chunks: dataPointAddresses.length,
      dataPoints: dataPointAddresses
    });
    
    return dataPointAddresses;
  }
  
  async getResource(path: string): Promise<{
    metadata: ResourceMetadata;
    dataPoints: string[];
  }> {
    const [metadata, dataPoints] = await Promise.all([
      this.storage.readMetadata(path),
      this.storage.readResource(path)
    ]);
    
    return { metadata, dataPoints };
  }
  
  async createCustomHeader(
    allowedMethods: Method[],
    cacheControl?: {
      maxAge?: number;
      noStore?: boolean;
      noCache?: boolean;
      immutableFlag?: boolean;
      publicFlag?: boolean;
    }
  ): Promise<string> {
    // Convert methods array to bitmask
    const methodsBitmask = allowedMethods.reduce((mask, method) => mask | (1 << method), 0);
    
    const headerInfo: HeaderInfo = {
      methods: methodsBitmask,
      cache: {
        maxAge: cacheControl?.maxAge || 0,
        noStore: cacheControl?.noStore || false,
        noCache: cacheControl?.noCache || false,
        immutableFlag: cacheControl?.immutableFlag || false,
        publicFlag: cacheControl?.publicFlag || true
      },
      redirect: {
        code: 0,
        location: ""
      },
      resourceAdmin: "0x0000000000000000000000000000000000000000000000000000000000000000"
    };
    
    return await this.storage.createHeader(headerInfo);
  }
}
```

## Type Safety Guidelines

### Proper TypeScript Usage Patterns
```typescript
// Always use generated types from the package
import type { 
  HEADRequest, 
  HEADResponse,
  LOCATERequest,
  LOCATEResponse,
  Method,
  ResourceMetadata
} from 'wttp-core';

// Type-safe request construction
function createWTTPRequest(
  path: string, 
  method: Method = Method.HEAD
): HEADRequest {
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
function isValidResponse(response: HEADResponse): boolean {
  return (
    response.responseLine.code >= 200 && 
    response.responseLine.code < 300 &&
    response.responseLine.protocol === "WTTP/3.0"
  );
}

// Method bitmask utilities
function methodsToMask(methods: Method[]): number {
  return methods.reduce((mask, method) => mask | (1 << method), 0);
}

function maskToMethods(mask: number): Method[] {
  const methods: Method[] = [];
  for (let i = 0; i < 9; i++) {
    if (mask & (1 << i)) {
      methods.push(i as Method);
    }
  }
  return methods;
}
```

### Type Assertions and Runtime Validation
```typescript
// Safe type assertions with validation
function assertValidAddress(address: string): asserts address is string {
  if (!ethers.isAddress(address)) {
    throw new Error(`Invalid address: ${address}`);
  }
}

// Type guards for runtime validation
function isResourceMetadata(obj: any): obj is ResourceMetadata {
  return (
    obj &&
    typeof obj.mimeType === 'string' &&
    typeof obj.size === 'bigint' &&
    typeof obj.version === 'bigint' &&
    typeof obj.lastModified === 'bigint'
  );
}

// Error handling with discriminated unions
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
      if (error.message.includes('Forbidden') || error.message.includes('InvalidRole')) {
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

### Performance Optimization
```typescript
// Batch operations for efficiency
async function batchSiteRequests(
  site: IWTTPSite,
  paths: string[],
  options: { concurrency?: number } = {}
): Promise<HEADResponse[]> {
  const { concurrency = 5 } = options;
  
  const requests = paths.map(path => createWTTPRequest(path, Method.HEAD));
  
  // Process in chunks to avoid overwhelming the RPC
  const results: HEADResponse[] = [];
  for (let i = 0; i < requests.length; i += concurrency) {
    const chunk = requests.slice(i, i + concurrency);
    const chunkPromises = chunk.map(req => site.HEAD(req));
    const chunkResults = await Promise.allSettled(chunkPromises);
    
    results.push(...chunkResults
      .filter((result): result is PromiseFulfilledResult<HEADResponse> => 
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
- **Role Checks**: Verify user roles before write operations using `hasRole()`
- **Input Sanitization**: Validate all path and content inputs
- **Method Validation**: Check allowed methods using OPTIONS before requests
- **Gas Limits**: Set appropriate gas limits for storage operations

### Protocol-Specific Behaviors
- **WTTP/3.0 Compliance**: All requests must use "WTTP/3.0" protocol identifier
- **Method Enum**: Use the Method enum for type safety and correct values
- **Data Point Addressing**: Content is stored in chunks via ESP data points
- **Role-Based Access**: Use bytes32 role identifiers for permission management
- **Header System**: Headers define allowed methods and cache behavior

### Upgrade/Migration Considerations
- **Interface Stability**: Current interfaces are designed for long-term stability
- **Storage Migration**: Use storage contract upgrade patterns for data migration
- **Role Migration**: Plan role transfers when upgrading permission systems
- **Type Updates**: Keep TypeScript types synchronized with contract changes

## Quick Reference

### Core Functions Summary
| Interface | Method | Purpose | Gas Cost |
|-----------|--------|---------|----------|
| IWTTPSite | `HEAD()` | Get resource metadata | Low (view) |
| IWTTPSite | `GET()` | Get resource location | Low (view) |
| IWTTPSite | `LOCATE()` | Get data point addresses | Low (view) |
| IWTTPSite | `OPTIONS()` | Get allowed methods | Low (view) |
| IWTTPGateway | `HEAD()` | Proxy HEAD to site | Low (view) |
| IWTTPGateway | `GET()` | Handle ranged GET | Low (view) |
| IWTTPStorage | `uploadResource()` | Store resource chunks | High |
| IWTTPStorage | `readResource()` | Get data points | Low (view) |
| IWTTPPermissions | `hasRole()` | Check role | Low (view) |
| IWTTPPermissions | `grantRole()` | Grant role | Medium |

### Method Enum Values
| Method | Value | Purpose |
|--------|-------|---------|
| HEAD | 0 | Get metadata only |
| GET | 1 | Get content |
| POST | 2 | Submit data |
| PUT | 3 | Create/replace resource |
| PATCH | 4 | Update resource parts |
| DELETE | 5 | Remove resource |
| OPTIONS | 6 | Query allowed methods |
| LOCATE | 7 | Get storage locations |
| DEFINE | 8 | Update headers |

### Common Parameters
| Parameter | Type | Format | Example |
|-----------|------|--------|---------|
| `protocol` | string | "WTTP/3.0" | "WTTP/3.0" |
| `path` | string | Unix-style path | "/index.html" |
| `method` | Method | Enum value | Method.HEAD |
| `role` | bytes32 | Hex string | "0x1234..." |
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

*This LLM context provides complete integration guidance for WTTP Core v3.0. All code examples are production-ready and follow TypeScript best practices. Interface definitions match the actual Solidity contracts.* 