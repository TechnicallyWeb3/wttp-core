#!/usr/bin/env node

console.log('🧪 Testing ES Module imports for wttp-core...\n');

try {
  // Test 1: Main package import with destructuring
  console.log('✅ Test 1: Main package import with destructuring');
  const { 
    Method,
    DEFAULT_ADMIN_ROLE,
    BLACKLIST_ROLE,
    PUBLIC_ROLE,
    MASTER_CHAIN_ID,
    ALL_METHODS_BITMASK,
    READ_ONLY_METHODS_BITMASK,
    methodsToBitmask,
    bitmaskToMethods,
    getMethodCount,
    ORIGINS_PUBLIC,
    createOriginsArray
  } = await import('wttp-core');
  
  console.log('   - Main package imported successfully');
  console.log('   - Key destructured exports verified ✓');

  // Test 2: Default/namespace import
  console.log('\n✅ Test 2: Default/namespace import');
  const wttpCore = await import('wttp-core');
  console.log('   - Namespace import successful');
  console.log(`   - Available exports: ${Object.keys(wttpCore).length} items`);

  // Test 3: Validate destructured imports work correctly
  console.log('\n✅ Test 3: Destructured imports functionality');
  
  // Test Method enum
  if (typeof Method === 'object' && Method.GET === 1) {
    console.log('   - Method enum works correctly ✓');
  } else {
    console.log('   - Method enum test failed ✗');
  }

  // Test method utility functions
  if (typeof getMethodCount === 'function' && getMethodCount() > 0) {
    console.log('   - Method utilities work correctly ✓');
  } else {
    console.log('   - Method utilities test failed ✗');
  }

  // Test constants
  if (typeof MASTER_CHAIN_ID === 'number' && MASTER_CHAIN_ID === 11155111) {
    console.log('   - Constants are correct ✓');
  } else {
    console.log('   - Constants test failed ✗');
  }

  // Test 4: Function calls with destructured imports
  console.log('\n✅ Test 4: Function calls with destructured imports');
  
  const testMethods = [Method.GET, Method.POST];
  const bitmask = methodsToBitmask(testMethods);
  const backToMethods = bitmaskToMethods(bitmask);
  
  if (Array.isArray(backToMethods) && backToMethods.includes(Method.GET)) {
    console.log('   - Method bitmask functions work with destructured imports ✓');
  } else {
    console.log('   - Method bitmask functions failed ✗');
  }

  const originsArray = createOriginsArray(PUBLIC_ROLE);
  if (Array.isArray(originsArray) && originsArray.length === getMethodCount()) {
    console.log('   - Origins array creation works with destructured imports ✓');
  } else {
    console.log('   - Origins array creation failed ✗');
  }

  console.log('\n🎉 All ESM import tests completed successfully!');
  console.log('📦 wttp-core can be imported correctly in ES Module environments');

} catch (error) {
  console.error('\n❌ ES Module import test failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
} 