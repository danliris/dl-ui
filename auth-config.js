export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core","core-azure", "production", "purchasing", "purchasing-azure", "garment-purchasing", "inventory", "inventory-azure", "garment-master-plan", "int-purchasing", "customs-report", "merchandiser", "finance", "weaving"],
    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "Bearer",
    accessTokenProp: "data",

    storageChangedReload: true
};