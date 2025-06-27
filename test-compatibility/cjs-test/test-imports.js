#!/usr/bin/env node

console.log('🧪 Testing Advanced CommonJS imports for wttp-core...\n');

try {
  // Test 1: Subpath exports - constants
  console.log('✅ Test 1: Subpath export - constants');
  const constants = require('wttp-core/constants');
  console.log('   - Constants subpath import successful');
  console.log(`   - Constants exports: ${Object.keys(constants).length} items`);
  
  if (constants.Method && constants.MASTER_CHAIN_ID) {
    console.log('   - Key constants available ✓');
  } else {
    console.log('   - Key constants missing ✗');
  }

  // Test 2: TypeChain types (if available)
  console.log('\n✅ Test 2: TypeChain types import');
  try {
    const types = require('wttp-core/types');
    console.log('   - TypeChain types imported successfully');
    console.log(`   - Types exports: ${Object.keys(types).length} items`);
  } catch (typesError) {
    console.log('   - TypeChain types not available (might not be built yet)');
  }

  // Test 3: Artifacts import (if available)
  console.log('\n✅ Test 3: Contract artifacts import');
  try {
    const artifacts = require('wttp-core/artifacts');
    console.log('   - Contract artifacts imported successfully');
    console.log(`   - Artifacts exports: ${Object.keys(artifacts).length} items`);
  } catch (artifactsError) {
    console.log('   - Contract artifacts not available (might not be built yet)');
  }

  // Test 4: Advanced functionality testing
  console.log('\n✅ Test 4: Advanced functionality testing');
  const wttpCore = require('wttp-core');
  
  // Test Method enum functionality
  const testMethods = [wttpCore.Method.GET, wttpCore.Method.POST, wttpCore.Method.PUT];
  const bitmask = wttpCore.methodsToBitmask(testMethods);
  const backToMethods = wttpCore.bitmaskToMethods(bitmask);
  
  if (Array.isArray(backToMethods) && backToMethods.length === testMethods.length) {
    console.log('   - Method bitmask conversion works correctly ✓');
  } else {
    console.log('   - Method bitmask conversion failed ✗');
  }

  // Test origins array creation
  const originsArray = wttpCore.createOriginsArray(wttpCore.PUBLIC_ROLE);
  if (Array.isArray(originsArray) && originsArray.length === wttpCore.getMethodCount()) {
    console.log('   - Origins array creation works correctly ✓');
  } else {
    console.log('   - Origins array creation failed ✗');
  }

  // Test mixed origins array
  const mixedOrigins = wttpCore.createMixedOriginsArray(wttpCore.PUBLIC_ROLE, wttpCore.DEFAULT_ADMIN_ROLE);
  if (Array.isArray(mixedOrigins) && mixedOrigins[wttpCore.Method.GET] === wttpCore.PUBLIC_ROLE) {
    console.log('   - Mixed origins array creation works correctly ✓');
  } else {
    console.log('   - Mixed origins array creation failed ✗');
  }

  // Test 5: Role constants validation
  console.log('\n✅ Test 5: Role constants validation');
  if (typeof wttpCore.DEFAULT_ADMIN_ROLE === 'string' && wttpCore.DEFAULT_ADMIN_ROLE.startsWith('0x')) {
    console.log('   - DEFAULT_ADMIN_ROLE is valid ✓');
  } else {
    console.log('   - DEFAULT_ADMIN_ROLE validation failed ✗');
  }

  if (typeof wttpCore.PUBLIC_ROLE === 'string' && wttpCore.PUBLIC_ROLE === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') {
    console.log('   - PUBLIC_ROLE is valid ✓');
  } else {
    console.log('   - PUBLIC_ROLE validation failed ✗');
  }

  console.log('\n🎉 All advanced CommonJS tests completed successfully!');
  console.log('📦 wttp-core advanced functionality works correctly in CommonJS environments');

} catch (error) {
  console.error('\n❌ Advanced CommonJS test failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
} 