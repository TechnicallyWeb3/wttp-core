/*
 * Web3 Transfer Protocol (WTTP) - Gateway Interface
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

import "../types/WTTPTypes.sol";

/// @title Interface for WTTP Gateway Contract
/// @notice Defines the external methods available on WTTPGatewayV3
/// @dev Gateway provides unified access to WTTP sites with range handling capabilities
interface IWTTPGateway {
    
    /// @notice Forwards OPTIONS requests to a specified site
    /// @param _site Address of the target WTTP site contract
    /// @param _path Resource path to check
    /// @return _optionsResponse The response from the site
    function OPTIONS(
        address _site, 
        string memory _path
    ) external view returns (OPTIONSResponse memory _optionsResponse);

    /// @notice Handles GET requests with byte range support
    /// @param _site Address of the target WTTP site contract
    /// @param _getRequest The GET request parameters including any byte range
    /// @return _getResponse Response with either full data or the requested byte range
    function GET(
        address _site, 
        GETRequest memory _getRequest
    ) external view returns (GETResponse memory _getResponse);

    /// @notice Forwards HEAD requests to a specified site
    /// @param _site Address of the target WTTP site contract
    /// @param _headRequest The HEAD request parameters
    /// @return _headResponse The response from the site
    function HEAD(
        address _site, 
        HEADRequest memory _headRequest
    ) external view returns (HEADResponse memory _headResponse);

    /// @notice Handles LOCATE requests with data point range support
    /// @param _site Address of the target WTTP site contract
    /// @param _locateRequest The LOCATE request parameters including any chunk range
    /// @return _locateResponse Response with either all data points or the requested range
    function LOCATE(
        address _site, 
        LOCATERequest memory _locateRequest
    ) external view returns (LOCATEResponse memory _locateResponse);
} 