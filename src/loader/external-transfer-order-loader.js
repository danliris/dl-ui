import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = "external-transfer-orders/modelDo";

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("int-purchasing");
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
    .then(results => {
        return results.data.map(result => {
            result.toString = function () {
                return `${this.ETONo}`;
            }
            console.log(results);
            return result;
            
        });
    });
}