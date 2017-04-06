import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/reports/monitoring-events';
const machineServiceUri = 'finishing-printing/reports/monitoring-specification-machine/by-event';
var moment = require('moment');
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

    _getEndPoint(info) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info.machineId) {
            if (query === '') query = `machineId=${info.machineId}`;
            else query = `${query}&machineId=${info.machineId}`;
        }
        if (info.machineEventCode) {
            if (query === '') query = `machineEventCode=${info.machineEventCode}`;
            else query = `${query}&machineEventCode=${info.machineEventCode}`;
        }
        if (info.productionOrderNumber) {
            if (query === '') query = `productionOrderNumber=${info.productionOrderNumber}`;
            else query = `${query}&productionOrderNumber=${info.productionOrderNumber}`;
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

    getMachine(info) {
        var time = info.time.split(":");
        var date = info.date.toString();
        var dateTime = new Date(date);

        dateTime.setHours(time[0]);
        dateTime.setMinutes(time[1]);
        var query = '';

        query = `machineId=${info.machineId}&productionOrderNumber=${info.productionOrderNumber}&date=${dateTime}`;

        var endpoint = `${machineServiceUri}?${query}`;
        return super.get(endpoint);
    }
}