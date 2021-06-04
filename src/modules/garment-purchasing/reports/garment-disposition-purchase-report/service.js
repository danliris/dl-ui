
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../utils/rest-service';


const serviceUri = 'reports/garment-disposition-purchase';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        var args ={
            username: info.createdBy.Username,
            supplierId : info.supplierName.Id,
            supplierName : info.supplierName,name,
            dateFrom : info.dateFrom,
            dateTo : info.dateTo
        }
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, args);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/xlsx?username=${info.createdBy.Username}&supplierId=${info.supplierName.Id}&supplirName=${info.supplierName.name}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}