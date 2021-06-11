
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../utils/rest-service';

import moment from 'moment';

const serviceUri = 'reports/garment-disposition-purchase';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        console.log(info);
        var username =null;
        var supplierId =0;
        var supplierName = null;
        var dateFromString = null;
        var dateToString = null;

        if(info.createdBy != null){
            username = info.createdBy.Username;
        }
        if(info.supplierName!= null){
            supplierId = info.supplierName.Id;
            supplierName = info.supplierName.name;
        }
        if(info.dateFrom != null){
            dateFromString = moment(info.dateFrom).format("YYYY-MM-DD");
        }
        if(info.dateTo != null){
            dateToString = moment(info.dateTo).format("YYYY-MM-DD");
        }
        var args ={
            username: username,
            supplierId : supplierId,
            supplierName : supplierName,
            dateFrom : dateFromString,
            dateTo : dateToString
        }
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, args);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        var username =null;
        var supplierId =0;
        var supplierName = null;
        if(info.createdBy != null){
            username = info.createdBy.Username;
        }
        if(info.supplierName!= null){
            supplierId = info.supplierName.Id;
            supplierName = info.supplierName.name;
        }
        var args ={
            username: username,
            supplierId : supplierId,
            supplierName : supplierName,
            dateFrom : info.dateFrom,
            dateTo : info.dateTo
        }
        var endpoint = `${serviceUri}/xlsx?username=${args.username}&supplierId=${args.supplierId}&supplirName=${args.supplierName}&dateFrom=${args.dateFrom}&dateTo=${args.dateTo}`;
        return super.getXls(endpoint);
    }
}