import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'purchase-orders/report/monitoring-purchase';

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

        if (info.supplierId)
            query = `${query}&supplierId=${info.supplierId}`;

        if (info.unitId)
            query = `${query}&unitId=${info.unitId}`;

        if (info.categoryId)
            query = `${query}&categoryId=${info.categoryId}`;

        if (info.purchaseOrderExternalNo)
            query = `${query}&purchaseOrderExternalNo=${info.purchaseOrderExternalNo}`;

        if (info.roNo)
            query = `${query}&roNo=${info.roNo}`;

        if (info.artikel)
            query = `${query}&artikel=${info.artikel}`;
            
        if (info.prRefNo)
            query = `${query}&prRefNo=${info.prRefNo}`;
        
        if (info.deliveryOrderNo)
            query = `${query}&deliveryOrderNo=${info.deliveryOrderNo}`;
        
        if (info.state)
            query = `${query}&state=${info.state}`;

        if (query !== '') {
            query = query.substring(1);
            endpoint = `${endpoint}?${query}`;
        }
        return endpoint;
    }
}