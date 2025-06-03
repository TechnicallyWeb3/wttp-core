# WTTP Core

Core contracts, interfaces, and TypeScript types for the Web3 Transfer Protocol (WTTP).

## Overview

WTTP Core provides the foundational contracts and type definitions used across the WTTP ecosystem. This package serves as the base dependency for all WTTP implementations including sites, gateways, and client applications.

## Features

- **Complete Type Definitions**: All WTTP protocol structures and interfaces
- **Interface Contracts**: Standard interfaces for Site, Gateway, Storage, and Permissions
- **TypeChain Types**: Generated TypeScript types for seamless web3 integration
- **Helper Functions**: Utilities for working with WTTP data structures

## Installation

```bash
npm install @technicallyWeb3/wttp-core
```

## Usage

### Import Solidity Interfaces

```solidity
import "@technicallyWeb3/wttp-core/contracts/interfaces/IWTTPSiteV3.sol";
import "@technicallyWeb3/wttp-core/contracts/interfaces/WTTPTypes.sol";

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
  artifacts
} from "@technicallyWeb3/wttp-core";

// Use types in your TypeScript application
const request: HEADRequest = {
  requestLine: {
    protocol: "WTTP/3.0",
    path: "/index.html",
    method: Method.GET
  },
  ifModifiedSince: 0,
  ifNoneMatch: "0x0000000000000000000000000000000000000000000000000000000000000000"
};

// Access contract artifacts
const siteABI = artifacts.IWTTPSiteV3.abi;
```

## Package Contents

- **contracts/interfaces/**: Core Solidity interface definitions
- **typechain-types/**: Generated TypeScript type definitions
- **artifacts/**: Compiled contract artifacts

## Related Packages

- `@technicallyWeb3/wttp-sites` - WTTP Site contract implementations
- `@technicallyWeb3/wttp-gateway` - WTTP Gateway contract implementations
- `@technicallyWeb3/wttp-client` - Client libraries for WTTP interaction

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## Support

- [Documentation](https://docs.technicallyWeb3.io/wttp)
- [GitHub Issues](https://github.com/TechnicallyWeb3/wttp-core/issues)
- [Discord Community](https://discord.gg/technicallyWeb3)
