// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

/// @custom:interface build ./interfaces/IWTTP.sol

/// @custom:interface module "@wttp/site/contracts/BaseWTTPPermissions.sol" to "./interfaces/IBaseWTTPPermissions.sol" --replace AccessControl with IAccessControl --import "@openzeppelin/contracts/access/IAccessControl.sol" 
/// @custom:interface module "@wttp/site/contracts/BaseWTTPStorage.sol" to "./interfaces/IBaseWTTPStorage.sol" --replace BaseWTTPPermissions with IBaseWTTPPermissions --import "./IBaseWTTPPermissions.sol" --import "../types/WTTPTypes.sol"
/// @custom:interface module "@wttp/site/contracts/BaseWTTPSite.sol" to "./interfaces/IBaseWTTPSite.sol" --replace BaseWTTPStorage with IBaseWTTPStorage --import "./IBaseWTTPStorage.sol"

import "./types/WTTPTypes.sol";
/// @custom:interface import "../types/WTTPTypes.sol"

contract WTTP {
    // wttp-site contract types

    // OPTIONSRequest is string _path;
    OPTIONSResponse public optionsResponse;
    HEADRequest public headRequest;
    HEADResponse public headResponse;
    LOCATERequest public locateRequest;
    LOCATEResponse public locateResponse;
    PUTRequest public putRequest;
    // PUTResponse is LOCATEResponse;
    PATCHRequest public patchRequest;
    // PATCHResponse is LOCATEResponse;
    // DELETERequest is HEADRequest;
    // DELETEResponse is HEADResponse;
    DEFINERequest public defineRequest;
    DEFINEResponse public defineResponse;

    Range public range;

    // wttp storage contract types
    CachePreset public cachePreset;
    CacheControl public cacheControl;
    CORSPreset public corsPreset;
    CORSPolicy public corsPolicy;
    Redirect public redirect;
    HeaderInfo public headerInfo;
    ResourceProperties public resourceProperties;
    ResourceMetadata public resourceMetadata;
    DataRegistration public dataRegistration;

    // gateway contract types
    GETRequest public getRequest;
    GETResponse public getResponse;
    // POSTRequest is string _path;

    function events(string memory _eventName) public {
        bytes32 eventHash = keccak256(bytes(_eventName));
        bool all;

        // wttp site contract events
        if (eventHash == keccak256(bytes(""))) {
            all = true;
        }
        if (all || eventHash == keccak256(bytes("DEFINESuccess"))) {
            emit DEFINESuccess(msg.sender, defineResponse);
        } 
        if (all || eventHash == keccak256(bytes("DELETESuccess"))) {
            emit DELETESuccess(msg.sender, headResponse);
        }
        if (all || eventHash == keccak256(bytes("PUTSuccess"))) {
            emit PUTSuccess(msg.sender, locateResponse);
        }
        if (all || eventHash == keccak256(bytes("PATCHSuccess"))) {
            emit PATCHSuccess(msg.sender, locateResponse);
        }

        // wttp storage contract events
        if (all || eventHash == keccak256(bytes("HeaderCreated"))) {
            emit HeaderCreated(resourceMetadata.header);
        }
        if (all || eventHash == keccak256(bytes("HeaderUpdated"))) {
            emit HeaderUpdated(resourceMetadata.header);
        }
        if (all || eventHash == keccak256(bytes("MetadataUpdated"))) {
            emit MetadataUpdated("/");  
        }
        if (all || eventHash == keccak256(bytes("MetadataDeleted"))) { 
            emit MetadataDeleted("/");
        }
        if (all || eventHash == keccak256(bytes("ResourceCreated"))) {
            emit ResourceCreated("/");
        }
        if (all || eventHash == keccak256(bytes("ResourceUpdated"))) {
            emit ResourceUpdated("/", 0);
        }
        if (all || eventHash == keccak256(bytes("ResourceDeleted"))) {
            emit ResourceDeleted("/");
        }

        // wttp permissions contract events
        if (all || eventHash == keccak256(bytes("ResourceRoleCreated"))) {
            emit ResourceRoleCreated(bytes32(0));
        }
        if (all || eventHash == keccak256(bytes("SiteAdminChanged"))) {
            emit SiteAdminChanged(bytes32(0), bytes32(0));
        }

        // gateway contract events
    }

    function errors(string memory _errorName) public view {
        bytes32 errorHash = keccak256(bytes(_errorName));
        if (errorHash == keccak256(bytes("_400"))) {
            revert _400("Bad Request", "WTTP 400 Error");
        } else if (errorHash == keccak256(bytes("_403"))) {
            revert _403("Forbidden", bytes32(0));
        } else if (errorHash == keccak256(bytes("_404"))) {
            revert _404("Not Found", false);
        } else if (errorHash == keccak256(bytes("_405"))) {
            revert _405("Method Not Allowed", 0, true);
        } else if (errorHash == keccak256(bytes("_409"))) {
            revert _409("Conflict", "WTTP 409 Error");
        } else if (errorHash == keccak256(bytes("_410"))) {
            revert _410("Gone");
        } else if (errorHash == keccak256(bytes("_416"))) {
            revert _416("Out of Bounds", Range(0, 0), 0);
        } 

        // wttp storage contract errors
        else if (errorHash == keccak256(bytes("InvalidHeader"))) {
            revert InvalidHeader(headerInfo);
        }

        // wttp permissions contract errors
        if (errorHash == keccak256(bytes("InvalidRole"))) {
            revert InvalidRole(bytes32(0));
        }
        
        
        
    }

}