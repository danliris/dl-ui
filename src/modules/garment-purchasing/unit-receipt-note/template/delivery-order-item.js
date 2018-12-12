import { computedFrom } from 'aurelia-framework'
export class DeliveryOrderItem {
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

    @computedFrom("data.ReceiptQuantity", "data.Conversion")
    get SmallQuantity() {
		this.data.SmallQuantity = parseFloat((this.data.ReceiptQuantity * this.data.Conversion).toFixed(2));
        return this.data.SmallQuantity;
    }
}