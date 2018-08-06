import { inject, bindable, computedFrom } from 'aurelia-framework'
import {Service} from './service';
var SupplierLoader = require('../../../loader/supplier-loader');
var UnitPaymentOrderLoader = require('../../../loader/unit-payment-order-loader')
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable unitPaymentOrder;
    @bindable quantity;

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element; 
        this.service = service;

        this.controlOptions = {
            label: {
                    length: 4,
                    align: "right"
                },
                control: {
                    length: 5
                }
        }
        
        this.UpoItem = {
            itemsColumns: [
                { header: "No. PO Eksternal", value: "ePONo" },
                { header: "No. PR", value: "pRNo" },
                { header: "Barang", value: "product" },
                { header: "Jumlah", value: "quantity" },
                { header: "Satuan", value: "uom" },
                { header: "Harga Satuan", value: "pricePerDealUnitAfter" },
                { header: "Harga Total", value: "priceTotalAfter" }
            ],
            onRemove: function() {
                this.bind();
            }
        }
    }
    
    // @computedFrom("data._id")
    // get isEdit() {
    //     return (this.data._id || '').toString() != '';
    // }

    bind(context) {
        this.context = context;
        console.log(this.context);
        this.data = this.context.data;
        this.error = this.context.error;
        this.flgSpb = false;
        this.flag = true;
        
        // console.log(this.data);
        if (!this.data.uPCNo){
            // console.log(this.data.uPCNo);
            this.useVatCheck = false;
            this.useIncomeTaxCheck = false;
            this.useVatString = false;
            this.useIncomeTaxString = false;
        }
        else{
            this.unitPaymentOrder = this.data.uPCNo;
            this.useVatCheck = this.data.useVat;
            this.useIncomeTaxCheck = this.data.useIncomeTax;
            var supplierCode=this.data.supplier.code;
            var supplierName=this.data.supplier.name;
            this.data.supplier.toString = function () {
                return [supplierCode, supplierName]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            for (var unitPaymentOrder of this.data.items) {
                var productCode=unitPaymentOrder.product.code;
                var productName=unitPaymentOrder.product.name;
                unitPaymentOrder.product.toString = function () {
                    return [productCode, productName]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
            }
        
            if(this.data.useVat==false)
                this.useVatString = true;
            if(this.data.useIncomeTax==false)
                this.useIncomeTaxString = true;

            // this.useIncomeTaxString = this.data.useIncomeTax;
        }
    }

    
    

    get supplierLoader() {
        return SupplierLoader;
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }

    unitPaymentOrderChanged(newValue) {
        console.log(newValue);
        this.flgSpb=true;
        // this.data = newValue;
        var selectedPaymentOrder=newValue;
        if (this.data && !this.readOnly) {
            if (selectedPaymentOrder) {
            // this.data.useVat = selectedPaymentOrder.useVat;
            // this.data.useIncomeTax = selectedPaymentOrder.useIncomeTax;
            if (newValue.useVat != true){
                this.useVatString = true;
            }
            if (newValue.useIncomeTax != true){
                this.useIncomeTaxString = true;
            }
            // console.log(this.readOnly);
            // if (!this.readOnly)
            //     this.data.items = [];
            this.data.uPOId = newValue._id;
            this.data.uPONo = newValue.no;
            this.data.division = newValue.division;
            this.data.category = newValue.category;
            this.data.currency = newValue.currency;
            
            this.useVatCheck = newValue.useVat;
            this.useIncomeTaxCheck = newValue.useIncomeTax;
            this.data.useVat = newValue.useVat ;
            this.data.useIncomeTax = newValue.useIncomeTax;
            this.data.supplier = newValue.supplier;
            this.data.supplier.toString = function () {
                return [newValue.supplier.code, newValue.supplier.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
            this.data.dueDate = newValue.dueDate;
            this.data.correctionType = "Jumlah";
            
            var _items = [];

            if (selectedPaymentOrder.items) {
                for (var unitPaymentOrder of selectedPaymentOrder.items) {

                    // for (var unitReceiptNoteItem of unitPaymentOrder.unitReceiptNote.items) {
                    unitPaymentOrder.unitReceiptNote.items.map((unitReceiptNoteItem) => {
                        var unitQuantityCorrectionNoteItem = {};
                        unitQuantityCorrectionNoteItem.ePONo = unitReceiptNoteItem.EPONo;
                        unitQuantityCorrectionNoteItem.pRNo = unitReceiptNoteItem.PRNo;
                        unitQuantityCorrectionNoteItem.pRId = unitReceiptNoteItem.PRId;
                        unitQuantityCorrectionNoteItem.uPODetailId = unitReceiptNoteItem.Id; 
                        unitQuantityCorrectionNoteItem.pRDetailId = unitReceiptNoteItem.PRItemId;
                        unitQuantityCorrectionNoteItem.product = unitReceiptNoteItem.product;
                        unitQuantityCorrectionNoteItem.productId = unitReceiptNoteItem.product._id;
                        // unitQuantityCorrectionNoteItem.productView = unitReceiptNoteItem.product;
                        unitQuantityCorrectionNoteItem.product.toString = function () {
                            return [unitReceiptNoteItem.product.code, unitReceiptNoteItem.product.name]
                                .filter((item, index) => {
                                    return item && item.toString().trim().length > 0;
                                }).join(" - ");
                        }

                        unitQuantityCorrectionNoteItem.uom = unitReceiptNoteItem.deliveredUom;
                        unitQuantityCorrectionNoteItem.uomId = unitReceiptNoteItem.deliveredUom._id;
                        unitQuantityCorrectionNoteItem.pricePerDealUnitBefore = unitReceiptNoteItem.pricePerDealUnit;
                        // unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.pricePerDealUnit;
                        unitQuantityCorrectionNoteItem.currency = newValue.currency;
                        unitQuantityCorrectionNoteItem.currencyRate = newValue.currency.rate;
                        unitQuantityCorrectionNoteItem.uRNNo = unitPaymentOrder.unitReceiptNote.no;
                        unitQuantityCorrectionNoteItem.priceTotalBefore = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                        if (unitReceiptNoteItem.correction) {
                            if (unitReceiptNoteItem.correction.length > 0) {
                                var _qty = unitReceiptNoteItem.correction
                                    .map((correction) => {
                                        if (correction.correctionRemark === "Koreksi Jumlah") {
                                            return correction.correctionQuantity;
                                        }
                                        else {
                                            return 0;
                                        }
                                    })
                                    .reduce((prev, curr, index) => {
                                        return prev + curr;
                                    }, 0);

                                // unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity - _qty;
                                unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.quantityCorrection - _qty;
                                unitQuantityCorrectionNoteItem.quantityCheck = unitReceiptNoteItem.deliveredQuantity - _qty;
                                unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                                unitQuantityCorrectionNoteItem.priceTotalAfter = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPriceTotal;

                            } else {
                                // unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                                unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.quantityCorrection;
                                unitQuantityCorrectionNoteItem.quantityCheck = unitReceiptNoteItem.deliveredQuantity;
                                unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.pricePerDealUnitCorrection;
                                unitQuantityCorrectionNoteItem.priceTotalAfter = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                            }
                        } else {
                            // unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                            unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.quantityCorrection;
                            unitQuantityCorrectionNoteItem.quantityCheck = unitReceiptNoteItem.deliveredQuantity;
                            unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.pricePerDealUnitCorrection;
                            unitQuantityCorrectionNoteItem.priceTotalAfter = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                        }
                        _items.push(unitQuantityCorrectionNoteItem);
                    })
                }
                console.log(_items);
                this.data.items = _items;
            }
            else {
                _items = [];
                // this.data.items = [];
            }
        }
        else {
            // this.data.items = [];
            _items = [];
        }
        
        console.log(this.data.items);
        // this.resetErrorItems();
    }}

    // resetErrorItems() {
    //     if (this.error) {
    //         if (this.error.items) {
    //             this.error.items = [];
    //         }
    //     }
    // }
    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }
} 