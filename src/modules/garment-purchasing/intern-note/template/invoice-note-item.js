export class InvoiceNoteItem {
	
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		//console.log(this.data);
	}

	get total() {
		return this.data.dOQuantity * this.data.pricePerDealUnit;
	}

	get status() {
		return this.data.hasUnitReceiptNote ? "Sudah" : "Belum";
	}

	get product() {
		return `${this.data.product.Code} - ${this.data.product.Name}`;
	}
}