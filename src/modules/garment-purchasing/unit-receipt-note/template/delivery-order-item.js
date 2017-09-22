import { bindable } from 'aurelia-framework'
var UomLoader = require('../../../../loader/uom-loader');
export class DeliveryOrderItem {
	@bindable selectedUomConversion;
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		this.selectedUomConversion = this.data.uomConversion;
	}

	get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

	get buyer() {
		return this.data.buyer.name;
	}

	get uomLoader() {
		return UomLoader;
	}

	uomView = (uom) => {
		return uom.unit
	}

	selectedUomConversionChanged(newValue) {
		if (newValue) {
			if (newValue._id) {
				this.data.uomConversion = newValue;
				if (newValue.unit)
					if (this.data.uomConversion.unit == this.data.purchaseOrderUom.unit) {
						this.data.conversion = 1;
					}
			}
		}
	}
}