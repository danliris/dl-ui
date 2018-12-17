import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';

const serviceUri = 'unit-receipt-note-monitoring-all';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

search(no,  refNo,  roNo,  doNo,  unit,  supplier, dateFrom, dateTo) { 
     
        var endpoint = `${serviceUri}?no=${no}&refNo=${refNo}&roNo=${roNo}&doNo=${doNo}&unit=${unit}&supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

generateXls(no,  refNo,  roNo,  doNo,  unit,  supplier, dateFrom, dateTo) { 
       console.log(no,  refNo,  roNo,  doNo,  unit,  supplier, dateFrom, dateTo);
        var endpoint = `${serviceUri}/download?no=${no}&refNo=${refNo}&roNo=${roNo}&doNo=${doNo}&unit=${unit}&supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }
}
