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

/**
 * WTTP Gateway - Deployment Registry
 * 
 * This file tracks all WTTP Gateway contract deployments across different networks.
 * Used for reference, integration, and deployment management.
 * 
 * @version 0.0.1
 * @license AGPL-3.0
 */

/**
 * WTTP Gateway Deployments - Simple Contract Registry
 * Tracks deployed gateway contract addresses and deployment info across networks
 */

export const wttpDeployments = {
  chains: {
    11155111: {
      gateway: {
        contractAddress: '0x6A7E6a45573D9E51D53413B25399311B0df42687',
        deployerAddress: '0x7916237cB4979d47c8eeb2EB96fCE4F1c43833F4',
        txHash: '0x2835c2917fff88684d9a682e15af3d8c93052908d6873d831c67d23741ef0123',
        deployedAt: '2025-06-18T05:24:48.000Z'
      }
    },
  }
};

export default wttpDeployments;