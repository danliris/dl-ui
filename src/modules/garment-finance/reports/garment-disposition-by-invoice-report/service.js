import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-disposition-purchase/report-disposition-by-invoice';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
       // let endpoint = `${serviceUri}?unitcode=${info.unitcode}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
       console.log(info);
       let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(args) {
        var endpoint = `${serviceUri}/download?dispositionId=${args.dispositionId}&supplierId=${args.supplierId}&dateFromSendCashier=${args.dateFromSendCashier}&dateToSendCashier=${args.dateToSendCashier}&dateFromReceiptCashier=${args.dateFromReceiptCashier}&dateToReceiptCashier=${args.dateToReceiptCashier}`;
        return super.getXls(endpoint);
    }

}
