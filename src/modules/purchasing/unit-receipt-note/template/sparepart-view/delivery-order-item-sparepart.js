import { inject, BindingEngine } from 'aurelia-framework';

@inject(BindingEngine)
export class DeliveryOrderItem {
	constructor(bindingEngine) {
		this.bindingEngine = bindingEngine;
		this.subscription = null;
	}


	activate(context) {
		this.context = context;
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		if(this.data.deliveredQuantity){
			this.data.deliveredQuantity=this.data.deliveredQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
		  }
	}

	get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

	get isStorage() {
		// Selalu ambil dari context.options agar reaktif
		return this.context && this.context.context && this.context.context.options && this.context.context.options.isStorage;
		console.log(this.context.context.options.isStorage);
	}
	
}