import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "finishing-printing/quality-control/packings-unaccepted";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}/get/movement`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info, '/get/movement');
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

        if (info.keyword)
            query = `${query}&keyword=${info.keyword}`;

        if (info.dateFrom)
            query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo)
            query = `${query}&dateTo=${info.dateTo}`;
        
        if (info.type)
            query = `${query}&type=${info.type}`;
        
        if (info.storageId)
            query = `${query}&storageId=${info.storageId}`;  

        if (query !== ''){
            query = query.substring(1);
            endpoint = `${endpoint}?${query}`;
        }

        return endpoint;
    }
}