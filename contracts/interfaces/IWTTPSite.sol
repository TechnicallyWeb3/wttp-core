/*
 * Web3 Transfer Protocol (WTTP) - Site Interface
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

/// @title Interface for WTTP Site Contract
/// @notice Defines the external methods available on WTTPSite
interface IWTTPSite {
    function DPS() external view returns (IDataPointStorage);
    function DPR() external view returns (IDataPointRegistry);
    /// @notice Handles OPTIONS requests to check available methods
    /// @param optionsRequest Request information
    /// @return optionsResponse Response with allowed methods
    function OPTIONS(
        RequestLine memory optionsRequest
    ) external view returns (OPTIONSResponse memory optionsResponse);
    
    /// @notice Handles HEAD requests for metadata retrieval
    /// @param headRequest Request information
    /// @return headResponse Response with header information
    function HEAD(
        HEADRequest memory headRequest
    ) external view returns (HEADResponse memory headResponse);
    
    /// @notice Handles LOCATE requests to find resource storage locations
    /// @param locateRequest Request information
    /// @return locateResponse Response containing storage locations
    function LOCATE(
        HEADRequest memory locateRequest
    ) external view returns (LOCATEResponse memory locateResponse);

    function GET(
        HEADRequest memory getRequest
    ) external view returns (LOCATEResponse memory locateResponse);
} 