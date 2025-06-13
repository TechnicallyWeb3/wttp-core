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
  IBaseWTTPPermissionsInterface,
} from '../typechain-types/contracts/interfaces/IBaseWTTPPermissions';
export {
  IBaseWTTPStorageInterface,
} from '../typechain-types/contracts/interfaces/IBaseWTTPStorage';
export {
  IBaseWTTPSiteInterface,
} from '../typechain-types/contracts/interfaces/IBaseWTTPSite';

export * from '../typechain-types/contracts/interfaces/IWTTP';
// export {
//   IWTTPGatewayInterface,
//   RangeStruct,
//   RangeStructOutput,
//   GETRequestStruct,
//   GETRequestStructOutput,
//   GETResponseStruct,
//   GETResponseStructOutput,
//   LOCATERequestStruct,
//   LOCATERequestStructOutput,
// } from '../typechain-types/contracts/interfaces/IWTTPGateway';

// ============ Constants and Utilities ============

// Export all constants, enums, and utility functions
export * from './constants';

// Re-export specific items for convenience and backwards compatibility
export {
  // Method enum and utilities
  Method,
  getMethodCount,
  methodsToBitmask,
  bitmaskToMethods,
  
  // Method bitmasks
  ALL_METHODS_BITMASK,
  READ_ONLY_METHODS_BITMASK,
  WRITE_METHODS_BITMASK,
  
  // Default roles
  DEFAULT_ADMIN_ROLE,
  BLACKLIST_ROLE,
  PUBLIC_ROLE,
  INTRA_SITE_ROLE,
  
  // Chain configuration
  MASTER_CHAIN_ID,
  
  // Origins presets
  ORIGINS_PRESETS,
  ORIGINS_PUBLIC,
  ORIGINS_ADMIN_ONLY,
  ORIGINS_BLACKLISTED,
  ORIGINS_INTRA_SITE,
  ORIGINS_READ_PUBLIC_WRITE_ADMIN,
  ORIGINS_READ_PUBLIC_WRITE_INTRA,
  ORIGINS_READ_ONLY_PUBLIC,
  ORIGINS_API_PATTERN,
  ORIGINS_IMMUTABLE_CONTENT,
  
  // Default headers
  DEFAULT_HEADERS,
  DEFAULT_HEADER,
  PUBLIC_HEADER,
  ADMIN_ONLY_HEADER,
  READ_ONLY_PUBLIC_HEADER,
  API_HEADER,
  INTRA_SITE_HEADER,
  IMMUTABLE_PUBLIC_HEADER,
  STRICT_READ_ONLY_HEADER,
  
  // Role collections
  DEFAULT_ROLES,
  
  // Helper functions
  createCustomHeader
} from './constants'; 

export * from './helpers';
export * from './mimeEncoding';
