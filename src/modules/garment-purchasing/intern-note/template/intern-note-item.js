export class DeliveryOrderItem {
	itemsColumns = [
		{ header: "Nomor Surat Jalan" },
		{ header: "Nomor PO Eksternal" },
		{ header: "Term Pembayaran" },
		{ header: "Tanggal Jatuh Tempo" },
		{ header: "Barang" },
		{ header: "Jumlah" },
		{ header: "Satuan" },
		{ header: "Harga Satuan" },
		{ header: "Harga Total" }
	]

	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		this.isShowing = false;

		this.items = this.data.items.map((invoiceItem) => {
			var listInvItem = invoiceItem.items
				.map(item => {
					var dueDays = new Date(invoiceItem.deliveryOrderSupplierDoDate);
					dueDays.setDate(dueDays.getDate() + item.paymentDueDays);
					return {
						deliveryOrderNo: invoiceItem.deliveryOrderNo,
						purchaseOrderExternalNo: item.purchaseOrderExternalNo,
						paymentMethod: item.paymentMethod,
						dueDays: dueDays,
						product: item.product,
						deliveredQuantity: item.deliveredQuantity,
						purchaseOrderUom: item.purchaseOrderUom,
						pricePerDealUnit: item.pricePerDealUnit
					}
				})
			return listInvItem;
		})
		this.items = [].concat.apply([], this.items);
	}

	get totalAmount() {
		var total = this.data.items
			.map(invoiceItem => {
				var totalItem = invoiceItem.items
					.map(item => item.deliveredQuantity * item.pricePerDealUnit)
					.reduce(function (prev, curr, index, arr) {
						return prev + curr;
					}, 0);
				return totalItem;
			})
			.reduce(function (prev, curr, index, arr) {
				return prev + curr;
			}, 0);
		return total
	}

	toggle() {
		if (!this.isShowing)
			this.isShowing = true;
		else
			this.isShowing = !this.isShowing;
	}
}