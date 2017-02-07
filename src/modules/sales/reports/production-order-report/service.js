import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'sales/reports/production-order-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getReport(sdate, edate, scno, orderNo, orderType, processType, buyer, account) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (scno && scno !== '') {
            if (query === '') query = `salesContractNo=${scno}`;
            else query = `${query}&salesContractNo=${scno}`;
        }
        if (orderNo && orderNo !== '') {
            if (query === '') query = `orderNo=${orderNo}`;
            else query = `${query}&orderNo=${orderNo}`;
        }
        if (orderType) {
            if (query === '') query = `orderTypeId=${orderType._id}`;
            else query = `${query}&orderTypeId=${orderType._id}`;
        }
        if (processType) {
            if (query === '') query = `processTypeId=${processType._id}`;
            else query = `${query}&processTypeId=${processType._id}`;
        }
        if (buyer) {
            if (query === '') query = `buyerId=${buyer._id}`;
            else query = `${query}&buyerId=${buyer._id}`;
        }
        if (account) {
            if (query === '') query = `accountId=${account._id}`;
            else query = `${query}&accountId=${account._id}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate, scno, orderNo, orderType, processType, buyer, account) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (scno) {
            if (query === '') query = `salesContractNo=${scno}`;
            else query = `${query}&salesContractNo=${scno}`;
        }
        if (orderNo) {
            if (query === '') query = `orderNo=${orderNo}`;
            else query = `${query}&orderNo=${orderNo}`;
        }
        if (orderType) {
            if (query === '') query = `orderTypeId=${orderType._id}`;
            else query = `${query}&orderTypeId=${orderType._id}`;
        }
        if (processType) {
            if (query === '') query = `processTypeId=${processType._id}`;
            else query = `${query}&processTypeId=${processType._id}`;
        }
        if (buyer) {
            if (query === '') query = `buyerId=${buyer._id}`;
            else query = `${query}&buyerId=${buyer._id}`;
        }
        if (account) {
            if (query === '') query = `accountId=${account._id}`;
            else query = `${query}&accountId=${account._id}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.getXls(endpoint);
    }
}