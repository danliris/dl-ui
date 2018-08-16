import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-orders/reports/suppliers';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

getDataSpl(unit, category, sdate, edate) {
  console.log(sdate);
        var endpoint = `${serviceUri}`;
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
            if (query == '') query = `unit=${encodeURIComponent(unit.Id)}`;
            else query = `${query}&unit=${encodeURIComponent(unit.Id)}`;
        }
        if (category) {
            if (query == '') query = `category=${encodeURIComponent(category._id)}`;
            else query = `${query}&category=${encodeURIComponent(category._id)}`;
        }
       
        if (query != '')
            endpoint = `${serviceUri}?${query}`;
        return super.get(endpoint);
    }

generateExcel(unit, category, sdate, edate) {
        var endpoint =  `${serviceUri}/download`;
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
            if (query == '') query = `unit=${encodeURIComponent(unit.Id)}`;
            else query = `${query}&unit=${encodeURIComponent(unit.Id)}`;
        }
        if (category) {
            if (query == '') query = `category=${encodeURIComponent(category._id)}`;
            else query = `${query}&category=${encodeURIComponent(category._id)}`;
        }
            
        if (query !== '')
        endpoint = `${serviceUri}/download?${query}`;
       console.log(sdate);
        return super.getXls(endpoint);
    }
}