export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "production", "purchasing", "garment-purchasing", "inventory", "inventory-azure", "garment-master-plan"],

    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "Bearer",
    accessTokenProp: "data",

    storageChangedReload: true
};