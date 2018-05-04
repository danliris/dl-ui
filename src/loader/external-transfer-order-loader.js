import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = "external-transfer-orders/modelDo";

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("int-purchasing");
    var filterTemp = Object.assign({}, filter);
    var currentUsed = filterTemp ? filterTemp.currentUsed : null;
    console.log(currentUsed);
    
    if (filterTemp && filterTemp.currentUsed) {
        delete filterTemp.currentUsed;
    }
    console.log(filterTemp);
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filterTemp), currentUsed: currentUsed })
    .then(results => {
        // return results.data.map(result => {
        //     result.toString = function () {
        //         return `${this.ETONo}`;
        //     }
        //     // console.log(results);
        //     return result;
            
        // });
        if (currentUsed) {
            return results.data.filter((data) => data && currentUsed.indexOf(data.Id) < 0);
        }
        return results.data
    });
}