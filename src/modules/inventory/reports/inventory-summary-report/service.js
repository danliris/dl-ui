import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "inventory/inventory-summary-reports";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        console.log(info);
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/download`;
        var query = '';

        // if (info.order && typeof info.order === "object"){
        //     info.order = JSON.stringify(info.order);

        //     query = `${query}&order=${info.order}`;
        // }
        // else
        //     delete info.order;

        if (info.productId)
            query = `${query}&productCode=${info.productCode}`;

        if (info.storageId)
            query = `${query}&storageCode=${info.storageCode}`;

        if (query !== ''){
            // query = query.substring(1);
            // endpoint = `${endpoint}?${query}`;
            endpoint = `${serviceUri}/download?${query}`;
        }

        return endpoint;
    }
}