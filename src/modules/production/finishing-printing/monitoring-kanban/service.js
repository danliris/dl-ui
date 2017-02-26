import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'finishing-printing/monitoring-kanbans';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getReport(sdate, edate, orderNo, orderType, processType) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query === '') query = `sdate=${sdate}`;
            else query = `${query}&sdate=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `edate=${edate}`;
            else query = `${query}&edate=${edate}`;
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
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate, orderNo, orderType, processType) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query === '') query = `sdate=${sdate}`;
            else query = `${query}&sdate=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `edate=${edate}`;
            else query = `${query}&edate=${edate}`;
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
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.getXls(endpoint);
    }
}