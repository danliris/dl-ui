import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'inventory/fp-retur-to-qc-docs';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data;
        });

}