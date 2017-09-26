export class InvoiceNoteItem {
	
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
	}

	get total() {
		return this.data.deliveredQuantity * this.data.pricePerDealUnit;
	}

	get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}
}