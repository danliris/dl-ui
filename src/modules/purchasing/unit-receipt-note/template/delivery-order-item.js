export class DeliveryOrderItem {
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
	}

	get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}
}