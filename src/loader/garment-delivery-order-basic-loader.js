import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = '/basic-delivery-orders';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("garment-purchasing");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data;
        });
}