import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
const serviceUri = 'garment-shipping/invoices';
const resourceStockUri = 'garment-shipping/packing-lists';
 
import { Config } from "aurelia-api";
class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
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
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getPackingListById(id) {
        var endpoint = `${resourceStockUri}/${id}`;
        console.log(endpoint);
        return super.get(endpoint);
    }
  
}

  

export { Service }