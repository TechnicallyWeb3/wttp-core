import { ethers } from 'ethers';
import type { HeaderInfoStruct } from '../typechain-types/contracts/interfaces/IWTTPStorage';

// ============ Method Enum ============

/**
 * WTTP Methods Enum - mirrors the Solidity enum
 * Used for method-based access control and request handling
 */
export enum Method {
  /** Retrieve only resource headers and metadata */
  HEAD = 0,
  /** Retrieve resource content */
  GET = 1,
  /** Submit data to be processed (not fully implemented in WTTP) */
  POST = 2,
  /** Create or replace a resource */
  PUT = 3,
  /** Update parts of a resource */
  PATCH = 4,
  /** Remove a resource */
  DELETE = 5,
  /** Query which methods are supported for a resource */
  OPTIONS = 6,
  /** Retrieve storage locations for resource data points */
  LOCATE = 7,
  /** Update resource headers */
  DEFINE = 8
}

// ============ Method Utilities ============

/**
 * Gets the total number of methods in the Method enum
 * @returns The count of methods (currently 9)
 */
export function getMethodCount(): number {
  return Object.keys(Method).filter(key => !isNaN(Number(key))).length;
}

/**
 * Converts an array of methods to a bitmask representation
 * Used for efficient method permission storage (1 bit per method)
 * @param methods Array of WTTP methods to convert
 * @returns Bitmask representing allowed methods as uint16
 */
export function methodsToBitmask(methods: Method[]): number {
  let mask = 0;
  for (const method of methods) {
    mask |= (1 << method);
  }
  return mask;
}

/**
 * Converts a bitmask back to an array of methods
 * @param mask The bitmask to convert
 * @returns Array of methods represented by the bitmask
 */
export function bitmaskToMethods(mask: number): Method[] {
  const methods: Method[] = [];
  for (let i = 0; i < getMethodCount(); i++) {
    if (mask & (1 << i)) {
      methods.push(i as Method);
    }
  }
  return methods;
}

/**
 * All methods bitmask - enables all 9 methods
 */
export const ALL_METHODS_BITMASK = methodsToBitmask([
  Method.HEAD, Method.GET, Method.POST, Method.PUT, 
  Method.PATCH, Method.DELETE, Method.OPTIONS, Method.LOCATE, Method.DEFINE
]);

/**
 * Read-only methods bitmask - only HEAD, GET, OPTIONS, LOCATE
 */
export const READ_ONLY_METHODS_BITMASK = methodsToBitmask([
  Method.HEAD, Method.GET, Method.OPTIONS, Method.LOCATE
]);

/**
 * Write methods bitmask - POST, PUT, PATCH, DELETE, DEFINE
 */
export const WRITE_METHODS_BITMASK = methodsToBitmask([
  Method.POST, Method.PUT, Method.PATCH, Method.DELETE, Method.DEFINE
]);

// ============ Default Roles ============

/** 
 * Default admin role - uses ethers ZeroHash
 * Admins have full access to all resources and methods
 */
export const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;

/**
 * Blacklist role - computed using keccak256("BLACKLIST_ROLE")
 * Accounts with this role are denied access to all methods
 */
export const BLACKLIST_ROLE = ethers.keccak256(ethers.toUtf8Bytes("BLACKLIST_ROLE"));

/**
 * Public access role - allows unrestricted access
 * Uses all 1s in bytes32 format for maximum permissiveness
 */
export const PUBLIC_ROLE = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

/**
 * Intra-site communication role - for internal service-to-service communication
 * Different from existing roles, used for trusted internal operations
 */
export const INTRA_SITE_ROLE = ethers.keccak256(ethers.toUtf8Bytes("INTRA_SITE_COMMUNICATION"));

// ============ Chain Configuration ============

/**
 * Master chain ID - currently set to Sepolia testnet
 * Chain ID 11155111 for Ethereum Sepolia testnet
 */
export const MASTER_CHAIN_ID = 11155111;

// ============ Origins Presets ============

/**
 * Creates an origins array with exactly getMethodCount() elements
 * @param role The role to assign to all methods
 * @returns Origins array suitable for CORSPolicy
 */
function createOriginsArray(role: string): string[] {
  return new Array(getMethodCount()).fill(role);
}

/**
 * Creates an origins array with different roles for read vs write operations
 * @param readRole Role for read operations (HEAD, GET, OPTIONS, LOCATE)
 * @param writeRole Role for write operations (POST, PUT, PATCH, DELETE, DEFINE)
 * @returns Origins array with mixed access
 */
function createMixedOriginsArray(readRole: string, writeRole: string): string[] {
  const origins = new Array(getMethodCount());
  origins[Method.HEAD] = readRole;
  origins[Method.GET] = readRole;
  origins[Method.POST] = writeRole;
  origins[Method.PUT] = writeRole;
  origins[Method.PATCH] = writeRole;
  origins[Method.DELETE] = writeRole;
  origins[Method.OPTIONS] = readRole;
  origins[Method.LOCATE] = readRole;
  origins[Method.DEFINE] = writeRole;
  return origins;
}

/**
 * Origins preset: All methods public
 */
export const ORIGINS_PUBLIC = createOriginsArray(PUBLIC_ROLE);

/**
 * Origins preset: All methods admin only
 */
export const ORIGINS_ADMIN_ONLY = createOriginsArray(DEFAULT_ADMIN_ROLE);

/**
 * Origins preset: All methods blacklisted (denied)
 */
export const ORIGINS_BLACKLISTED = createOriginsArray(BLACKLIST_ROLE);

/**
 * Origins preset: All methods for intra-site communication
 */
export const ORIGINS_INTRA_SITE = createOriginsArray(INTRA_SITE_ROLE);

/**
 * Origins preset: Read methods public, write methods admin
 */
export const ORIGINS_READ_PUBLIC_WRITE_ADMIN = createMixedOriginsArray(PUBLIC_ROLE, DEFAULT_ADMIN_ROLE);

/**
 * Origins preset: Read methods public, write methods intra-site
 */
export const ORIGINS_READ_PUBLIC_WRITE_INTRA = createMixedOriginsArray(PUBLIC_ROLE, INTRA_SITE_ROLE);

/**
 * Origins preset: Read methods public, write methods blacklisted
 */
export const ORIGINS_READ_ONLY_PUBLIC = createMixedOriginsArray(PUBLIC_ROLE, BLACKLIST_ROLE);

/**
 * Origins preset: API pattern - read public, post/patch intra-site, put/delete/define admin
 */
export const ORIGINS_API_PATTERN: string[] = (() => {
  const origins = new Array(getMethodCount());
  origins[Method.HEAD] = PUBLIC_ROLE;
  origins[Method.GET] = PUBLIC_ROLE;
  origins[Method.POST] = INTRA_SITE_ROLE;
  origins[Method.PUT] = DEFAULT_ADMIN_ROLE;
  origins[Method.PATCH] = INTRA_SITE_ROLE;
  origins[Method.DELETE] = DEFAULT_ADMIN_ROLE;
  origins[Method.OPTIONS] = PUBLIC_ROLE;
  origins[Method.LOCATE] = PUBLIC_ROLE;
  origins[Method.DEFINE] = DEFAULT_ADMIN_ROLE;
  return origins;
})();

/**
 * Origins preset: Immutable content - read public, patch/delete blacklisted, others admin
 */
export const ORIGINS_IMMUTABLE_CONTENT: string[] = (() => {
  const origins = new Array(getMethodCount());
  origins[Method.HEAD] = PUBLIC_ROLE;
  origins[Method.GET] = PUBLIC_ROLE;
  origins[Method.POST] = DEFAULT_ADMIN_ROLE;
  origins[Method.PUT] = DEFAULT_ADMIN_ROLE;
  origins[Method.PATCH] = BLACKLIST_ROLE; // Immutable content can't be patched
  origins[Method.DELETE] = BLACKLIST_ROLE; // Immutable content can't be deleted
  origins[Method.OPTIONS] = PUBLIC_ROLE;
  origins[Method.LOCATE] = PUBLIC_ROLE;
  origins[Method.DEFINE] = DEFAULT_ADMIN_ROLE;
  return origins;
})();

// ============ Origins Presets Collection ============

/**
 * Collection of all origins presets for easy access
 */
export const ORIGINS_PRESETS = {
  PUBLIC: ORIGINS_PUBLIC,
  ADMIN_ONLY: ORIGINS_ADMIN_ONLY,
  BLACKLISTED: ORIGINS_BLACKLISTED,
  INTRA_SITE: ORIGINS_INTRA_SITE,
  READ_PUBLIC_WRITE_ADMIN: ORIGINS_READ_PUBLIC_WRITE_ADMIN,
  READ_PUBLIC_WRITE_INTRA: ORIGINS_READ_PUBLIC_WRITE_INTRA,
  READ_ONLY_PUBLIC: ORIGINS_READ_ONLY_PUBLIC,
  API_PATTERN: ORIGINS_API_PATTERN,
  IMMUTABLE_CONTENT: ORIGINS_IMMUTABLE_CONTENT
} as const;

// ============ Default Headers ============

/**
 * Fully public header - allows all methods for all users
 * Uses PUBLIC_ROLE for all method access
 */
export const PUBLIC_HEADER: HeaderInfoStruct = {
  cache: {
    immutableFlag: false,
    preset: 2, // CachePreset.DEFAULT
    custom: ""
  },
  cors: {
    methods: ALL_METHODS_BITMASK,
    origins: ORIGINS_PUBLIC,
    preset: 1, // CORSPreset.PUBLIC
    custom: ""
  },
  redirect: {
    code: 0,
    location: ""
  }
};

/**
 * Admin-only header - restricts all methods to admin role
 * Only admins can access any methods
 */
export const ADMIN_ONLY_HEADER: HeaderInfoStruct = {
  cache: {
    immutableFlag: false,
    preset: 0, // CachePreset.NONE
    custom: ""
  },
  cors: {
    methods: ALL_METHODS_BITMASK,
    origins: ORIGINS_ADMIN_ONLY,
    preset: 5, // CORSPreset.PRIVATE
    custom: ""
  },
  redirect: {
    code: 0,
    location: ""
  }
};

/**
 * Read-only public header - allows read operations for public, write operations for admins
 * Balanced access control for content sites
 */
export const READ_ONLY_PUBLIC_HEADER: HeaderInfoStruct = {
  cache: {
    immutableFlag: false,
    preset: 3, // CachePreset.SHORT
    custom: ""
  },
  cors: {
    methods: ALL_METHODS_BITMASK,
    origins: ORIGINS_READ_PUBLIC_WRITE_ADMIN,
    preset: 4, // CORSPreset.MIXED_ACCESS
    custom: ""
  },
  redirect: {
    code: 0,
    location: ""
  }
};

/**
 * API header - designed for API endpoints with mixed access patterns
 * Read operations public, write operations restricted
 */
export const API_HEADER: HeaderInfoStruct = {
  cache: {
    immutableFlag: false,
    preset: 1, // CachePreset.NO_CACHE
    custom: ""
  },
  cors: {
    methods: ALL_METHODS_BITMASK,
    origins: ORIGINS_API_PATTERN,
    preset: 3, // CORSPreset.API
    custom: ""
  },
  redirect: {
    code: 0,
    location: ""
  }
};

/**
 * Intra-site communication header - for internal service communication
 * Only allows intra-site role and admin access
 */
export const INTRA_SITE_HEADER: HeaderInfoStruct = {
  cache: {
    immutableFlag: false,
    preset: 1, // CachePreset.NO_CACHE - don't cache internal communications
    custom: ""
  },
  cors: {
    methods: ALL_METHODS_BITMASK,
    origins: ORIGINS_INTRA_SITE,
    preset: 5, // CORSPreset.PRIVATE
    custom: ""
  },
  redirect: {
    code: 0,
    location: ""
  }
};

/**
 * Immutable public content header - for permanent, cacheable public content
 * Content that never changes and can be cached indefinitely
 */
export const IMMUTABLE_PUBLIC_HEADER: HeaderInfoStruct = {
  cache: {
    immutableFlag: true,
    preset: 6, // CachePreset.PERMANENT
    custom: ""
  },
  cors: {
    methods: ALL_METHODS_BITMASK,
    origins: ORIGINS_IMMUTABLE_CONTENT,
    preset: 1, // CORSPreset.PUBLIC
    custom: ""
  },
  redirect: {
    code: 0,
    location: ""
  }
};

/**
 * Read-only public header with limited methods - only allows read operations
 * Completely prevents write operations by not including them in methods bitmask
 */
export const STRICT_READ_ONLY_HEADER: HeaderInfoStruct = {
  cache: {
    immutableFlag: false,
    preset: 4, // CachePreset.MEDIUM
    custom: ""
  },
  cors: {
    methods: READ_ONLY_METHODS_BITMASK, // Only read methods enabled
    origins: ORIGINS_READ_ONLY_PUBLIC,
    preset: 1, // CORSPreset.PUBLIC
    custom: ""
  },
  redirect: {
    code: 0,
    location: ""
  }
};

// ============ Header Collections ============

/**
 * Collection of all default headers for easy access
 */
export const DEFAULT_HEADERS = {
  PUBLIC: PUBLIC_HEADER,
  ADMIN_ONLY: ADMIN_ONLY_HEADER,
  READ_ONLY_PUBLIC: READ_ONLY_PUBLIC_HEADER,
  API: API_HEADER,
  INTRA_SITE: INTRA_SITE_HEADER,
  IMMUTABLE_PUBLIC: IMMUTABLE_PUBLIC_HEADER,
  STRICT_READ_ONLY: STRICT_READ_ONLY_HEADER
} as const;

/**
 * Default header to use when no specific header is specified
 * Uses read-only public access pattern as a sensible default
 */
export const DEFAULT_HEADER = READ_ONLY_PUBLIC_HEADER;

// ============ Role Collections ============

/**
 * Collection of all default roles for easy access
 */
export const DEFAULT_ROLES = {
  ADMIN: DEFAULT_ADMIN_ROLE,
  BLACKLIST: BLACKLIST_ROLE,
  PUBLIC: PUBLIC_ROLE,
  INTRA_SITE: INTRA_SITE_ROLE
} as const;

// ============ Helper Functions ============

/**
 * Creates a custom header with specified parameters
 * @param options Header configuration options
 * @returns Complete HeaderInfoStruct
 */
export function createCustomHeader(options: {
  methods?: Method[];
  origins?: string[];
  cachePreset?: number;
  corsPreset?: number;
  immutable?: boolean;
  redirectCode?: number;
  redirectLocation?: string;
  customCache?: string;
  customCors?: string;
}): HeaderInfoStruct {
  const {
    methods = [Method.HEAD, Method.GET, Method.OPTIONS, Method.LOCATE],
    origins = ORIGINS_READ_PUBLIC_WRITE_ADMIN,
    cachePreset = 2, // CachePreset.DEFAULT
    corsPreset = 4, // CORSPreset.MIXED_ACCESS
    immutable = false,
    redirectCode = 0,
    redirectLocation = "",
    customCache = "",
    customCors = ""
  } = options;

  // Ensure origins array has correct length
  const normalizedOrigins = origins.length === getMethodCount() 
    ? origins 
    : createOriginsArray(origins[0] || PUBLIC_ROLE);

  return {
    cache: {
      immutableFlag: immutable,
      preset: cachePreset,
      custom: customCache
    },
    cors: {
      methods: methodsToBitmask(methods),
      origins: normalizedOrigins,
      preset: corsPreset,
      custom: customCors
    },
    redirect: {
      code: redirectCode,
      location: redirectLocation
    }
  };
}
