// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

/// @custom:interface build ./interfaces/IWTTP.sol

/// @custom:interface import "../types/WTTPTypes.sol"
/// @custom:interface import "@openzeppelin/contracts/access/IAccessControl.sol"

/// @custom:interface module "@wttp/site/contracts/BaseWTTPPermissions.sol" to "./IWTTPPermissions.sol" --replace AccessControl with IAccessControl --import "./IWTTP.sol"
/// @custom:interface module "@wttp/site/contracts/BaseWTTPStorage.sol" to "./IWTTPStorage.sol" --replace BaseWTTPPermissions with IBaseWTTPPermissions --import "./IWTTPPermissions.sol"
/// @custom:interface module "@wttp/site/contracts/BaseWTTPSite.sol" to "./IWTTPSite.sol" --replace BaseWTTPStorage with IBaseWTTPStorage --import "./IWTTPStorage.sol"

contract WTTP {
    constructor() {
        // constructor implementation
    }
}