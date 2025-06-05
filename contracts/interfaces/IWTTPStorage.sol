/*
 * Web3 Transfer Protocol (WTTP) - Storage Interface
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

// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

import "./WTTPTypes.sol";

/// @title Interface for WTTP Storage Contract
/// @notice Defines the external methods available on WTTPStorage
/// @dev Provides storage and access control for web resources, includes all inherited functions from WTTPPermissions
interface IWTTPStorage {

    // ============ WTTPStorage Functions ============

    /// @notice Returns the Data Point Storage contract instance
    /// @return IDataPointStorage The Data Point Storage contract
    function DPS() external view returns (IDataPointStorage);

    /// @notice Returns the Data Point Registry contract instance
    /// @return IDataPointRegistry The Data Point Registry contract
    function DPR() external view returns (IDataPointRegistry);

    /// @notice Updates the Data Point Registry contract address
    /// @param _dpr New address for the Data Point Registry contract
    function setDPR(address _dpr) external;

    /// @notice Sets the default header information
    /// @param _header The header information to use as default
    function setDefaultHeader(HeaderInfo memory _header) external;

    // ============ Inherited from WTTPPermissions ============

    /// @notice Check if an account has a specific role
    /// @param role The role identifier to check
    /// @param account The address to check for the role
    /// @return bool True if the account has the role or is a DEFAULT_ADMIN_ROLE holder
    function hasRole(bytes32 role, address account) external view returns (bool);

    /// @notice Creates a new resource-specific admin role
    /// @param _role The new role identifier to create
    function createResourceRole(bytes32 _role) external;

    /// @notice Changes the SITE_ADMIN_ROLE identifier
    /// @param _newSiteAdmin The new role identifier to use for site administrators
    function changeSiteAdmin(bytes32 _newSiteAdmin) external;

    /// @notice Grants a role to an account
    /// @param role The role to grant
    /// @param account The account to grant the role to
    function grantRole(bytes32 role, address account) external;

    /// @notice Revokes a role from an account
    /// @param role The role to revoke
    /// @param account The account to revoke the role from
    function revokeRole(bytes32 role, address account) external;

    /// @notice Renounces a role for the calling account
    /// @param role The role to renounce
    /// @param callerConfirmation The account that is renouncing the role (must be msg.sender)
    function renounceRole(bytes32 role, address callerConfirmation) external;

    /// @notice Gets the admin role that controls a role
    /// @param role The role to query
    /// @return The admin role
    function getRoleAdmin(bytes32 role) external view returns (bytes32);

    /// @notice Returns the default admin role
    /// @return The default admin role identifier
    function DEFAULT_ADMIN_ROLE() external view returns (bytes32);

    /// @notice Blacklists an account from all roles
    /// @param _account The address to blacklist
    function revokeAllRoles(address _account) external;

} 