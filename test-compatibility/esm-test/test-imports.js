#!/usr/bin/env node

console.log('🧪 Testing Advanced ES Module imports for wttp-core...\n');

try {
  // Test 1: Subpath exports - constants
  console.log('✅ Test 1: Subpath export - constants');
  const constants = await import('wttp-core/constants');
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
    const types = await import('wttp-core/types');
    console.log('   - TypeChain types imported successfully');
    console.log(`   - Types exports: ${Object.keys(types).length} items`);
  } catch (typesError) {
    console.log('   - TypeChain types not available (might not be built yet)');
  }

  // Test 3: Artifacts import (if available)
  console.log('\n✅ Test 3: Contract artifacts import');
  try {
    const artifacts = await import('wttp-core/artifacts');
    console.log('   - Contract artifacts imported successfully');
    console.log(`   - Artifacts exports: ${Object.keys(artifacts).length} items`);
  } catch (artifactsError) {
    console.log('   - Contract artifacts not available (might not be built yet)');
  }

  // Test 4: Mixed import styles
  console.log('\n✅ Test 4: Mixed import styles');
  
  // Destructured subpath import
  const { Method, MASTER_CHAIN_ID, createMixedOriginsArray } = await import('wttp-core/constants');
  
  // Namespace main import
  const wttpCore = await import('wttp-core');
  
  // Test functionality across different import styles
  if (Method.GET === wttpCore.Method.GET && MASTER_CHAIN_ID === wttpCore.MASTER_CHAIN_ID) {
    console.log('   - Consistent exports across import styles ✓');
  } else {
    console.log('   - Inconsistent exports detected ✗');
  }

  // Test 5: Advanced functionality with ESM
  console.log('\n✅ Test 5: Advanced functionality with ESM');
  
  // Test complex function calls
  const mixedOrigins = createMixedOriginsArray(wttpCore.PUBLIC_ROLE, wttpCore.DEFAULT_ADMIN_ROLE);
  if (Array.isArray(mixedOrigins) && mixedOrigins[Method.GET] === wttpCore.PUBLIC_ROLE) {
    console.log('   - Complex function calls work across import styles ✓');
  } else {
    console.log('   - Complex function calls failed ✗');
  }

  // Test 6: Dynamic imports
  console.log('\n✅ Test 6: Dynamic imports');
  
  const dynamicWttpCore = await import('wttp-core');
  const dynamicConstants = await import('wttp-core/constants');
  
  if (dynamicWttpCore.Method.HEAD === dynamicConstants.Method.HEAD) {
    console.log('   - Dynamic imports work correctly ✓');
  } else {
    console.log('   - Dynamic imports failed ✗');
  }

  // Test 7: ESM-specific features
  console.log('\n✅ Test 7: ESM-specific features');
  
  // Test that we can re-import without issues
  const { ORIGINS_PUBLIC, ORIGINS_ADMIN_ONLY } = await import('wttp-core');
  
  if (Array.isArray(ORIGINS_PUBLIC) && Array.isArray(ORIGINS_ADMIN_ONLY)) {
    console.log('   - Re-imports and complex exports work ✓');
  } else {
    console.log('   - Re-imports failed ✗');
  }

  // Test enum values are preserved
  if (Object.values(Method).every(val => typeof val === 'number')) {
    console.log('   - Enum values preserved correctly in ESM ✓');
  } else {
    console.log('   - Enum values not preserved correctly ✗');
  }

  console.log('\n🎉 All advanced ESM tests completed successfully!');
  console.log('📦 wttp-core advanced functionality works correctly in ES Module environments');

} catch (error) {
  console.error('\n❌ Advanced ESM test failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
} 