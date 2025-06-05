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
// Export all interfaces
export * from '../typechain-types/contracts/interfaces';
// Export all interfaces IOs
export {
  IWTTPPermissionsInterface,
  ResourceRoleCreatedEvent,
  SiteAdminChangedEvent,
} from '../typechain-types/contracts/interfaces/IWTTPPermissions';
export {
  IWTTPStorageInterface,
  CacheControlStruct,
  CacheControlStructOutput,
  RedirectStruct,
  RedirectStructOutput,
  HeaderInfoStruct,
  HeaderInfoStructOutput
} from '../typechain-types/contracts/interfaces/IWTTPStorage';
export {
  IWTTPSiteInterface,
  HEADRequestStruct,
  HEADRequestStructOutput,
  HEADResponseStruct,
  HEADResponseStructOutput,
  LOCATEResponseStruct,
  LOCATEResponseStructOutput,
  OPTIONSResponseStruct,
  OPTIONSResponseStructOutput
} from '../typechain-types/contracts/interfaces/IWTTPSite';
export {
  IWTTPGatewayInterface,
  RangeStruct,
  RangeStructOutput,
  GETRequestStruct,
  GETRequestStructOutput,
  GETResponseStruct,
  GETResponseStructOutput,
  LOCATERequestStruct,
  LOCATERequestStructOutput,
} from '../typechain-types/contracts/interfaces/IWTTPGateway';


// Export contract artifacts for direct access using require to avoid TS issues
// Auto-generated artifacts exports
import { default as IWTTPPermissionsArtifact } from '../artifacts/contracts/interfaces/IWTTPPermissions.sol/IWTTPPermissions.json';
import { default as IWTTPGatewayArtifact } from '../artifacts/contracts/interfaces/IWTTPGateway.sol/IWTTPGateway.json';
import { default as IWTTPSiteArtifact } from '../artifacts/contracts/interfaces/IWTTPSite.sol/IWTTPSite.json';
import { default as IWTTPStorageArtifact } from '../artifacts/contracts/interfaces/IWTTPStorage.sol/IWTTPStorage.json';
export { IWTTPPermissionsArtifact, IWTTPGatewayArtifact, IWTTPSiteArtifact, IWTTPStorageArtifact };
// Also export as a single artifacts object for convenience
export const artifacts = {
  IWTTPSite: IWTTPSiteArtifact,
  IWTTPGateway: IWTTPGatewayArtifact,
  IWTTPStorage: IWTTPStorageArtifact,
  IWTTPPermissions: IWTTPPermissionsArtifact
}; 
