import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const resource = "garment-sample-cutting-ins/by-roNo-currentYear";

module.exports = function (keyword, filter) {
  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("garment-production");

  return endpoint
    .find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
    .then((results) => {
      return results.data;
    });
};
