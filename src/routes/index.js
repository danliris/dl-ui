var generalRoutes = require("./general");
var masterRoutes = require("./master");
var productionRoutes = require("./production");
var inventoryRoutes = require("./inventory");
var publicRoutes = require("./public");
var purchasingRoutes = require("./purchasing");
var reportRoutes = require("./report");
var authRoutes = require("./auth");
var salesRoutes = require("./sales");
var inventoryRoutes = require("./inventory");
var marketingRoutes = require("./marketing");

export default [].concat(publicRoutes, generalRoutes, masterRoutes, productionRoutes, purchasingRoutes, salesRoutes, inventoryRoutes, marketingRoutes, authRoutes, reportRoutes);
