/*
 * Web3 Transfer Protocol (WTTP) - Core Package Entry Point
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
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

// Export all TypeChain types and factories
export * from '../typechain-types';

// Export contract artifacts for direct access using require to avoid TS issues
export const IWTTPSiteV3Artifact = require('../artifacts/contracts/interfaces/IWTTPSiteV3.sol/IWTTPSiteV3.json');
export const IWTTPGatewayArtifact = require('../artifacts/contracts/interfaces/IWTTPGateway.sol/IWTTPGateway.json');
export const IWTTPStorageArtifact = require('../artifacts/contracts/interfaces/IWTTPStorage.sol/IWTTPStorage.json');
export const IWTTPPermissionsArtifact = require('../artifacts/contracts/interfaces/IWTTPPermissions.sol/IWTTPPermissions.json');
export const WTTPTypesArtifact = require('../artifacts/contracts/interfaces/WTTPTypes.sol/WTTPTypes.json');

// Also export as a single artifacts object for convenience
export const artifacts = {
  IWTTPSiteV3: IWTTPSiteV3Artifact,
  IWTTPGateway: IWTTPGatewayArtifact,
  IWTTPStorage: IWTTPStorageArtifact,
  IWTTPPermissions: IWTTPPermissionsArtifact,
  WTTPTypes: WTTPTypesArtifact
}; 