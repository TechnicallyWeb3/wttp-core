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
/// @dev Provides storage and access control for web resources
interface IWTTPStorage {

    // ============ Functions ============

    /// @notice Returns the Data Point Storage contract instance
    /// @return IDataPointStorage The Data Point Storage contract
    function DPS() external view returns (IDataPointStorage);

    /// @notice Returns the Data Point Registry contract instance
    /// @return IDataPointRegistry The Data Point Registry contract
    function DPR() external view returns (IDataPointRegistry);

    /// @notice Updates the Data Point Registry contract address
    /// @param _dpr New address for the Data Point Registry contract
    function setDPR(address _dpr) external;

    /// @notice Creates a new header in storage
    /// @param _header The header information to store
    /// @return headerAddress The unique identifier for the stored header
    function createHeader(
        HeaderInfo memory _header
    ) external returns (bytes32 headerAddress);

    /// @notice Retrieves header information by its address
    /// @param _headerAddress The unique identifier of the header
    /// @return HeaderInfo The header information
    function readHeader(
        bytes32 _headerAddress
    ) external view returns (HeaderInfo memory);

    /// @notice Sets the default header information
    /// @param _header The header information to use as default
    function setDefaultHeader(
        HeaderInfo memory _header
    ) external;

    /// @notice Retrieves metadata for a resource path
    /// @param _path Path of the resource
    /// @return _metadata Metadata information for the resource
    function readMetadata(
        string memory _path
    ) external view returns (ResourceMetadata memory _metadata);

    /// @notice Updates metadata for a resource
    /// @param _path Path of the resource to update
    /// @param _metadata New metadata to store
    function updateMetadata(
        string memory _path, 
        ResourceMetadata memory _metadata
    ) external;

    /// @notice Deletes metadata for a resource
    /// @param _path Path of the resource to delete
    function deleteMetadata(
        string memory _path
    ) external;

    /// @notice Creates a new data point for a resource
    /// @param _path Path where the resource will be stored
    /// @param _dataRegistration Registration data including content and publisher
    /// @return _dataPointAddress The address of the newly created data point
    function createResource(
        string memory _path,
        DataRegistration memory _dataRegistration
    ) external payable returns (bytes32 _dataPointAddress);

    /// @notice Retrieves all data point addresses for a resource
    /// @param _path Path of the resource
    /// @return Array of data point addresses comprising the resource
    function readResource(
        string memory _path
    ) external view returns (bytes32[] memory);

    /// @notice Updates a specific chunk of a resource
    /// @param _path Path of the resource
    /// @param _dataPointAddress Address of the data point chunk
    /// @param _chunkIndex Index position of the chunk in the resource array
    function updateResource(
        string memory _path,
        bytes32 _dataPointAddress,
        uint256 _chunkIndex
    ) external;

    /// @notice Removes a resource and its metadata
    /// @param _path Path of the resource to delete
    function deleteResource(
        string memory _path
    ) external;

    /// @notice Bulk upload of data points for a resource
    /// @param _path Path of the resource
    /// @param _dataRegistration Array of registration data for multiple chunks
    /// @return _dataPointAddresses Array of addresses for the created data points
    function uploadResource(
        string memory _path,
        DataRegistration[] memory _dataRegistration
    ) external payable returns (bytes32[] memory _dataPointAddresses);
} 