import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'purchase-orders/unposted';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing");
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data.map(purchaseOrder => {
                purchaseOrder.toString = function () {
                    return `${this.purchaseRequest.no}`;
                }
                return purchaseOrder;
            });
        });
}