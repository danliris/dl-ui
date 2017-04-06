import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'finishing-printing/reports/finishing-printing-sales-contract-reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info)
    {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info.buyerId) {
            if (query === '') query = `buyerId=${info.buyerId}`;
            else query = `${query}&buyerId=${info.buyerId}`;
        }
        if (info.orderTypeId) {
            if (query === '') query = `orderTypeId=${info.orderTypeId}`;
            else query = `${query}&orderTypeId=${info.orderTypeId}`;
        }
        if (info.comodityId) {
            if (query === '') query = `comodityId=${info.comodityId}`;
            else query = `${query}&comodityId=${info.comodityId}`;
        }
        if (info.salesContractNo) {
            if (query === '') query = `salesContractNo=${info.salesContractNo}`;
            else query = `${query}&salesContractNo=${info.salesContractNo}`;
        }
        if (info.dateFrom) {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;
        
        return endpoint;
    }
}