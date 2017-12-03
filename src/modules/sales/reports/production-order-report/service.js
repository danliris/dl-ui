import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'sales/reports/production-order-report';
const serviceDetailsUri = 'sales/reports/production-order-report/details';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getReport(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getDetailReport(salesContractNo) {
        var endpoint = `${serviceDetailsUri}?salesContractNo=${salesContractNo}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}`;
        var query = '';

        if (info.salesContractNo) {
            if (query === '') query = `salesContractNo=${info.salesContractNo}`;
            else query = `${query}&salesContractNo=${info.salesContractNo}`;
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
        if (info.sdate) {
            if (query === '') query = `sdate=${info.sdate}`;
            else query = `${query}&sdate=${info.sdate}`;
        }
        if (info.edate) {
            if (query === '') query = `edate=${info.edate}`;
            else query = `${query}&edate=${info.edate}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return endpoint;
    }
}