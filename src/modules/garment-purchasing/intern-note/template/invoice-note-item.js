export class InvoiceNoteItem {
	
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
	}

	get total() {
		return this.data.dOQuantity * this.data.pricePerDealUnit;
	}

	get status() {
		var receiptQuantityTotal = 0;
		var deliveryOrderItems = this.data.deliveryOrder.items || [];
		for(var deliveryOrderItem of deliveryOrderItems){
			for(var deliveryOrderDetail of deliveryOrderItem.fulfillments){
				receiptQuantityTotal += deliveryOrderDetail.receiptQuantity;
			}
		}
		return receiptQuantityTotal > 0 ? "Sudah" : "Belum";
	}
	get product() {
		return `${this.data.product.Code} - ${this.data.product.Name}`;
	}
}
