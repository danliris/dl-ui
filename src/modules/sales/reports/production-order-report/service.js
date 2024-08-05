import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'sales/reports/production-order-report';
//const serviceDetailsUri = 'sales/reports/production-order-report/details';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    getReport(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getDetailReport(id) {
        var endpoint = `${serviceUri}/detail/${id}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    generateExcel2(info) {
        var endpoint = this._getEndPoint2(info); // Sesuaikan endpoint atau parameter untuk laporan IEDP
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/download`;
        var query = '';

        // if (info.salesContractNo) {
        //     if (query === '') query = `salesContractNo=${info.salesContractNo}`;
        //     else query = `${query}&salesContractNo=${info.salesContractNo}`;
        // }

        if (info.poType) {
            if (query === '') query = `poType=${info.poType}`;
            else query = `${query}&poType=${info.poType}`;
        }

        if (info.orderNo) {
            if (query === '') query = `orderNo=${info.orderNo}`;
            else query = `${query}&orderNo=${info.orderNo}`;
        }
        if (info.orderTypeId) {
            if (query === '') query = `orderTypeId=${info.orderTypeId}`;
            else query = `${query}&orderTypeId=${info.orderTypeId}`;
        }
        if (info.processTypeId) {
            if (query === '') query = `processTypeId=${info.processTypeId}`;
            else query = `${query}&processTypeId=${info.processTypeId}`;
        }
        if (info.buyerId) {
            if (query === '') query = `buyerId=${info.buyerId}`;
            else query = `${query}&buyerId=${info.buyerId}`;
        }
        if (info.accountId) {
            if (query === '') query = `accountId=${info.accountId}`;
            else query = `${query}&accountId=${info.accountId}`;
        }
        if (info.dateFrom) {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if(info.construction){
          if(query === '') query = `construction=${info.construction}`;
          else query = `${query}&construction=${info.construction}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}/download?${query}`;

        return endpoint;
    }
    _getEndPoint2(info) {
        var endpoint = `${serviceUri}/download2`;
        var query = '';

        // if (info.salesContractNo) {
        //     if (query === '') query = `salesContractNo=${info.salesContractNo}`;
        //     else query = `${query}&salesContractNo=${info.salesContractNo}`;
        // }
        if (info.poType) {
            if (query === '') query = `poType=${info.poType}`;
            else query = `${query}&poType=${info.poType}`;
        }
        if (info.orderNo) {
            if (query === '') query = `orderNo=${info.orderNo}`;
            else query = `${query}&orderNo=${info.orderNo}`;
        }
        if (info.orderTypeId) {
            if (query === '') query = `orderTypeId=${info.orderTypeId}`;
            else query = `${query}&orderTypeId=${info.orderTypeId}`;
        }
        if (info.processTypeId) {
            if (query === '') query = `processTypeId=${info.processTypeId}`;
            else query = `${query}&processTypeId=${info.processTypeId}`;
        }
        if (info.buyerId) {
            if (query === '') query = `buyerId=${info.buyerId}`;
            else query = `${query}&buyerId=${info.buyerId}`;
        }
        if (info.accountId) {
            if (query === '') query = `accountId=${info.accountId}`;
            else query = `${query}&accountId=${info.accountId}`;
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
            endpoint = `${serviceUri}/download2?${query}`;

        return endpoint;
    }
}