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
		this.isShowing = true;
		this.options = context.context.options;

		if (this.data.invoiceNo) {
			this.invoice = this.data ? this.data : {};
			//console.log(this.invoice.items);
			this.getTotal(this.data);
			this.getDeliveryOrder(this.data);
			this.isShowing = false;
			if (this.invoice.items) {
				console.log(this.data.items);
				this.isShowing = true;
				for(var invoice of this.data.supplier){
				  invoice.supplier=this.data.supplier;
				}
			}
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
			return { "HasInternNote": false, "SupplierCode": this.options.supplierCode, "IsDeleted": false, "CurrencyCode": this.options.currencyCode }
		}
	}

	invoiceChanged(newValue, oldValue) {
		if(newValue == null){
			this.data.items = {};
			this.error = {};
			this.isShowing = false;
		}
		else if (newValue) {
			this.getGarmentInvoiceById(newValue.Id);
			this.isShowing = true;
		} else {
			this.data = {};
		}
	}

	getTotal(invoice) {
		console.log(invoice);
		return invoice.items
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

	getStatus(items) {
		for(var deliveryOrderItems of items){
			for(var deliveryOrderDetail of deliveryOrderItems.fulfillments){
				var receiptQuantityTotal = deliveryOrderDetail ? (deliveryOrderDetail.receiptQuantity > 0 ? "Sudah" : "Belum") : "Belum";
				return receiptQuantityTotal;
			}
		}
	}

	getGarmentInvoiceById(id){
		this.service.getGarmentInvoiceById(id)
			.then(garmentInvoice => {
				this.data.garmentInvoice = garmentInvoice;
				this.data.garmentInvoice.totalAmount = this.getTotal(garmentInvoice);
				
				this.items = [];
				for(var garmentInvoiceItem of garmentInvoice.items){
					for(var detail of garmentInvoiceItem.items){
						var prices = detail.dOQuantity * detail.pricePerDealUnit;
						var dueDays = new Date(garmentInvoiceItem.deliveryOrder.doDate);
						dueDays.setDate(dueDays.getDate() + detail.paymentDueDays); 
						var item = {
							ePOId : detail.ePOId,
							ePONo : detail.ePONo,
							poSerialNumber : detail.poSerialNumber,
							roNo : detail.roNo,
							termOfPayment : garmentInvoiceItem.paymentMethod,
							paymentType : garmentInvoiceItem.paymentType,
							pricePerDealUnit : detail.pricePerDealUnit,
							paymentDueDate : dueDays,
							deliveryOrder : {
								Id : garmentInvoiceItem.deliveryOrder.Id,
								doNo: garmentInvoiceItem.deliveryOrder.doNo
							},
							quantity : detail.dOQuantity,
							priceTotal : prices,
							product : detail.product,
							uomunit : detail.uoms,
							status : this.getStatus(garmentInvoiceItem.deliveryOrder.items)
						};
						this.items.push(item);
					}
				}
				this.data.details = this.items;
			});
	}

	garmentInvoiceView = (invoices) => {
		console.log(invoices);
		return`${invoices.invoiceNo}`
	}

	removeItems = function () {
	this.bind();
	}

	controlOptions = {
		control: {
		  length: 12
		}
	};
}