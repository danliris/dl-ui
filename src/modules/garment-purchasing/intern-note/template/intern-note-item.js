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

		if (this.data.no) {
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
			return { "hasInternNote": false, "supplier.code": this.options.supplierCode, "_deleted": false, "currency.code": this.options.currencyCode }
		}
	}

	async invoiceChanged(newValue, oldValue) {
		if (this.invoice) {
			this.data._id = this.invoice._id;
			this.data._stamp = this.invoice._stamp;
			this.data._type = this.invoice._type;
			this.data._version = this.invoice._version;
			this.data._active = this.invoice._active;
			this.data._deleted = this.invoice._deleted;
			this.data._createdBy = this.invoice._createdBy;
			this.data._createdDate = this.invoice._createdDate;
			this.data._createdAgent = this.invoice._createdAgent;
			this.data._updatedBy = this.invoice._updatedBy;
			this.data._updatedDate = this.invoice._updatedDate;
			this.data._updatedAgent = this.invoice._updatedAgent;
			this.data.refNo = this.invoice.refNo;
			this.data.supplierId = this.invoice.supplierId;
			this.data.supplier = this.invoice.supplier;
			this.data.currency = this.invoice.currency;
			this.data.incomeTaxNo = this.invoice.incomeTaxNo;
			this.data.incomeTaxInvoiceNo = this.invoice.incomeTaxInvoiceNo;
			this.data.incomeTaxDate = this.invoice.incomeTaxDate;
			this.data.useIncomeTax = this.invoice.useIncomeTax;
			this.data.vatNo = this.invoice.vatNo;
			this.data.vatInvoiceNo = this.invoice.vatInvoiceNo;
			this.data.vatDate = this.invoice.vatDate;
			this.data.useVat = this.invoice.useVat;
			this.data.vat = this.invoice.vat;
			this.data.isPayTax = this.invoice.isPayTax;
			this.data.remark = this.invoice.remark;
			this.data.hasInternNote = this.invoice.hasInternNote;
			this.data.date = this.invoice.date;
			this.data.no = this.invoice.no;
			this.data.date = this.invoice.date;
			this.data.items = this.invoice.items;

			this.getTotal(this.invoice);
			await this.getDeliveryOrder(this.invoice)


		} else {
			this.data = {};
		}
	}

	getTotal(invoice) {
		this.totalAmount = invoice.items
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
	}

	getDeliveryOrder(invoice) {
		return new Promise((resolve, reject) => {
			var getDeliveryOrder = invoice.items.map((invoiceItem) => {
				var listId = invoiceItem.items
					.map(item => {
						return this.service.getDeliveryOrderById(invoiceItem.deliveryOrderId)
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
							var _do = deliveryOrders.find((deliveryOrder) => deliveryOrder.no === invoiceItem.deliveryOrderNo);
							var _doItem = _do.items.find((_item) => _item.purchaseOrderExternalNo === item.purchaseOrderExternalNo);
							var _doFulfillment = _doItem.fulfillments.find((_fulfillment) => _fulfillment.product._id === item.product._id && _fulfillment.purchaseOrderNo === item.purchaseOrderNo)
							item.hasUnitReceiptNote = _doFulfillment ? (_doFulfillment.realizationQuantity.length > 0 ? true : false) : false
						}
					}
					items = invoice.items.map((invoiceItem) => {
						listInvItem = invoiceItem.items
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
									purchaseRequestRefNo: item.purchaseRequestRefNo,
									roNo: item.roNo,
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
					items = [].concat.apply([], items);
					this.items = items
					resolve(items);
				})
				.catch(e => {
					this.items = [];
				})

		});
	}
}