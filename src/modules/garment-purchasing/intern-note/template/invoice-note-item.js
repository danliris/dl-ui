export class InvoiceNoteItem {
	
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		this.data.pricePerDealUnit=parseFloat(this.data.pricePerDealUnit).toFixed(4).toLocaleString('id-ID', { maximumFractionDigits: 4,minimumFractionDigits:4});
		this.data.quantity=parseFloat(this.data.quantity).toFixed(2).toLocaleString('id-ID', { maximumFractionDigits: 2,minimumFractionDigits:2});
		this.data.priceTotal=parseFloat(this.data.priceTotal).toFixed(2).toLocaleString('id-ID', { maximumFractionDigits: 2,minimumFractionDigits:2});
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
