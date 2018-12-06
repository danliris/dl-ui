import { bindable } from 'aurelia-framework'
export class DeliveryOrderItem {
	@bindable selectedUomConversion;
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		if (!this.data.Buyer) {
			this.data.Buyer = { Name: "" }
		}
	}

	get product() {
		return `${this.data.Product.Code} - ${this.data.Product.Name}`;
	}

	get SmallQuantity() {
		return parseFloat((this.data.ReceiptQuantity * this.data.Conversion).toFixed(2));
	}

	conversionChanged(e) {
		this.data.SmallQuantity = parseFloat((this.data.ReceiptQuantity * this.data.Conversion).toFixed(2));
	}
}