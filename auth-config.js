export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "production", "purchasing","garment-purchasing","inventory","garment-master-plan"],

    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};