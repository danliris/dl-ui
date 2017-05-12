import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "inventory/inventory-movement";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}/get/search`;
        // var endpoint = this._getEndPoint(info, '/get/search');
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info, '/generate/excel');
        return super.getXls(endpoint);
    }

    _getEndPoint(info, uri) {
        var endpoint = `${serviceUri}${uri}`;
        var query = '';

        if (info.order && typeof info.order === "object"){
            info.order = JSON.stringify(info.order);

            query = `${query}&order=${info.order}`;
        }
        else
            delete info.order;

        if (info.page)
            query = `${query}&page=${info.page}`;

        if (info.size)
            query = `${query}&size=${info.size}`;

        if (info.keyword)
            query = `${query}&keyword=${info.keyword}`;

        if (info.dateFrom)
            query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo)
            query = `${query}&dateTo=${info.dateTo}`;    

        if (query !== ''){
            query = query.substring(1);
            endpoint = `${endpoint}?${query}`;
        }

        return endpoint;
    }
}