export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "production", "purchasing","inventory"],

    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};