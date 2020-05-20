import { RestService } from "../../../utils/rest-service";

const serviceUri = "sales/do-return";
const salesInvoiceServiceUri = "sales/sales-invoices";
const shipmentDocumentServiceUri =
  "finishing-printing/inventory/fp-shipment-documents/new";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
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

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  searchSalesInvoice(info) {
    var endpoint = `${salesInvoiceServiceUri}`;
    return super.list(endpoint, info);
  }

  getSalesInvoiceById(id, select) {
    var endpoint = `${salesInvoiceServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
}

export class ServiceProductionAzure extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "production-azure");
  }

  searchShipmentDocument(info) {
    var endpoint = `${shipmentDocumentServiceUri}`;
    return super.list(endpoint, info);
  }

  getShipmentDocumentById(id, select) {
    var endpoint = `${shipmentDocumentServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchGroupedProduct(shipmentDocumentId) {
    var endpoint = `${shipmentDocumentServiceUri}/product-names/${shipmentDocumentId}`;
    return super.get(endpoint);
  }
  searchGroupedProductWithProductIdentity(shipmentDocumentId) {
    var endpoint = `${shipmentDocumentServiceUri}/${shipmentDocumentId}`;
    return super.get(endpoint);
  }
}
