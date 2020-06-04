export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "production", "production-azure", "purchasing", "purchasing-azure", "garment-purchasing", "inventory", "inventory-azure", "garment-master-plan", "int-purchasing", "customs-report", "merchandiser", "deal-tracking", "sales", "spinning", "weaving", "finance", "garment-production","garment-shipping", "packing-inventory"],
    loginUrl: "authenticate",
    profileUrl: "me",

    authTokenType: "Bearer",
    accessTokenProp: "data",

    storageChangedReload: true
};
