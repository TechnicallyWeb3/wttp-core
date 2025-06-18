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

import { task, types } from "hardhat/config";
import { addDeployment } from "../scripts/AddDeployment";
import { execSync } from "child_process";

task("deploy:vanity", "Deploy WTTP gateway contract with vanity addresses")
  .addFlag(
    "skipVerify",
    "Skip contract verification on block explorer (verification enabled by default)"
  )
  .addOptionalParam(
    "confirmations",
    "Number of confirmations to wait before verification (default: 5)",
    "5",
    types.string
  )
  .addFlag("noRegister", "Skip deployment registration")
  .setAction(async (taskArgs, hre) => {
    console.log(`🚀 WTTP Gateway Vanity Deployment Task`);
    console.log(`🌐 Network: ${hre.network.name}\n`);

    const { skipVerify, confirmations, noRegister } = taskArgs;
    
    try {
      // Import the deployment logic inside the task to avoid circular imports
      const { deployWithVanity } = await import("../scripts/DeployVanity");
      
      // Determine verification setting
      const shouldSkipVerification = skipVerify || false;
      console.log(`🔍 Contract verification: ${shouldSkipVerification ? "DISABLED" : "ENABLED with " + confirmations + " confirmations wait"}`);
      
      // Call the deployment function
      const result = await deployWithVanity(hre, shouldSkipVerification);
      
      console.log(`\n🎉 Vanity deployment completed successfully!`);
      console.log(`📍 Gateway: ${result.addresses.gateway}`);
      console.log(`📍 Deployer: ${result.addresses.deployer}`);
      
      // Enhanced verification with confirmation delay
      if (!shouldSkipVerification && hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log(`\n🔍 Starting enhanced verification with confirmation delay...`);
        
        try {
          await hre.run("deploy:verify", {
            gateway: result.addresses.gateway,
            confirmations: confirmations
          });
        } catch (verifyError) {
          console.log(`⚠️  Verification failed: ${verifyError}`);
          console.log(`You can verify manually using:`);
          console.log(`npx hardhat deploy:verify --gateway ${result.addresses.gateway} --network ${hre.network.name}`);
        }
      }
      
      // Add deployment to registry
      if (!noRegister) {
        const chainId = hre.network.config.chainId;
        if (chainId) {
          await addDeployment({
            chainId: chainId,
            gateway: {
              contractAddress: result.addresses.gateway,
              deployerAddress: result.addresses.deployer,
            },
          });
        } else {
          console.log(`⚠️  Could not register deployment: chainId not found for network ${hre.network.name}`);
        }
      }
      
    } catch (error) {
      console.error("❌ Deployment failed:", error);
      process.exit(1);
    }
  });

// task("deploy:ignition", "Deploy WTTP gateway contract with ignition")
//   .addFlag("noRegister", "Skip deployment registration")
//   .setAction(async (taskArgs, hre) => {
//     console.log(`🚀 WTTP Gateway Ignition Deployment Task`);
//     console.log(`🌐 Network: ${hre.network.name}\n`);

//     const { noRegister } = taskArgs;

//     try {
//       const WTTPCoreModule = (await import("../ignition/modules/WTTPCore")).default;
//       const { wttpGateway } = await hre.ignition.deploy(WTTPCoreModule);

//       const contractAddress = await wttpGateway.getAddress();
//       const deployerAddress = (await hre.ethers.getSigners())[0].address;

//       console.log(`\n🎉 Ignition deployment completed successfully!`);
//       console.log(`📍 WTTP Gateway: ${contractAddress}`);
//       console.log(`👤 Deployer: ${deployerAddress}`);

//       if (!noRegister) {
//         const chainId = hre.network.config.chainId;
//         if (chainId) {
//           await addDeployment({
//             chainId: chainId,
//             gateway: {
//               contractAddress,
//               deployerAddress
//             },
//           });
//         } else {
//           console.log(`⚠️  Could not register deployment: chainId not found for network ${hre.network.name}`);
//         }
//       }

//     } catch (error) {
//       console.error("❌ Deployment failed:", error);
//       process.exit(1);
//     }
//   });

task("deploy:simple", "Deploy WTTP gateway contract (simple deployment)")
  .addFlag(
    "skipVerify",
    "Skip contract verification on block explorer (verification enabled by default)"
  )
  .addOptionalParam(
    "confirmations",
    "Number of confirmations to wait before verification (default: 5)",
    "5",
    types.string
  )
  .addFlag("noRegister", "Skip deployment registration")
  .setAction(async (taskArgs, hre) => {
    console.log(`🚀 WTTP Gateway Simple Deployment Task`);
    console.log(`🌐 Network: ${hre.network.name}\n`);

    const { skipVerify, confirmations, noRegister } = taskArgs;
    
    try {
      // Get deployer
      const signers = await hre.ethers.getSigners();
      const deployer = signers[0];
      console.log(`👤 Deployer: ${deployer.address}`);
      
      // Deploy gateway contract
      console.log(`🚀 Deploying WTTP Gateway...`);
      
      const GatewayFactory = await hre.ethers.getContractFactory("WTTPGateway");
      const gateway = await GatewayFactory.deploy();
      await gateway.waitForDeployment();
      
      const gatewayAddress = await gateway.getAddress();
      const txHash = gateway.deploymentTransaction()?.hash;
      
      console.log(`\n✅ Deployment completed successfully!`);
      console.log(`📍 WTTP Gateway: ${gatewayAddress}`);
      console.log(`👤 Deployer: ${deployer.address}`);
      
      // Enhanced verification with confirmation delay
      if (!skipVerify && hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log(`\n🔍 Starting enhanced verification with confirmation delay...`);
        
        try {
          await hre.run("deploy:verify", {
            gateway: gatewayAddress,
            confirmations: confirmations
          });
        } catch (verifyError) {
          console.log(`⚠️  Verification failed: ${verifyError}`);
          console.log(`You can verify manually using:`);
          console.log(`npx hardhat deploy:verify --gateway ${gatewayAddress} --network ${hre.network.name}`);
        }
      }
      
      // Add deployment to registry
      if (!noRegister) {
        const chainId = hre.network.config.chainId;
        if (chainId) {
          await addDeployment({
            chainId: chainId,
            gateway: {
              contractAddress: gatewayAddress,
              deployerAddress: deployer.address,
              txHash: txHash,
            },
          });
        } else {
          console.log(`⚠️  Could not register deployment: chainId not found for network ${hre.network.name}`);
        }
      }
      
    } catch (error) {
      console.error("❌ Deployment failed:", error);
      process.exit(1);
    }
  });

task("deploy:verify", "Verify deployed WTTP gateway contract on block explorer")
  .addOptionalParam("gateway", "WTTP Gateway contract address", undefined, types.string)
  .addOptionalParam("chainid", "Chain ID to verify (defaults to current network)", undefined, types.string)
  .addOptionalParam("confirmations", "Number of confirmations to wait before verifying (default: 5)", "5", types.string)
  .addFlag("auto", "Automatically load contract address from wttp.deployments.ts")
  .addFlag("skipWait", "Skip waiting for confirmations before verification")
  .setAction(async (taskArgs, hre) => {
    const { gateway, chainid, auto, confirmations, skipWait } = taskArgs;
    
    let contractGateway = gateway;
    
    // Auto-load from deployments file if requested or if no manual params provided
    const shouldAutoLoad = auto || !gateway;
    
    if (shouldAutoLoad) {
      console.log(`📋 Auto-loading contract data from wttp.deployments.ts...`);
      
      try {
        const { wttpDeployments } = await import("../wttp.deployments");
        const targetChainId = chainid ? parseInt(chainid) : hre.network.config.chainId;
        
        if (!targetChainId) {
          throw new Error("Could not determine chain ID");
        }
        
        const deployment = wttpDeployments.chains[targetChainId];
        
        if (!deployment) {
          console.error(`❌ No deployment found for chain ID ${targetChainId}`);
          console.log(`Available chain IDs: ${Object.keys(wttpDeployments.chains).join(', ')}`);
          return;
        }
        
        contractGateway = deployment.gateway.contractAddress;
        
        console.log(`✅ Loaded deployment for chain ID ${targetChainId}`);
        console.log(`📍 Gateway: ${contractGateway}`);
        
      } catch (error) {
        console.error(`❌ Failed to auto-load deployment data:`, error);
        console.log(`Please provide manual parameters or check wttp.deployments.ts`);
        return;
      }
    }
    
    // Validate required parameters
    if (!contractGateway) {
      console.error(`❌ Missing required parameter. Either use --auto flag or provide:`);
      console.log(`--gateway <address>`);
      return;
    }
    
    // Setup artifacts for verification by copying gateway contracts
    console.log(`📦 Setting up artifacts for verification...`);
    try {
      console.log(`📋 Copying @wttp/gateway/contracts to contracts/test...`);
      execSync('npx shx cp -r node_modules/@wttp/gateway/contracts contracts/test', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      
      console.log(`🔨 Compiling contracts to generate artifacts...`);
      await hre.run("compile");
      
    } catch (setupError) {
      console.error(`❌ Failed to setup artifacts:`, setupError);
      console.log(`Please ensure @wttp/gateway is installed and contracts are available`);
      return;
    }
    
    // Wait for confirmations if not skipped
    if (!skipWait && hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
      const confirmationsToWait = parseInt(confirmations);
      console.log(`⏳ Waiting for ${confirmationsToWait} confirmations before verification to allow Etherscan indexing...`);
      
      try {
        // Get the current block number
        const currentBlock = await hre.ethers.provider.getBlockNumber();
        const targetBlock = currentBlock + confirmationsToWait;
        
        console.log(`📊 Current block: ${currentBlock}, waiting for block: ${targetBlock}`);
        
        // Wait for the target block
        await new Promise((resolve) => {
          const checkBlock = async () => {
            const latestBlock = await hre.ethers.provider.getBlockNumber();
            if (latestBlock >= targetBlock) {
              console.log(`✅ Reached block ${latestBlock}, proceeding with verification...`);
              resolve(undefined);
            } else {
              console.log(`⏳ Current block: ${latestBlock}, waiting...`);
              setTimeout(checkBlock, 10000); // Check every 10 seconds
            }
          };
          checkBlock();
        });
      } catch (error) {
        console.log(`⚠️  Could not wait for confirmations: ${error}`);
        console.log(`Proceeding with verification anyway...`);
      }
    }

    console.log(`\n🔍 Verifying WTTP Gateway contract on ${hre.network.name}...`);
    
    try {
      // Verify WTTP Gateway
      console.log("📋 Verifying WTTP Gateway...");
      await hre.run("verify:verify", {
        address: contractGateway,
        constructorArguments: [],
      });
      console.log("✅ WTTP Gateway verified!");
    } catch (error: any) {
      if (error.message.includes("already been verified") || error.message.includes("Already Verified")) {
        console.log("ℹ️  WTTP Gateway already verified");
      } else {
        console.log("❌ WTTP Gateway verification failed:", error.message);
      }
    } finally {
      // Cleanup: Remove test contracts and clean artifacts
      console.log(`🧹 Cleaning up temporary files...`);
      try {
        console.log(`📋 Removing contracts/test directory...`);
        execSync('npx shx rm -rf contracts/test', {
          stdio: 'inherit',
          cwd: process.cwd()
        });
        
        console.log(`🔨 Running hardhat clean to clear residual artifacts...`);
        await hre.run("clean");
        
        console.log(`🔨 Rebuilding original contracts...`);
        await hre.run("build");
        
        console.log(`✅ Cleanup completed successfully!`);
      } catch (cleanupError) {
        console.log(`⚠️  Cleanup warning: ${cleanupError}`);
        console.log(`You may need to manually run: npx shx rm -rf contracts/test && npx hardhat clean && npx hardhat build`);
      }
    }
    
    console.log("\n🎉 Verification process completed!");
  });

task("deploy:register", "Register deployed WTTP gateway contract in wttp.deployments.ts")
  .addParam("gateway", "WTTP Gateway contract address", undefined, types.string)
  .addOptionalParam("deployer", "Gateway deployer address (defaults to current signer)", undefined, types.string)
  .addOptionalParam("txHash", "Gateway transaction hash", "TBD", types.string)
  .addOptionalParam("chainid", "Chain ID to register (defaults to current network)", undefined, types.string)
  .setAction(async (taskArgs, hre) => {
    const { gateway, deployer, txHash, chainid } = taskArgs;
    
    // Get chain ID
    const targetChainId = chainid ? parseInt(chainid) : hre.network.config.chainId;
    
    if (!targetChainId) {
      console.error(`❌ Could not determine chain ID. Please specify --chainid`);
      return;
    }
    
    // Get deployer address if not provided
    const signers = await hre.ethers.getSigners();
    const defaultDeployer = signers[0].address;
    
    const finalDeployer = deployer || defaultDeployer;
    
    console.log(`📝 Registering deployment for chain ID ${targetChainId} (${hre.network.name})`);
    console.log(`📍 Gateway: ${gateway} (deployer: ${finalDeployer})`);
    
    try {
      // Add to registry
      await addDeployment({
        chainId: targetChainId,
        gateway: {
          contractAddress: gateway,
          deployerAddress: finalDeployer,
          txHash: txHash,
        },
      });
      
      console.log(`✅ Deployment registered successfully in wttp.deployments.ts!`);
      console.log(`🔍 You can now verify using: npx hardhat deploy:verify --auto --network ${hre.network.name}`);
      
    } catch (error) {
      console.error(`❌ Failed to register deployment:`, error);
      throw error;
    }
  }); 