import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'external-purchase-orders/disposition';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");
    console.log(filter)
    return endpoint.find(resource, { keyword: keyword,
                                    currencyId:filter.currencyId, 
                                    divisionId:filter.divisionId, 
                                    categoryId:filter.categoryId, 
                                    supplierId:filter.supplierId })
        .then(results => {
            return results.data.map(purchaseOrderExternal => {
                purchaseOrderExternal.toString = function () {
                    return `${this.no}`;
                }
                return purchaseOrderExternal;
            });
        });
}