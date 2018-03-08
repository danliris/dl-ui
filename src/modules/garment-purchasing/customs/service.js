import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'customs';
const deliveryOrderForCustoms = 'delivery-orders';
const serviceUriUnitReceiptNotes = 'unit-receipt-notes/by-user';

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

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    searchDeliveryOrder(info) {
        var endpoint = `${deliveryOrderForCustoms}`;
        var filter = {
                    "supplier.code" : info.supplier ? info.supplier : "",
                    "useCustoms":true,
                    "items" : {
                        "$elemMatch" : {
                            "fulfillments" :
                            { 
                                "$elemMatch" : {
                                    "currency.code" : info.currency ? info.currency : ""
                                }
                            }
                        }
                    },
                    "customsId" : { "$type": 10 },
                    "_deleted" : false
                };
        var arc = {
                filter : JSON.stringify(filter),
                select : ["no","date","supplierDoDate","items"],
                size: 200
            }
        return super.list(endpoint, arc);
    }

    isCreatedOfUnitReceiptNotes(info) {
        var endpoint = `${serviceUriUnitReceiptNotes}`;
        return super.list(endpoint, info);
    }
}