import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
var InvoiceNoteLoader = require('../../../../loader/garment-invoice-note-loader')

@containerless()
@inject(Service, BindingEngine)
export class InternNoteItem {
	@bindable invoice = {};
	@bindable items;

	itemsColumns = [
		{ header: "Nomor Surat Jalan" },
		{ header: "Nomor PO Eksternal" },
		{ header: "Nomor Ref PR" },
		{ header: "Nomor RO" },
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

	items = [];

	async activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		this.isShowing = false;
		this.options = context.context.options;

		if (this.data.invoiceNo) {
			this.invoice = this.data ? this.data : {};
			this.getTotal(this.data);
			this.getDeliveryOrder(this.data);
		}

	}

	toggle() {
		if (!this.isShowing)
			this.isShowing = true;
		else
			this.isShowing = !this.isShowing;
	}

	get invoiceNoteLoader() {
		return InvoiceNoteLoader;
	}

	get filter() {
		if (this.options.supplierCode && this.options.currencyCode) {
			return { "hasInternNote": false, "supplier.code": this.options.supplierCode, "_deleted": false, "currency.Code": this.options.currencyCode }
		}
	}

	invoiceChanged(newValue, oldValue) {
		if (newValue) {
			this.getGarmentInvoiceById(newValue.Id);
		} else {
			this.data = {};
		}
	}

	getTotal(invoice) {
		this.totalAmount = invoice.items
			.map(invoiceItem => {
				var totalItem = invoiceItem.items
					.map(item => item.dOQuantity * item.pricePerDealUnit)
					.reduce(function (prev, curr, index, arr) {
						return prev + curr;
					}, 0);
					
				return totalItem;
			})
			.reduce(function (prev, curr, index, arr) {
				return prev + curr;
			}, 0);
	}

	getGarmentInvoice(invoice) {
		return new Promise((resolve, reject) => {
			var getDeliveryOrder = invoice.items.map((invoiceItem) => {
				var listId = invoiceItem.items
					.map(item => {
						return this.service.getGarmentInvoiceById(invoiceItem.deliveryOrder.Id)
					})
				return listId;
			})

			getDeliveryOrder = [].concat.apply([], getDeliveryOrder);
			var listInvItem = [];
			var items = [];
			Promise.all(getDeliveryOrder)
				.then((deliveryOrders) => {
					for (var invoiceItem of invoice.items) {
						for (var item of invoiceItem.items) {
							var _do = deliveryOrders.find((deliveryOrder) => deliveryOrder.dONo === invoiceItem.doNo);
							var _doItem = _do.items.find((_item) => _item.ePONo === item.ePONo);
							var _doFulfillment = _doItem.fulfillments.find((_fulfillment) => _fulfillment.product.Id === item.product.Id && _fulfillment.purchaseOrderNo === item.purchaseOrderNo)
							item.hasUnitReceiptNote = _doFulfillment ? (_doFulfillment.realizationQuantity.length > 0 ? true : false) : false
						}
					}
					items = invoice.items.map((invoiceItem) => {
						listInvItem = invoiceItem.items
							.map(item => {
								var _do = deliveryOrders.find((deliveryOrder) => deliveryOrder.doNo === invoiceItem.doNo);
								var _doItem = _do.items.find((_item) => _item.ePONo === item.ePONo);
								var _doFulfillment = _doItem.fulfillments.find((_fulfillment) => _fulfillment.product._id === item.product._id && _fulfillment.purchaseOrderNo === item.purchaseOrderNo)

								var isCreateURN = _doFulfillment ? (_doFulfillment.realizationQuantity.length > 0 ? true : false) : false
								var dueDays = new Date(invoiceItem.dODate);
								dueDays.setDate(dueDays.getDate() + item.paymentDueDays);
								return {
									doNo: invoiceItem.dodNo,
									ePONo: item.ePONo,
									pOSerialNumber: item.pOSerialNumber,
									roNo: item.roNo,
									termOfPayment: item.termOfPayment,
									paymentType: item.paymentType,
									paymentDueDays: dueDays,
									product: item.product,
									quantity: item.quantity,
									uomunit: item.uomunit,
									pricePerDealUnit: item.pricePerDealUnit,
									hasUnitReceiptNote: isCreateURN
								}
							})
						return listInvItem;
					})
					items = [].concat.apply([], items);
					this.items = items
					resolve(items);
				})
				.catch(e => {
					this.items = [];
				})

		});
	}

	getGarmentInvoiceById(id){
		this.service.getGarmentInvoiceById(id)
			.then(garmentInvoice => {
				// console.log(garmentInvoice);
				this.data = garmentInvoice;
				this.getTotal(garmentInvoice);


				this.items = [];
				for(var garmentInvoiceItem of garmentInvoice.items){
					for(var detail of garmentInvoiceItem.items){
						var item = {
							ePONo : detail.ePONo,
							poSerialNumber : garmentInvoiceItem.poSerialNumber,
							roNo : detail.roNo,
							termOfPayment : detail.paymentMethod,
							paymentType : detail.paymentType,
							pricePerDealUnit : detail.pricePerDealUnit,
							// paymentDueDays : 30,
							// paymentDueDate : garmentInvoiceItem.deliveryOrder.doDate + paymentDueDays,
							deliveryOrder: {
								doNo: garmentInvoiceItem.deliveryOrder.doNo
							},
							product: detail.product,
							uomunit: detail.uoms,
						};
						this.items.push(item);
					}
				}
			});
	}
}