import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'unit-payment-orders';

module.exports = function (keyword, filter, select) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: select })
        .then(results => {
            return results.data.map(unitPaymentOrder => {
                unitPaymentOrder.toString = function () {
                    return `${this.no}`;
                }
                return unitPaymentOrder;
            });
        });
}
