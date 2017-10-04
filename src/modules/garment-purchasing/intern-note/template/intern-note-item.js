import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";

@containerless()
@inject(Service, BindingEngine)
export class InternNoteItem {
	itemsColumns = [
		{ header: "Nomor Surat Jalan" },
		{ header: "Nomor PO Eksternal" },
		{ header: "Term Pembayaran" },
		{ header: "Tipe Pembayaran" },
		{ header: "Tanggal Jatuh Tempo" },
		{ header: "Barang" },
		{ header: "Jumlah" },
		{ header: "Satuan" },
		{ header: "Harga Satuan" },
		{ header: "Harga Total" },
		{ header: "Diterima Unit" }
	]
	constructor(service, bindingEngine) {
		this.service = service;
		this.bindingEngine = bindingEngine;
	}

	async activate(context) {
		this.data = context.data;
		this.items = [];
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		this.isShowing = false;

		var getDeliveryOrder = this.data.items.map((invoiceItem) => {
			var listId = invoiceItem.items
				.map(item => {
					return this.service.getDeliveryOrderById(invoiceItem.deliveryOrderId)
				})
			return listId;
		})
		getDeliveryOrder = [].concat.apply([], getDeliveryOrder);

		Promise.all(getDeliveryOrder)
			.then((deliveryOrders) => {
				for (var invoiceItem of this.data.items) {
					for (var item of invoiceItem.items) {
						var _do = deliveryOrders.find((deliveryOrder) => deliveryOrder.no === invoiceItem.deliveryOrderNo);
						var _doItem = _do.items.find((_item) => _item.purchaseOrderExternalNo === item.purchaseOrderExternalNo);
						var _doFulfillment = _doItem.fulfillments.find((_fulfillment) => _fulfillment.product._id === item.product._id && _fulfillment.purchaseOrderNo === item.purchaseOrderNo)
						item.hasUnitReceiptNote = _doFulfillment ? (_doFulfillment.realizationQuantity.length > 0 ? true : false) : false

					}
				}

				this.items = this.data.items.map((invoiceItem) => {
					var listInvItem = invoiceItem.items
						.map(item => {
							var _do = deliveryOrders.find((deliveryOrder) => deliveryOrder.no === invoiceItem.deliveryOrderNo);
							var _doItem = _do.items.find((_item) => _item.purchaseOrderExternalNo === item.purchaseOrderExternalNo);
							var _doFulfillment = _doItem.fulfillments.find((_fulfillment) => _fulfillment.product._id === item.product._id && _fulfillment.purchaseOrderNo === item.purchaseOrderNo)

							var isCreateURN = _doFulfillment ? (_doFulfillment.realizationQuantity.length > 0 ? true : false) : false
							var dueDays = new Date(invoiceItem.deliveryOrderSupplierDoDate);
							dueDays.setDate(dueDays.getDate() + item.paymentDueDays);
							return {
								deliveryOrderNo: invoiceItem.deliveryOrderNo,
								purchaseOrderExternalNo: item.purchaseOrderExternalNo,
								paymentMethod: item.paymentMethod,
								paymentType: item.paymentType,
								dueDays: dueDays,
								product: item.product,
								deliveredQuantity: item.deliveredQuantity,
								purchaseOrderUom: item.purchaseOrderUom,
								pricePerDealUnit: item.pricePerDealUnit,
								hasUnitReceiptNote: isCreateURN
							}
						})
					return listInvItem;
				})
				this.items = [].concat.apply([], this.items);
			})
			.catch(e => {
				this.items = [];
			})
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