import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/machines';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    var filterName = {
        "name" : {
            '$regex' : keyword,
            '$options' : 'i'
        }
    }
    var _filter = {"$and" : [filter, filterName]};
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(_filter) })
        .then(results => {
            return results.data
        });
}
