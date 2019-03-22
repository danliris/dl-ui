import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


//const serviceUri = 'garment-delivery-orders/monitoring';
const serviceUri = 'garment-internal-purchase-orders/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getXls(info) {
        //var endpoint = `${serviceUri}/download?no=${info.no}&poEksNo=${info.poEksNo}&supplierId=${info.supplierId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        var endpoint = `${serviceUri}/download?category=${info.category}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}
