import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "garment-memorial-details";

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

const garmentCurrencyUri = 'master/garment-currencies/by-code-before-date';
class CoreService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "core");
	}

	getGarmentCurrencies(info) {
		var resource = `master/garment-currencies/by-before-date`;
		var config = Container.instance.get(Config);
		var endpoint = config.getEndpoint("core");

		return endpoint.find(resource, info)
		.then(results => {
		return results.data;
		});
	}

}

const invoiceServiceUri = 'garment-shipping/invoices';
class PackingInvService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "packing-inventory");
	}

	getInvoiceById(id) {
		let endpoint = `${invoiceServiceUri}/${id}`;
		return super.get(endpoint);
	}

}

export { Service, CoreService,PackingInvService }