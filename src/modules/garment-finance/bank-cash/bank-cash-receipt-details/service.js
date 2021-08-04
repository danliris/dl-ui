import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "bank-cash-receipt-details";
const garmentCurrenciesUri = "master/garment-currencies";
const garmentInvoiceUri = "garment-shipping/invoices";

class Service extends RestService {

	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "finance");
	}

	search(info) {
		let endpoint = `${serviceUri}`;
		return super.list(endpoint, info);
	}

	getById(id) {
		let endpoint = `${serviceUri}/${id}`;
		return super.get(endpoint);
	}

	getPdfById(id) {
		let endpoint = `${serviceUri}/${id}`;
		return super.getPdf(endpoint);
	}

	create(data) {
		let endpoint = `${serviceUri}`;
		return super.post(endpoint, data);
	}

	update(data) {
		let endpoint = `${serviceUri}/${data.Id}`;
		return super.put(endpoint, data);
	}

	delete(data) {
		let endpoint = `${serviceUri}/${data.Id}`;
		return super.delete(endpoint, data);
	}
}

class CoreService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "core");
	}

	getGarmentCurrencies(info) {
		let endpoint = `${garmentCurrenciesUri}/by-before-date`;
		return super.list(endpoint, info);
	}

}

class PackingInventoryService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "packing-inventory");
	}

	getInvoiceById(id) {
		let endpoint = `${garmentInvoiceUri}/${id}`;
		return super.get(endpoint);
	}

	getInvoices(info) {
		let endpoint = `${garmentInvoiceUri}`;
		return super.list(endpoint, info);
	}
}

export { Service, CoreService, PackingInventoryService }