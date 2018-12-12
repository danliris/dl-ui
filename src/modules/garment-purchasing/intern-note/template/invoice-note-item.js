export class InvoiceNoteItem {
	
	activate(context) {
		this.data = context.data;
		console.log(this.data);
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		this.data.pricePerDealUnit=this.data.pricePerDealUnit.toLocaleString('en-EN', { maximumFractionDigits: 4,minimumFractionDigits:4});
		this.data.quantity=this.data.quantity.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
		this.data.priceTotal=this.data.priceTotal.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
		//this.data.doDetailId = 
	}

	get total() {
		return this.data.dOQuantity * this.data.pricePerDealUnit;
	}

	get status() {
		var receiptQuantityTotal = 0;
		var deliveryOrderItems = this.data.deliveryOrder.items || [];
		for(var deliveryOrderItem of deliveryOrderItems){			
			for(var deliveryOrderDetail of deliveryOrderItem.fulfillments){
				if(deliveryOrderDetail.Id){
					receiptQuantityTotal =+ deliveryOrderDetail.receiptQuantity;
				}
			}
		}
		return receiptQuantityTotal > 0 ? "Sudah" : "Belum";
	}
	
	get product() {
		return `${this.data.product.Code} - ${this.data.product.Name}`;
	}
}
