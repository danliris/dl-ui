import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service'; 

const serviceUri = 'unit-receipt-without-spb';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
    }

    

    search(unitId, dateFrom, dateTo) {
    var endpoint = `${serviceUri}?unitId=${unitId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return super.get(endpoint);
    
   }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    
    generateExcel(unitId, sdate, edate) {
     var endpoint = `${serviceUri}`;
     var query = '';
     if (unitId) {
            if (query == '') query = `unitId=${encodeURIComponent(unitId._id)}`;
            else query = `${query}&unitId=${encodeURIComponent(unitId._id)}`;
        }

     if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
     if (query != '')
            endpoint = `${serviceUri}?${query}`;
        return super.getXls(endpoint);
    }

}
