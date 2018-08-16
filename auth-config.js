export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "production", "production-azure", "purchasing", "purchasing-azure", "garment-purchasing", "inventory", "inventory-azure", "garment-master-plan", "int-purchasing","customs-report","merchandiser", "deal-tracking", "sales"],
    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "Bearer",
    accessTokenProp: "data",

    storageChangedReload: true
};