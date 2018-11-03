import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'garment-intern-notes/by-user';
const invoiceNoteUri = 'garment-invoices/no-intern-note';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
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

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    getInvoiceNote(filter) {
        var endpoint = `${invoiceNoteUri}`;
        return super.list(endpoint, { filter: JSON.stringify(filter) });
    }

    getGarmentInvoiceById(id){
        var endpoint = `garment-invoices/${id}`;
        return super.get(endpoint);
    }

    getDeliveryOrderById(id) {
        var select =["doNo","_id","items.purchaseOrderExternal.no","items.fulfillments.purchaseOrderNo","items.fulfillments.product.Id","items.fulfillments.realizationQuantity"]
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("purchasing-azure");
        var _serviceUri = `garment-delivery-orders/by-user/${id}`;

        return _endpoint.find(_serviceUri, { "select": select })
            .then(result => {
                return result.data;
            });
    }
}