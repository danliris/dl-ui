import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const deliveryOrderServiceUri = 'delivery-orders';
const serviceUri = 'purchase-quantity-correction/by-user';
const purchaseOrderExternalServiceUri = 'purchase-orders/externals/by-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    searchDeliveryOrder(info) {
        info.filter = JSON.stringify({ hasInvoice: true });
        var endpoint = `${deliveryOrderServiceUri}`;
        return super.list(endpoint, info);
    }

    getDeliveryOrderById(id) {
        var endpoint = `${deliveryOrderServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfReturnNotePph(id) {
        var endpoint = `purchase-quantity-corrections/return-note/pph/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfReturnNotePpn(id) {
        var endpoint = `purchase-quantity-corrections/return-note/ppn/${id}`;
        return super.getPdf(endpoint);
    }

    getPOExternalById(id) {
        var endpoint = `${purchaseOrderExternalServiceUri}/${id}`;
        return super.get(endpoint);
    }
}
