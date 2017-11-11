export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "production", "purchasing","garment-master-plan","garment-purchasing","inventory"],

    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};