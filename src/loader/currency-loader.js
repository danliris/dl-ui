import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/product-budget';

module.exports = function(keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("core");

  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
  .then(results => {
            return results.data.map(currency => {
                currency.toString = function () {
                    return `${this.process}`;
                }
                return currency;
            });
        });
}
