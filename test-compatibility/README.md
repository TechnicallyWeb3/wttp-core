# WTTP-Core CJS/ESM Compatibility Testing

This directory contains comprehensive tests to ensure `wttp-core` works correctly in both CommonJS (CJS) and ES Module (ESM) environments.

## Quick Start

### Prerequisites
1. Build the package first:
   ```bash
   npm run build
   ```

2. Run the compatibility tests:
   ```bash
   npm run test:compatibility
   ```

### Manual Testing
You can also run tests manually from this directory:

```bash
cd test-compatibility
node run-all-tests.js
```

## Test Structure

```
test-compatibility/
├── cjs-test/              # CommonJS test environment
│   ├── package.json       # CJS package config
│   ├── index.js          # Basic CJS import tests
│   └── test-imports.js   # Advanced CJS functionality tests
├── esm-test/              # ES Module test environment
│   ├── package.json       # ESM package config (type: "module")
│   ├── index.js          # Basic ESM import tests
│   └── test-imports.js   # Advanced ESM functionality tests
├── run-all-tests.js       # Main test runner
└── README.md             # This file
```

## What Gets Tested

### ✅ Basic Import Functionality
- **CommonJS**: `require('wttp-core')` works correctly
- **ESM**: `import * from 'wttp-core'` and destructured imports work
- **Exports validation**: All expected exports are available

### ✅ Subpath Exports
- `wttp-core/constants` - Constants and utilities
- `wttp-core/types` - TypeChain generated types
- `wttp-core/artifacts` - Contract artifacts

### ✅ Core Functionality Tests
- **Method enum**: Values and functionality preserved
- **Utility functions**: `methodsToBitmask()`, `bitmaskToMethods()`, etc.
- **Constants**: Role constants, chain IDs, presets
- **Complex operations**: Origins array creation, mixed role assignments

### ✅ Advanced Features
- **Dynamic imports** (ESM)
- **Mixed import styles** (ESM)
- **Re-import consistency** (ESM)
- **Cross-module consistency** between different import methods

## Expected Test Results

When all tests pass, you should see:

```
🎉 ALL TESTS PASSED!
📦 wttp-core is fully compatible with both CommonJS and ES Module environments
🚀 Your package is ready for dual-module consumption
```

## Troubleshooting

### Build Issues
If tests fail with import errors:
1. Ensure `npm run build` completed successfully
2. Check that `dist/` directory contains:
   - `dist/cjs/src/index.js`
   - `dist/esm/src/index.js`
   - `dist/types/src/index.d.ts`

### Missing Exports
If specific exports are missing:
1. Check that the export exists in `src/index.ts`
2. Verify the export is included in the build output
3. Ensure `package.json` exports field is correct

### TypeChain Dependencies
Some tests may show warnings about TypeChain types or artifacts if:
- Contracts haven't been compiled yet (`npm run compile`)
- TypeChain types haven't been generated (`npm run typechain`)

This is expected and won't cause test failures.

## Test Configuration

### CJS Test Environment
- Uses regular Node.js CommonJS environment
- Tests `require()` imports
- Validates that all functionality works in traditional Node.js projects

### ESM Test Environment  
- Uses `"type": "module"` in package.json
- Tests `import`/`export` syntax
- Validates modern ES Module features like dynamic imports

## Integration with CI/CD

The compatibility tests are automatically run during the publish process via the `prepublishOnly` script. This ensures that any package published to npm has been verified to work in both module environments.

To run tests in CI/CD:

```bash
# Build and test
npm run build
npm run test:compatibility
```

## Adding New Tests

To add tests for new exports:

1. **Update expected exports** in both `cjs-test/index.js` and `esm-test/index.js`
2. **Add functionality tests** in the respective `test-imports.js` files
3. **Test subpath exports** if you've added new ones to `package.json`

## Help and Debugging

For detailed usage information:
```bash
npm run test:compatibility:help
```

This will show additional troubleshooting information and configuration details. 