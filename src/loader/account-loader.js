import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'accounts';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("auth");
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data.map(purchaseOrder => {
                purchaseOrder.toString = function () {
                    return `${this.profile.firstname} ${this.profile.lastname} `;
                }
                return purchaseOrder;
            });
        });
}