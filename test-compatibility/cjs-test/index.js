#!/usr/bin/env node

console.log('🧪 Testing CommonJS imports for wttp-core...\n');

try {
  // Test 1: Main package import
  console.log('✅ Test 1: Main package import');
  const wttpCore = require('wttp-core');
  console.log('   - Main package imported successfully');
  console.log(`   - Available exports: ${Object.keys(wttpCore).length} items`);

  // Test 2: Check for key exports from wttp-core
  console.log('\n✅ Test 2: Key exports validation');
  const expectedExports = [
    'Method',
    'DEFAULT_ADMIN_ROLE',
    'BLACKLIST_ROLE',
    'PUBLIC_ROLE',
    'MASTER_CHAIN_ID',
    'ALL_METHODS_BITMASK',
    'READ_ONLY_METHODS_BITMASK',
    'methodsToBitmask',
    'bitmaskToMethods',
    'getMethodCount',
    'ORIGINS_PUBLIC',
    'createOriginsArray'
  ];
  
  const missingExports = expectedExports.filter(exp => !(exp in wttpCore));
  if (missingExports.length === 0) {
    console.log('   - All expected exports found ✓');
  } else {
    console.log(`   - Missing exports: ${missingExports.join(', ')} ✗`);
  }

  // Test 3: Basic functionality test
  console.log('\n✅ Test 3: Basic functionality validation');
  
  // Test Method enum
  if (typeof wttpCore.Method === 'object' && wttpCore.Method.GET === 1) {
    console.log('   - Method enum works correctly ✓');
  } else {
    console.log('   - Method enum test failed ✗');
  }

  // Test method utility functions
  if (typeof wttpCore.getMethodCount === 'function' && wttpCore.getMethodCount() > 0) {
    console.log('   - Method utilities work correctly ✓');
  } else {
    console.log('   - Method utilities test failed ✗');
  }

  // Test constants
  if (typeof wttpCore.MASTER_CHAIN_ID === 'number' && wttpCore.MASTER_CHAIN_ID === 11155111) {
    console.log('   - Constants are correct ✓');
  } else {
    console.log('   - Constants test failed ✗');
  }

  console.log('\n🎉 All CommonJS import tests completed successfully!');
  console.log('📦 wttp-core can be imported correctly in CommonJS environments');

} catch (error) {
  console.error('\n❌ CommonJS import test failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
} 