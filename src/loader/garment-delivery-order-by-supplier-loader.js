import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'delivery-orders/by-supplier';

module.exports = function(keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("garment-purchasing");

  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(deliveryOrder => {
                        deliveryOrder.toString = function () {
                            return `${this.no}`;
                        }
                        return deliveryOrder;
                    });
                });
}