import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'external-transfer-orders';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("int-purchasing");

    // var filtered = {
    //     "_IsDeleted" : false,
    //     "IsCanceled" : false,
    //     "IsClosed" : false,
    //     "IsPost" : true
    // }
console.log(config);
    // var _filter = {"$and" : [filter]};
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            console.log(results)
            return results.data
        });
}