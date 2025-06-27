#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Comprehensive Import Compatibility Tests for wttp-core\n');

const tests = [
  {
    name: 'CommonJS Basic Tests',
    directory: 'cjs-test',
    command: 'npm',
    args: ['test'],
    description: 'Basic CommonJS require() imports for wttp-core'
  },
  {
    name: 'CommonJS Advanced Tests', 
    directory: 'cjs-test',
    command: 'npm',
    args: ['run', 'test:imports'],
    description: 'Advanced CommonJS functionality and subpath exports'
  },
  {
    name: 'ESM Basic Tests',
    directory: 'esm-test', 
    command: 'npm',
    args: ['test'],
    description: 'Basic ES Module import syntax for wttp-core'
  },
  {
    name: 'ESM Advanced Tests',
    directory: 'esm-test',
    command: 'npm', 
    args: ['run', 'test:imports'],
    description: 'Advanced ESM functionality and dynamic imports'
  }
];

async function runTest(test) {
  return new Promise((resolve, reject) => {
    console.log(`\n📦 Running: ${test.name}`);
    console.log(`📁 Directory: ${test.directory}`);
    console.log(`📝 Description: ${test.description}`);
    console.log('─'.repeat(60));

    const testDir = path.join(__dirname, test.directory);
    
    const child = spawn(test.command, test.args, {
      cwd: testDir,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${test.name} - PASSED`);
        resolve({ test: test.name, status: 'PASSED', code });
      } else {
        console.log(`❌ ${test.name} - FAILED (exit code: ${code})`);
        reject(new Error(`${test.name} failed with exit code ${code}`));
      }
    });

    child.on('error', (err) => {
      console.log(`❌ ${test.name} - ERROR: ${err.message}`);
      reject(err);
    });
  });
}

async function installDependencies() {
  console.log('📦 Installing test dependencies...\n');
  
  const directories = ['cjs-test', 'esm-test'];
  
  for (const dir of directories) {
    const testDir = path.join(__dirname, dir);
    console.log(`Installing dependencies in ${dir}...`);
    
    await new Promise((resolve, reject) => {
      const child = spawn('npm', ['install'], {
        cwd: testDir,
        stdio: 'inherit',
        shell: process.platform === 'win32'
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(`✅ Dependencies installed in ${dir}`);
          resolve();
        } else {
          reject(new Error(`Failed to install dependencies in ${dir}`));
        }
      });

      child.on('error', reject);
    });
  }
  
  console.log('\n✅ All dependencies installed successfully!\n');
}

async function checkWttpCoreBuild() {
  console.log('🔍 Checking wttp-core build status...\n');
  
  const fs = require('fs');
  const distPath = path.join(__dirname, '..', 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('⚠️  Warning: dist/ directory not found. You may need to run "npm run build" first.');
    return false;
  }
  
  const cjsPath = path.join(distPath, 'cjs', 'src', 'index.js');
  const esmPath = path.join(distPath, 'esm', 'src', 'index.js');
  const typesPath = path.join(distPath, 'types', 'src', 'index.d.ts');
  
  const buildExists = fs.existsSync(cjsPath) && fs.existsSync(esmPath) && fs.existsSync(typesPath);
  
  if (buildExists) {
    console.log('✅ Build files found - ready for testing\n');
    return true;
  } else {
    console.log('⚠️  Warning: Some build files missing. You may need to run "npm run build" first.');
    console.log(`   - CJS build: ${fs.existsSync(cjsPath) ? '✓' : '✗'}`);
    console.log(`   - ESM build: ${fs.existsSync(esmPath) ? '✓' : '✗'}`);
    console.log(`   - Types: ${fs.existsSync(typesPath) ? '✓' : '✗'}\n`);
    return false;
  }
}

async function main() {
  const startTime = Date.now();
  const results = [];
  
  try {
    // Check build status
    const buildReady = await checkWttpCoreBuild();
    if (!buildReady) {
      console.log('🔨 Consider running "npm run build" in the parent directory first\n');
    }
    
    await installDependencies();
    
    for (const test of tests) {
      try {
        const result = await runTest(test);
        results.push(result);
      } catch (error) {
        results.push({ 
          test: test.name, 
          status: 'FAILED', 
          error: error.message 
        });
      }
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 WTTP-CORE COMPATIBILITY TEST SUMMARY');
    console.log('='.repeat(60));
    
    const passed = results.filter(r => r.status === 'PASSED').length;
    const failed = results.filter(r => r.status === 'FAILED').length;
    
    console.log(`⏱️  Total Duration: ${duration}s`);
    console.log(`✅ Passed: ${passed}/${results.length}`);
    console.log(`❌ Failed: ${failed}/${results.length}`);
    
    results.forEach(result => {
      const icon = result.status === 'PASSED' ? '✅' : '❌';
      console.log(`${icon} ${result.test}: ${result.status}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });
    
    if (failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED!');
      console.log('📦 wttp-core is fully compatible with both CommonJS and ES Module environments');
      console.log('🚀 Your package is ready for dual-module consumption');
    } else {
      console.log('\n❌ SOME TESTS FAILED');
      console.log('💡 Check the output above for details on what needs to be fixed');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test runner failed:', error.message);
    process.exit(1);
  }
}

// Add helpful usage information
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🧪 WTTP-Core Compatibility Test Runner

Usage:
  node run-all-tests.js

Pre-requisites:
  1. Ensure wttp-core is built: npm run build
  2. Run from test-compatibility/ directory

What this tests:
  ✓ CommonJS require() imports work correctly
  ✓ ES Module import/export syntax works correctly  
  ✓ Subpath exports (/constants, /types, /artifacts) work
  ✓ Functions and constants are accessible and functional
  ✓ Enum values are preserved across module systems
  ✓ Complex functionality works in both environments

Troubleshooting:
  - If tests fail, ensure "npm run build" completed successfully
  - Check that dist/ directory contains cjs/, esm/, and types/ folders
  - Verify package.json exports field is properly configured
  `);
  process.exit(0);
}

main(); 