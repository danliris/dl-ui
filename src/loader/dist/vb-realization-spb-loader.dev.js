"use strict";

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

var _aureliaApi = require("aurelia-api");

var resource = 'vb-request-po-external/spb';

module.exports = function (keyword, filter) {
  var config = _aureliaDependencyInjection.Container.instance.get(_aureliaApi.Config);

  var endpoint = config.getEndpoint("purchasing-azure");
  return endpoint.find(resource, {
    keyword: keyword,
    division: filter.division,
    epoIds: filter.epoIds,
    size: 10
  }).then(function (results) {
    return results.data.map(function (result) {
      result.toString = function () {
        return "".concat(this.No);
      };

      return result;
    });
  });
};