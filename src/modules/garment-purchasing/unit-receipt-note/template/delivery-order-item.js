import { bindable } from 'aurelia-framework'
export class DeliveryOrderItem {
	@bindable selectedUomConversion;
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		if (!this.data.buyer) {
			this.data.buyer = { name: "" }
		}
	}

	get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

	get buyer() {
		return this.data.buyer.name;
	}

	get quantityConversion() {
		return this.data.deliveredQuantity * this.data.conversion;
	}

	conversionChanged(e) {
		this.data.quantityConversion = this.data.deliveredQuantity * this.data.conversion;
	}
}