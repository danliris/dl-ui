import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = '/purchase-orders/externals/report/over-budget';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = serviceUri;
        var query = '';

        if (info.dateFrom)
            query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo)
            query = `${query}&dateTo=${info.dateTo}`;

        if (info.buyerId)
            query = `${query}&buyerId=${info.buyerId}`;

        if (info.unitId)
            query = `${query}&unitId=${info.unitId}`;

        if (info.categoryId)
            query = `${query}&categoryId=${info.categoryId}`;

        if (info.prNo)
            query = `${query}&prNo=${info.prNo}`;

        if (info.isApproved) {
            query = `${query}&isApproved=${info.isApproved}`;
        }

        if (query !== '') {
            query = query.substring(1);
            endpoint = `${endpoint}?${query}`;
        }
        return endpoint;
    }
}