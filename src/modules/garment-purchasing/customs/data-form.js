import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable hasView = false;
    @bindable data = {};
    @bindable title;
    @bindable amount;
    @bindable item;
    typeCustoms = ["","BC 262", "BC 23","BC 40", "BC 27"]

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    get dataAmount(){
        this.amount = this.amount || 0;
        return this.amount;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.hasView = this.context.hasView ? this.context.hasView : false;
        this.deliveryOrderColumns = this.hasView ? [
            { header: "No Surat Jalan", value: "no" },
            { header: "Tanggal Surat Jalan", value: "supplierDate" },
            { header: "Tanggal Datang Barang", value: "date" },
            { header: "Total Jumlah", value: "quantity" },
            { header: "Total Harga", value: "price" }
        ] : [
            { header: "", value: "selected" },
            { header: "No Surat Jalan", value: "no" },
            { header: "Tanggal Surat Jalan", value: "supplierDate" },
            { header: "Tanggal Datang Barang", value: "date" },
            { header: "Total Jumlah", value: "quantity" },
            { header: "Total Harga", value: "price" }
        ]
    }

    deliveryOrderColumns = [] 

    get supplierLoader(){
        return SupplierLoader;
    }

    get currencyLoader(){
        return CurrencyLoader;
    }

    get isSupplier(){
        return this.data && this.data.supplierId && this.data.supplierId !== '';
    }

    valueChange(e){
        console.log(e);
    }

    supplierChange(e) {
        if (this.data.supplier && this.data.supplier._id){
            this.data.supplierId = this.data.supplier._id;
        }
        else{
            delete this.data.supplierId;
        }
        this.data.deliveryOrders = [];
        delete this.data.currencyId;
        this.data.currency = {};

        //console.log(this.data.sourceId);
    }

    async currencyChange(e){
        this.data.deliveryOrders = [];
        console.log(this.data);
        if (this.data.currency && this.data.currency._id){
            this.data.currencyId = this.data.currency._id;
            if(!this.hasView){
                var result = await this.service.searchDeliveryOrder({ "supplier" : `${this.data.supplier.code}`, "currency" : `${this.data.currency.code}` });
                var dataDelivery = [];
                console.log(result.data);
                for(var a of result.data){
                    var data = a;
                    data["selected"] = false;
                    data["isView"] = !this.hasView ? true : false
                    var quantity = 0;
                    var totPrice = 0;
                    for(var b of a.items){
                        for(var c of b.fulfillments){
                            quantity += c.deliveredQuantity;
                            var priceTemp = c.deliveredQuantity * c.pricePerDealUnit;
                            totPrice += priceTemp;
                        }
                    }
                    data["quantity"] = quantity;
                    data["price"] = totPrice.toFixed(3);
                    dataDelivery.push(data);
                }
                this.data.deliveryOrders = dataDelivery;
                console.log(this.hasView);
            }
        }
        else{
            delete this.data.currencyId;
        }
    }
}