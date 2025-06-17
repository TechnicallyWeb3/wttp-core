// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

/// @custom:interface build ./interfaces/IWTTP.sol

/// @custom:interface module "@wttp/site/contracts/BaseWTTPPermissions.sol" to "./interfaces/IBaseWTTPPermissions.sol" --replace AccessControl with IAccessControl --import "@openzeppelin/contracts/access/IAccessControl.sol" 
/// @custom:interface module "@wttp/site/contracts/BaseWTTPStorage.sol" to "./interfaces/IBaseWTTPStorage.sol" --replace BaseWTTPPermissions with IBaseWTTPPermissions --import "./IBaseWTTPPermissions.sol" --import "../types/WTTPTypes.sol"
/// @custom:interface module "@wttp/site/contracts/BaseWTTPSite.sol" to "./interfaces/IBaseWTTPSite.sol" --replace BaseWTTPStorage with IBaseWTTPStorage --import "./IBaseWTTPStorage.sol"
/// @custom:interface module "@wttp/gateway/contracts/WTTPGateway.sol" to "./interfaces/IWTTPGateway.sol" --import "./IBaseWTTPSite.sol"

/// @custom:interface import "./IWTTPGateway.sol"
/// @custom:interface is IWTTPGateway, IBaseWTTPSite

contract WTTP {
    // this contract file is used to build the interface only
}