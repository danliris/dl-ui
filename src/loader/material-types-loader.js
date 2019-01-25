import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'material-types';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("weaving");
console.log(endpoint)
console.log(resource)
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            console.log(result)
            return results.data
        });
}