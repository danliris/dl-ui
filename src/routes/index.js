var generalRoutes = require("./general");
var masterRoutes = require("./master");
var productionRoutes = require("./production");
var publicRoutes = require("./public");
var purchasingRoutes = require("./purchasing");
var reportRoutes = require("./report");
var authRoutes = require("./auth"); 
var salesRoutes = require("./sales");

export default [].concat(publicRoutes, generalRoutes, masterRoutes, productionRoutes, purchasingRoutes, salesRoutes, authRoutes, reportRoutes);
