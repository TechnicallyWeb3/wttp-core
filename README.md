# WTTP Core

**Version:** 0.1.0  
Core contracts, interfaces, and TypeScript types for the Web3 Transfer Protocol (WTTP).

## Overview

WTTP Core provides the foundational contracts and type definitions used across the WTTP ecosystem. This package serves as the base dependency for all WTTP implementations including sites, gateways, and client applications.

## Features

- **Complete Type Definitions**: All WTTP protocol structures and interfaces
- **Interface Contracts**: Standard interfaces for Site, Gateway, Storage, and Permissions
- **TypeChain Types**: Generated TypeScript types for seamless web3 integration
- **ESP Integration**: Built-in support for External Service Provider data points

## Installation

```bash
# Install from npm
npm install wttp-core

# Or install the organizational scoped package
npm install @tw3/wttp-core
```

## Usage

### Import Solidity Interfaces

```solidity
import "wttp-core/contracts/interfaces/IWTTPSite.sol";
import "wttp-core/contracts/interfaces/WTTPTypes.sol";

contract MyWTTPImplementation {
    using WTTPTypes for WTTPTypes.RequestLine;
    
    function processRequest(WTTPTypes.HEADRequest memory request) external {
        // Your implementation here
    }
}
```

### Import TypeScript Types

```typescript
import { 
  RequestLine, 
  HEADRequest, 
  HEADResponse,
  Method,
  artifacts,
  IWTTPSite__factory
} from "wttp-core";

// Use types in your TypeScript application
const request: HEADRequest = {
  requestLine: {
    protocol: "WTTP/3.0",
    path: "/index.html",
    method: Method.HEAD
  },
  ifModifiedSince: 0,
  ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
};

// Access contract artifacts
const siteABI = artifacts.IWTTPSite.abi;

// Connect to contracts
const site = IWTTPSite__factory.connect(siteAddress, provider);
```

### Working with WTTP Sites

```typescript
import { ethers } from 'ethers';
import { IWTTPSite__factory, Method } from 'wttp-core';

async function querySiteContent(siteAddress: string, path: string) {
  const provider = new ethers.JsonRpcProvider('your-rpc-url');
  const site = IWTTPSite__factory.connect(siteAddress, provider);
  
  const response = await site.HEAD({
    requestLine: {
      protocol: "WTTP/3.0",
      path: path,
      method: Method.HEAD
    },
    ifModifiedSince: 0,
    ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
  });
  
  console.log('Content metadata:', {
    statusCode: response.responseLine.code,
    mimeType: response.metadata.mimeType,
    size: response.metadata.size.toString()
  });
}
```

## Package Contents

- **contracts/interfaces/**: Core Solidity interface definitions
  - `IWTTPSite.sol` - Site interface for content serving
  - `IWTTPGateway.sol` - Gateway interface for routing and ranges
  - `IWTTPStorage.sol` - Storage interface for content management
  - `IWTTPPermissions.sol` - Permissions interface for access control
  - `WTTPTypes.sol` - Complete protocol type definitions
- **typechain-types/**: Generated TypeScript type definitions
- **artifacts/**: Compiled contract artifacts
- **dist/**: Built package with CJS, ESM, and TypeScript declarations

## Related Packages

- `@tw3/wttp-sites` - WTTP Site contract implementations
- `@tw3/wttp-gateway` - WTTP Gateway contract implementations  
- `@tw3/wttp-client` - Client libraries for WTTP interaction
- `@tw3/esp` - External Service Provider framework (dependency)

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## Support

- [Documentation](https://docs.technicallyWeb3.io/wttp)
- [GitHub Issues](https://github.com/TechnicallyWeb3/wttp-core/issues)
- [Discord Community](https://discord.gg/technicallyWeb3)
