import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/payment-dispositions';
const serviceUriInvoice = 'garment-shipping/invoices';
const serviceUriCoverLetter = 'garment-shipping/cover-letters';

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
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getInvoiceById(id) {
        var endpoint = `${serviceUriInvoice}/${id}`;
        return super.get(endpoint);
    }
    
    getCoverLetterByInvoice(info) {
        var endpoint = `${serviceUriCoverLetter}`;
        return super.list(endpoint, info);
    }
}

export { Service}