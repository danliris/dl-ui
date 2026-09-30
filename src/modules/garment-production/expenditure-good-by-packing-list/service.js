import { RestService } from '../../../utils/rest-service';

const serviceUri = 'expenditure-goods-by-pl';
const comodityPriceserviceUri = 'comodity-prices';
const finishedGoodServiceUri = 'finished-good-stocks';
const serviceUriFinOut = 'finishing-outs';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        return super.list(`${serviceUri}`, info);
    }

    getComodityPrice(info) {
        return super.list(`${comodityPriceserviceUri}`, info);
    }

    getFinishedGood(info) {
        const filter = info && info.filter ? JSON.parse(info.filter) : {};
        const roNos = Array.isArray(filter.RONo)
            ? filter.RONo
            : (filter.RONo ? [filter.RONo] : []);

        return super.post(`${serviceUri}/finished-goods`, {
            UnitId: Number(filter.UnitId || 0),
            RONos: roNos
        });
    }

    getFinishedGoodByRo(info) {
        return super.list(`${finishedGoodServiceUri}/get-by-ro`, info);
    }

    getIssuedByPackingList(packingListId) {
        return super.get(`${serviceUri}/packing-list/${packingListId}/issued`);
    }

    create(data) {
        return super.post(`${serviceUri}`, data);
    }

    read(id) {
        return super.get(`${serviceUri}/${id}`);
    }

    update(data) {
        return super.put(`${serviceUri}/${data.Id}`, data);
    }

    delete(data) {
        return super.delete(`${serviceUri}/${data.Id}`, data);
    }

    searchFinishingOut(info) {
        return super.list(`${serviceUriFinOut}`, info);
    }

    getPdfById(id) {
    return super.getPdf(
        `${serviceUri}/${id}/pdf`
    );
}
}

const shippingInvoiceServiceUri = 'garment-shipping/invoices/packingListById';

class PackingInventoryService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    getDataByPackingLisId(id) {
        return super.get(`${shippingInvoiceServiceUri}/${id}`);
    }
}

export { Service, PackingInventoryService };
