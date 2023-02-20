import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/track';

module.exports = function (keyword, filter, select) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: select, size: 10 })
        .then(results => {
            return results.data.map(trackTx => {
                trackTx.toString = function () {
                    return [this.type, this.name]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
                return trackTx;
            })
        });
}