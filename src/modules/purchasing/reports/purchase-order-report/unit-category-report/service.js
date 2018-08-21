import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri ='purchase-orders/reports/units-categories';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getData(sdate, edate, divisi, category, currency) {
        var endpoint = `${serviceUri}`;
        console.log(divisi,category,currency);
        var query = '';
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (divisi) {
            if (query == '') query = `division=${divisi}`;
            else query = `${query}&division=${divisi}`;
        }
        if (category) {
            if (query == '') query = `categoryId=${category}`;
            else query = `${query}&categoryId=${category}`;
        }
        if (currency) {
            if (query == '') query = `currencyCode=${encodeURIComponent(currency)}`;
            else query = `${query}&currencyCode=${encodeURIComponent(currency)}`;
        }
        if (query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate, divisi, unit, category, currency) {
        var endpoint = `${serviceUri}/download`;
        var query = '';
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (unit) {
            if (query == '') query = `unit=${encodeURIComponent(unit._id)}`;
            else query = `${query}&unit=${encodeURIComponent(unit._id)}`;
        }
        if (divisi) {
            if (query == '') query = `divisi=${encodeURIComponent(divisi._id)}`;
            else query = `${query}&divisi=${encodeURIComponent(divisi._id)}`;
        }
        if (category) {
            if (query == '') query = `category=${encodeURIComponent(category._id)}`;
            else query = `${query}&category=${encodeURIComponent(category._id)}`;
        }
        if (currency) {
            if (query == '') query = `currency=${encodeURIComponent(currency._id)}`;
            else query = `${query}&currency=${encodeURIComponent(currency._id)}`;
        }
        if (query != '')
            endpoint = `${serviceUri}/download?${query}`;

        return super.getXls(endpoint);
    }

    

}
