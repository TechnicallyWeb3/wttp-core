import { expect } from 'chai';
import hre from 'hardhat';
// constants.ts
import { 
    Method,
    getMethodCount,
    methodsToBitmask,
    bitmaskToMethods,
    createOriginsArray,
    createMixedOriginsArray,
    createCustomHeader,
    ALL_METHODS_BITMASK,
    READ_ONLY_METHODS_BITMASK,
    WRITE_METHODS_BITMASK,
    DEFAULT_ADMIN_ROLE,
    BLACKLIST_ROLE,
    PUBLIC_ROLE,
    INTRA_SITE_ROLE,
    DEFAULT_ROLES,
    MASTER_CHAIN_ID,
    ORIGINS_PUBLIC,
    ORIGINS_ADMIN_ONLY,
    ORIGINS_BLACKLISTED,
    ORIGINS_INTRA_SITE,
    ORIGINS_READ_PUBLIC_WRITE_ADMIN,
    ORIGINS_READ_PUBLIC_WRITE_INTRA,
    ORIGINS_READ_ONLY_PUBLIC,
    ORIGINS_API_PATTERN,
    ORIGINS_IMMUTABLE_CONTENT,
    ORIGINS_PRESETS,
    PUBLIC_HEADER,
    ADMIN_ONLY_HEADER,
    READ_ONLY_PUBLIC_HEADER,
    API_HEADER,
    INTRA_SITE_HEADER,
    IMMUTABLE_PUBLIC_HEADER,
    STRICT_READ_ONLY_HEADER,
    DEFAULT_HEADERS,
    DEFAULT_HEADER,
} from '../src';

// typechain-types/
import {
    IBaseWTTPPermissions,
    IBaseWTTPPermissions__factory,
    IBaseWTTPPermissionsInterface,
    IBaseWTTPStorage,
    IBaseWTTPStorage__factory,
    IBaseWTTPStorageInterface,
    IBaseWTTPSite,
    IBaseWTTPSite__factory,
    IBaseWTTPSiteInterface,
    IWTTPGateway,
    IWTTPGateway__factory,
    IWTTPGatewayInterface,
} from '../src';

// deployments.ts
import {
    getContractAddress,
    getDeploymentInfo,
    getSupportedChainIds,
    isSupportedChain,
    loadContract,
    addLocalhostDeployment,
    removeLocalhostDeployment,
    listAllDeployments,
    hasLocalhostDeployment,
} from '../src';

// propertyEncoding.ts
import {
    lookup,
    encodeProperty,
    decodeProperty,
    encodeMimeType,
    decodeMimeType,
    encodeCharset,
    decodeCharset,
    encodeLanguage,
    decodeLanguage,
    encodeEncoding,
    decodeEncoding,
    encodingToBytes,
    bytesToEncoding,
} from '../src';

import { config } from '../src';

describe('Import Test', () => {
    it('should import all constants', () => {
        it('should import all functions', () => {
            expect(getMethodCount).to.not.be.undefined;
            expect(methodsToBitmask).to.not.be.undefined;
            expect(bitmaskToMethods).to.not.be.undefined;
            expect(createOriginsArray).to.not.be.undefined;
            expect(createMixedOriginsArray).to.not.be.undefined;
            expect(createCustomHeader).to.not.be.undefined;
        });
        it('should import all constants', () => {
            expect(ALL_METHODS_BITMASK).to.not.be.undefined;
            expect(READ_ONLY_METHODS_BITMASK).to.not.be.undefined;
            expect(WRITE_METHODS_BITMASK).to.not.be.undefined;
            expect(DEFAULT_ADMIN_ROLE).to.not.be.undefined;
            expect(BLACKLIST_ROLE).to.not.be.undefined;
            expect(PUBLIC_ROLE).to.not.be.undefined;
            expect(INTRA_SITE_ROLE).to.not.be.undefined;
            expect(Object.values(DEFAULT_ROLES)).to.include(DEFAULT_ADMIN_ROLE);
            expect(MASTER_CHAIN_ID).to.not.be.undefined;
            expect(ORIGINS_PUBLIC).to.not.be.undefined;
            expect(ORIGINS_ADMIN_ONLY).to.not.be.undefined;
            expect(ORIGINS_BLACKLISTED).to.not.be.undefined;
            expect(ORIGINS_INTRA_SITE).to.not.be.undefined;
            expect(ORIGINS_READ_PUBLIC_WRITE_ADMIN).to.not.be.undefined;
            expect(ORIGINS_READ_PUBLIC_WRITE_INTRA).to.not.be.undefined;
            expect(ORIGINS_READ_ONLY_PUBLIC).to.not.be.undefined;
            expect(ORIGINS_API_PATTERN).to.not.be.undefined;
            expect(ORIGINS_IMMUTABLE_CONTENT).to.not.be.undefined;
            expect(ORIGINS_PRESETS).to.not.be.undefined;
            expect(PUBLIC_HEADER).to.not.be.undefined;
            expect(ADMIN_ONLY_HEADER).to.not.be.undefined;
            expect(READ_ONLY_PUBLIC_HEADER).to.not.be.undefined;
            expect(API_HEADER).to.not.be.undefined;
            expect(INTRA_SITE_HEADER).to.not.be.undefined;
            expect(IMMUTABLE_PUBLIC_HEADER).to.not.be.undefined;
            expect(STRICT_READ_ONLY_HEADER).to.not.be.undefined;
            expect(DEFAULT_HEADERS).to.not.be.undefined;
            expect(Object.values(DEFAULT_HEADERS)).to.include(DEFAULT_HEADER);
        });
        it('should import all types', () => {
            expect(Method).to.not.be.undefined;
        });
    });
    it('should import all typechain-types', async () => {
        // Factories
        const [signer] = await hre.ethers.getSigners();

        const permissionsContract = IBaseWTTPPermissions__factory.connect(signer.address, signer) as IBaseWTTPPermissions;
        expect(permissionsContract).to.not.be.undefined;

        const storageContract = IBaseWTTPStorage__factory.connect(signer.address, signer) as IBaseWTTPStorage;
        expect(storageContract).to.not.be.undefined;

        const siteContract = IBaseWTTPSite__factory.connect(signer.address, signer) as IBaseWTTPSite;
        expect(siteContract).to.not.be.undefined;

        const gatewayContract = IWTTPGateway__factory.connect(signer.address, signer) as IWTTPGateway;
        expect(gatewayContract).to.not.be.undefined;
    });

    it('should import all deployment functions', () => {
        expect(getContractAddress).to.not.be.undefined;
        expect(getDeploymentInfo).to.not.be.undefined;
        expect(getSupportedChainIds).to.not.be.undefined;
        expect(isSupportedChain).to.not.be.undefined;
        expect(loadContract).to.not.be.undefined;
        expect(addLocalhostDeployment).to.not.be.undefined;
        expect(removeLocalhostDeployment).to.not.be.undefined;
        expect(listAllDeployments).to.not.be.undefined;
        expect(hasLocalhostDeployment).to.not.be.undefined;
    });

    it('should import all property encoding functions', () => {
        expect(lookup).to.not.be.undefined;
        expect(encodeProperty).to.not.be.undefined;
        expect(decodeProperty).to.not.be.undefined;
        expect(encodeMimeType).to.not.be.undefined;
        expect(decodeMimeType).to.not.be.undefined;
        expect(encodeCharset).to.not.be.undefined;
        expect(decodeCharset).to.not.be.undefined;
        expect(encodeLanguage).to.not.be.undefined;
        expect(decodeLanguage).to.not.be.undefined;
        expect(encodeEncoding).to.not.be.undefined;
        expect(decodeEncoding).to.not.be.undefined;
        expect(encodingToBytes).to.not.be.undefined;
        expect(bytesToEncoding).to.not.be.undefined;
    });
});
