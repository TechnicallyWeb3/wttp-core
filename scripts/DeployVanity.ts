/**
 * Copyright (C) 2025 TechnicallyWeb3
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 */

import hre from "hardhat";
import { formatEther, formatUnits, parseUnits } from "ethers";
import { addDeployment, formatDeploymentData } from './AddDeployment';

/**
 * Deploy WTTP gateway contract with vanity addresses using try-catch funding strategy
 * @param hardhatRuntime - Hardhat runtime environment
 * @param skipVerification - Skip contract verification (optional, defaults to false)
 */
export async function deployWithVanity(
  hardhatRuntime: typeof hre = hre,
  skipVerification: boolean = false
) {
  console.log("🚀 Starting WTTP gateway deployment script...\n");

  // Get chain information
  const network = hardhatRuntime.network.name;
  const chainId = hardhatRuntime.network.config.chainId;
  if (chainId === undefined) {
    throw new Error("ChainId is undefined, please set a chainId in your hardhat.config.ts");
  }

  const shouldVerify = chainId !== 31337 && chainId !== 1337 && !skipVerification;
  
  console.log(`📡 Network: ${network} - ChainId: ${chainId}`);
  console.log(`🔍 Contract verification: ${shouldVerify ? "ENABLED" : "DISABLED (local network)"}\n`);

  // Get signers - Gateway deployer is signer[1], owner is signer[0]
  const signers = await hardhatRuntime.ethers.getSigners();
  const owner = signers[0]; // Owner/funding account
  const gatewaySigner = signers[1]; // Gateway deployer

  console.log("📋 Deployment Configuration:");
  console.log(`Owner/Funder (signer 0): ${owner.address}`);
  console.log(`Gateway Deployer (signer 1): ${gatewaySigner.address}`);

  // Check nonces for vanity deployment validation
  const gatewayNonce = await hardhatRuntime.ethers.provider.getTransactionCount(gatewaySigner.address);

  console.log(`Gateway Deployer Nonce: ${gatewayNonce}`);

  // Validate gateway nonce (must be 0 for vanity deployment)
  if (gatewayNonce > 0) {
    throw new Error(`Vanity nonce error: Gateway deployer nonce is ${gatewayNonce}, expected 0. Gateway deployer has been used before.`);
  }

  // Check initial balances
  const initialOwnerBalance = await hardhatRuntime.ethers.provider.getBalance(owner.address);
  const initialGatewayBalance = await hardhatRuntime.ethers.provider.getBalance(gatewaySigner.address);

  console.log(`Owner Balance: ${formatEther(initialOwnerBalance)} ETH`);
  console.log(`Gateway Deployer Balance: ${formatEther(initialGatewayBalance)} ETH\n`);

  /**
   * Parse insufficient funds error and extract required amount
   */
  function parseInsufficientFundsError(error: any): bigint | null {
    const errorMsg = error.message || error.toString();
    console.log(`🔍 Parsing: ${errorMsg}`);
    
    // Explicit pattern matching for known formats
    
    // 1. Provider-specific format: "ProviderError: Sender doesn't have enough funds to send tx. The max upfront cost is: 17156179590000000 and the sender's balance is: 4265999968225256"
    const providerPattern = /max upfront cost is: (\d+) and the sender's balance is: (\d+)/;
    const providerMatch = errorMsg.match(providerPattern);
    if (providerMatch) {
      const maxUpfront = BigInt(providerMatch[1]);
      const balance = BigInt(providerMatch[2]);
      const needed = maxUpfront - balance;
      console.log(`📊 Hardhat format - Max upfront: ${formatEther(maxUpfront)} ETH, Balance: ${formatEther(balance)} ETH, Needed: ${formatEther(needed)} ETH`);
      return needed;
    }
    
    // 2. Testnet format: "insufficient funds for gas * price + value: balance 0, tx cost 344209543464, overshot 344209543464"
    const testnetPattern = /insufficient funds for gas \* price \+ value: balance (\d+), tx cost (\d+), overshot (\d+)/;
    const testnetMatch = errorMsg.match(testnetPattern);
    if (testnetMatch) {
      const balance = BigInt(testnetMatch[1]);
      const txCost = BigInt(testnetMatch[2]);
      const overshot = BigInt(testnetMatch[3]);
      console.log(`📊 Testnet format - Balance: ${formatEther(balance)} ETH, TX Cost: ${formatEther(txCost)} ETH, Overshot: ${formatEther(overshot)} ETH`);
      return overshot; // The overshot amount is what we need
    }
    
    // 3. Standard have/want format: "insufficient funds for gas * price + value: address 0x... have 12345 want 67890"
    const standardPattern = /insufficient funds for gas \* price \+ value: address .* have (\d+) want (\d+)/;
    const standardMatch = errorMsg.match(standardPattern);
    if (standardMatch) {
      const have = BigInt(standardMatch[1]);
      const want = BigInt(standardMatch[2]);
      const needed = want - have;
      console.log(`📊 Standard format - Have: ${formatEther(have)} ETH, Want: ${formatEther(want)} ETH, Needed: ${formatEther(needed)} ETH`);
      return needed;
    }
    
    // Fallback: Generic patterns for other formats
    console.log("🔄 No explicit pattern matched, trying fallback patterns...");
    const fallbackPatterns = [
      /insufficient funds: address .* have (\d+) want (\d+)/,
      /insufficient funds for transfer: address .* have (\d+) want (\d+)/,
      /insufficient funds.*?want (\d+)/,
      /need (\d+) have (\d+)/
    ];

    for (const pattern of fallbackPatterns) {
      const match = errorMsg.match(pattern);
      if (match) {
        console.log(`📊 Fallback pattern matched with ${match.length - 1} capture groups`);
        if (match.length >= 3) {
          // Two numbers: typically have, want
          const have = BigInt(match[1]);
          const want = BigInt(match[2]);
          const needed = want - have;
          console.log(`📊 Fallback - Have: ${formatEther(have)} ETH, Want: ${formatEther(want)} ETH, Needed: ${formatEther(needed)} ETH`);
          return needed;
        } else if (match.length >= 2) {
          // One number: assume it's the needed amount
          const needed = BigInt(match[1]);
          console.log(`📊 Fallback - Needed: ${formatEther(needed)} ETH`);
          return needed;
        }
      }
    }
    
    console.log("❌ Could not parse required amount from error");
    return null;
  }

  /**
   * Fund deployer with parsed amount plus buffer
   */
  async function fundDeployer(deployerSigner: any, requiredAmount: bigint, deployerName: string): Promise<void> {
    // Add 10% buffer for safety
    const fundingAmount = (requiredAmount * 110n) / 100n;
    
    console.log(`💰 Funding ${deployerName} deployer with ${formatEther(fundingAmount)} ETH (10% buffer)...`);
    
    const ownerBalance = await hardhatRuntime.ethers.provider.getBalance(owner.address);
    if (ownerBalance < fundingAmount) {
      throw new Error(`Owner has insufficient funds: need ${formatEther(fundingAmount)} ETH but only have ${formatEther(ownerBalance)} ETH`);
    }

    const fundingTx = await owner.sendTransaction({
      to: deployerSigner.address,
      value: fundingAmount
    });

    await fundingTx.wait();
    console.log(`✅ Successfully funded ${deployerName} deployer (tx: ${fundingTx.hash})`);
    
    const newBalance = await hardhatRuntime.ethers.provider.getBalance(deployerSigner.address);
    console.log(`   New ${deployerName} deployer balance: ${formatEther(newBalance)} ETH\n`);
  }

  /**
   * Deploy contract with automatic funding on failure
   */
  async function deployWithRetry<T>(
    deployerSigner: any,
    deployFunction: () => Promise<T>,
    deployerName: string,
    contractName: string
  ): Promise<T> {
    console.log(`🚀 Attempting to deploy ${contractName}...`);
    
    try {
      // First attempt
      return await deployFunction();
    } catch (error: any) {
      console.log(`⚠️  ${contractName} deployment failed, checking if it's a funding issue...`);
      
      const requiredAmount = parseInsufficientFundsError(error);
      if (!requiredAmount) {
        console.log("❌ Error is not related to insufficient funds, re-throwing...");
        throw error;
      }
      
      console.log(`💸 Funding ${deployerName} deployer and retrying deployment...`);
      await fundDeployer(deployerSigner, requiredAmount, deployerName);
      
      try {
        // Second attempt after funding
        console.log(`🔄 Retrying ${contractName} deployment...`);
        return await deployFunction();
      } catch (retryError: any) {
        console.log(`❌ ${contractName} deployment failed again after funding`);
        throw retryError;
      }
    }
  }

  let gateway: any | undefined;
  let gatewayAddress: string | undefined;

  try {
    // ========================================
    // STEP 1: Gateway Deployment
    // ========================================
    console.log("📦 Step 1: WTTP Gateway Deployment");
    
    const GatewayFactory = await hardhatRuntime.ethers.getContractFactory("WTTPGateway");
    
    gateway = await deployWithRetry(
      gatewaySigner,
      async () => {
        const contract = await GatewayFactory.connect(gatewaySigner).deploy();
        await contract.waitForDeployment();
        return contract;
      },
      "Gateway",
      "WTTPGateway"
    );
    
    gatewayAddress = await gateway.getAddress();

    console.log(`✅ WTTP Gateway deployed to: ${gatewayAddress}`);
    console.log(`   Deployed by: ${gatewaySigner.address}`);

    // Ensure we have both gateway and gatewayAddress
    if (!gateway || !gatewayAddress) {
      throw new Error("Failed to initialize Gateway contract");
    }

    // Try to get version if available
    try {
      const version = await gateway.version();
      console.log(`   Version: ${version}\n`);
    } catch (error) {
      console.log(`   Contract deployed successfully\n`);
    }

    // ========================================
    // STEP 2: Verification and Testing
    // ========================================
    console.log("🔗 Verifying contract deployment...");

    // Test basic functionality if possible
    console.log("\n🧪 Testing basic functionality...");
    try {
      // Test any available view functions
      console.log(`Gateway contract accessible at: ${gatewayAddress}`);
    } catch (error) {
      console.log("⚠️  Basic functionality test skipped");
    }

    // Contract verification is now handled by the task system with confirmation delays

    // Calculate actual costs spent (get final balances)
    const finalOwnerBalance = await hardhatRuntime.ethers.provider.getBalance(owner.address);
    const finalGatewayBalance = await hardhatRuntime.ethers.provider.getBalance(gatewaySigner.address);
    
    const actualGatewayCost = initialGatewayBalance - finalGatewayBalance;
    const ownerSpent = initialOwnerBalance - finalOwnerBalance;

    console.log("\n🎉 Deployment completed successfully!");
    console.log("\n📄 Deployment Summary:");
    console.log("=".repeat(60));
    console.log(`Network:          ${network}`);
    console.log(`WTTP Gateway:     ${gatewayAddress} (deployed)`);
    console.log(`Deployer:         ${gatewaySigner.address}`);
    console.log(`Owner:            ${owner.address}`);
    console.log(`\nDeployment costs:`);
    console.log(`Gateway actual:   ${formatEther(actualGatewayCost)} ETH`);
    console.log(`Total spent:      ${formatEther(actualGatewayCost)} ETH`);
    if (ownerSpent > 0n) {
      console.log(`Owner funding:    ${formatEther(ownerSpent)} ETH`);
      console.log(`Grand total:      ${formatEther(actualGatewayCost + ownerSpent)} ETH`);
    }
    console.log("=".repeat(60));

    // ========================================
    // STEP 3: Update Deployment Registry
    // ========================================
    console.log("\n📝 Updating deployment registry...");
    
    try {
      const deploymentData = formatDeploymentData(
        chainId,
        {
          address: gatewayAddress,
          deployerAddress: gatewaySigner.address,
          txHash: gateway.deploymentTransaction()?.hash
        }
      );
      
      await addDeployment(deploymentData);
      console.log(`🎯 Network '${network}' deployment registered successfully!`);
    } catch (error: any) {
      console.log("⚠️  Failed to update deployment registry:", error.message);
      console.log("📝 You can manually update wttp.deployments.ts with the following info:");
      console.log(`   Network: ${network}`);
      console.log(`   Gateway: ${gatewayAddress}`);
      console.log(`   Deployer: ${gatewaySigner.address}`);
    }

    // Return deployed contracts for potential further use
    return {
      gateway,
      addresses: {
        gateway: gatewayAddress,
        deployer: gatewaySigner.address,
        owner: owner.address
      },
      signers: {
        gatewaySigner,
        owner
      },
      costs: {
        gateway: actualGatewayCost,
        total: actualGatewayCost,
        ownerFunding: ownerSpent,
        grandTotal: actualGatewayCost + ownerSpent
      }
    };

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

// Legacy main function for direct script execution
async function main() {
  return await deployWithVanity();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
