import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/machine';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("production");
    // var filterName = {
    //     "name" : {
    //         '$regex' : keyword,
    //         '$options' : 'i'
    //     }
    // }
    // var _filter = {"$and" : [filter, filterName]};
    // return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(_filter) })
    //     .then(results => {
    //         return results.data
    //     });
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data
        });
}
