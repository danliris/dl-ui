import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
var InvoiceNoteLoader = require('../../../../loader/garment-invoice-note-loader')

@containerless()
@inject(Service, BindingEngine)
export class InternNoteItem {
	@bindable invoice;
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
		//console.log(this.context.context.items);
		this.options = context.context.options;
		if (this.data.garmentInvoice && this.data.garmentInvoice.invoiceNo) {
			this.invoice =  this.data.garmentInvoice ;
		}

		this.filter={};
		if (this.options.supplierCode && this.options.currencyCode) {
			
			this.filter= { "HasInternNote": false, "SupplierCode": this.options.supplierCode, "IsDeleted": false, "CurrencyCode": this.options.currencyCode};

		}
		// else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat== false)
		// { 

		// 	this.filter= {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useIncomeTax":this.options.useIncomeTax }
		// }
		// else if(this.options.supplierCode && this.options.useVat && this.options.useIncomeTax ==false)
		// {

		// 	this.filter= {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId }
		// }
		// else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat)
		// {

		// 	this.filter= {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId,"useIncomeTax":this.options.useIncomeTax  }

		// }

		// for(var invoicesNo of this.context.context.items){
		// 	if(invoicesNo.data.garmentInvoice)
		// 	this.filter[`invoiceNo == "${Do.data.deliveryOrder.invoiceNo}"`]=false;
		// }
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

	// get filter() {
	// 	if (this.options.supplierCode && this.options.currencyCode) {
	// 		var HasInternNote = false;
	// 		return { "HasInternNote": false, "SupplierCode": this.options.supplierCode, "IsDeleted": false, "CurrencyCode": this.options.currencyCode }
	// 	}
	// }
	
	@computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

	invoiceChanged(newValue, oldValue) {
		if(newValue == null){
			this.data.items = {};
			this.error = {};
		}
		else if (newValue) {
			this.getGarmentInvoiceById(newValue.Id);
		} else {
			this.data = {};
		}
	}

	getTotal(invoice) {
		return invoice.items
			.map(invoiceItem => {
				var totalItem = invoiceItem.details
					.map(item => item.doQuantity * item.pricePerDealUnit)
					.reduce(function (prev, curr, index, arr) {
						return prev + curr;
					}, 0);
				return totalItem;
			})
			.reduce(function (prev, curr, index, arr) {
				return prev + curr;
			}, 0);
	}

	getGarmentInvoiceById(id){
		this.service.getGarmentInvoiceById(id)
			.then(garmentInvoice => {
				this.data.garmentInvoice = garmentInvoice;
				this.data.garmentInvoice.totalAmount = this.getTotal(garmentInvoice);
				this.details = [];
				for(var garmentInvoiceItem of garmentInvoice.items){
					for(var detail of garmentInvoiceItem.details){
						var prices = detail.doQuantity * detail.pricePerDealUnit;
						var dueDays = new Date(garmentInvoiceItem.deliveryOrder.doDate);
						dueDays.setDate(dueDays.getDate() + detail.paymentDueDays); 
						var item = {
							ePOId : detail.ePOId,
							ePONo : detail.ePONo,
							poSerialNumber : detail.pOSerialNumber,
							roNo : detail.roNo,
							pricePerDealUnit : detail.pricePerDealUnit,
							paymentDueDays : detail.paymentDueDays,
							paymentDueDate : dueDays,
							deliveryOrder : {
								Id : garmentInvoiceItem.deliveryOrder.Id,
								doNo: garmentInvoiceItem.deliveryOrder.doNo,
								doDate: garmentInvoiceItem.deliveryOrder.doDate,
								paymentMethod : garmentInvoiceItem.deliveryOrder.paymentMethod,
								paymentType : garmentInvoiceItem.deliveryOrder.paymentType,
								items: garmentInvoiceItem.deliveryOrder.items
							},
							quantity : detail.doQuantity,
							priceTotal : prices,
							product : detail.product,
							uomUnit : detail.uoms,
						};
						this.details.push(item);
					}
				}
				this.data.details = this.details;
			});
	}

	garmentInvoiceView = (gInvoices) => {
		return`${gInvoices.invoiceNo}`
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