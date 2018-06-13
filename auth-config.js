export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "production", "purchasing", "purchasing-azure", "garment-purchasing", "inventory", "inventory-azure", "garment-master-plan", "int-purchasing","customs-report","merchandiser", "deal-tracking"],
    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "Bearer",
    accessTokenProp: "data",

    storageChangedReload: true
};