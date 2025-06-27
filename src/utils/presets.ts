export enum CORSPreset {
    NONE = 0,
    PUBLIC = 1,
    RESTRICTED = 2,
    API = 3,
    MIXED_ACCESS = 4,
    PRIVATE = 5,
}

export function loadCspPreset(preset: number): string {

    let csp = "";

    if (preset === CORSPreset.NONE) {
        csp = "default-src 'none';";
    } else if (preset === CORSPreset.PUBLIC) {
        csp = "default-src 'self';" 
            + " script-src 'self' 'unsafe-inline' 'unsafe-eval';" 
            + " style-src 'self' 'unsafe-inline';" 
            + " img-src 'self' data:;" 
            + " font-src 'self';" 
            + " connect-src 'self';" 
            + " object-src 'none';" 
            + " frame-src 'none';";

    } else if (preset === CORSPreset.RESTRICTED) {
        csp = "default-src 'self';"
            + " script-src 'self';"
            + " style-src 'self';"
            + " img-src 'self';"
            + " font-src 'self';"
            + " connect-src 'self';"
            + " object-src 'none';"
            + " frame-src 'none';";
    } else if (preset === CORSPreset.API) {
        csp = "default-src 'none';"
            + " connect-src 'self';"
            + " frame-ancestors 'none';";
    } else if (preset === CORSPreset.MIXED_ACCESS) {
        csp = "default-src 'self';"
            + " script-src 'self' https:;"
            + " style-src 'self' https: 'unsafe-inline';"
            + " img-src 'self' https: data:;"
            + " font-src 'self' https:;"
            + " connect-src 'self' https:;"
            + " object-src 'none';"
            + " frame-src 'self' https:;";
    } else if (preset === CORSPreset.PRIVATE) {
        csp = "default-src 'self';"
            + " script-src 'self';"
            + " style-src 'self';"
            + " img-src 'self';"
            + " font-src 'self';"
            + " connect-src 'self';"
            + " object-src 'none';"
            + " frame-src 'none';"
            + " frame-ancestors 'none';"
            + " form-action 'self';";
    }
    
    return csp;
}