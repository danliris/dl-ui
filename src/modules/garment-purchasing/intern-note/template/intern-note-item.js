export class DeliveryOrderItem {
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
	}

	get totalAmount() {
		var total = data.items
			.map(invoiceItem => {
				var totalItem = invoiceItem.items
					.map(item => item.deliveredQuantity)
					.reduce(function (prev, curr, index, arr) {
						return prev + curr;
					}, 0);
				return totalItem;
			})
			.reduce(function (prev, curr, index, arr) {
				return prev + curr;
			}, 0);
	}
}