import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/payment-dispositions';
const serviceUriEMKL = 'garment-shipping/payment-dispositions/EMKL';
const serviceUriInvoice = 'garment-shipping/invoices';
const serviceUriCoverLetter = 'garment-shipping/cover-letters';
const serviceUriPL = 'garment-shipping/packing-lists';


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

    getInvoice(info) {
        var endpoint = `${serviceUriInvoice}`;
        return super.list(endpoint,info);
    }

    getCoverLetterByInvoice(info) {
        var endpoint = `${serviceUriCoverLetter}`;
        return super.list(endpoint, info);
    }
    
    getPackingListByInvoice(info) {
        var endpoint = `${serviceUriPL}`;
        return super.list(endpoint, info);
    }
    
    getPLById(id) {
        var endpoint = `${serviceUriPL}/${id}`;
        return super.get(endpoint);
    }
    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
    //EMKL
    createEMKL(data) {
        var endpoint = `${serviceUriEMKL}`;
        return super.post(endpoint, data);
    }
    getByIdEMKL(id) {
        var endpoint = `${serviceUriEMKL}/${id}`;
        return super.get(endpoint);
    }
    updateEMKL(data) {
        var endpoint = `${serviceUriEMKL}/${data.id}`;
        return super.put(endpoint, data);
    }
    getPdfByIdEMKL(id) {
        var endpoint = `${serviceUriEMKL}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
}

export { Service}