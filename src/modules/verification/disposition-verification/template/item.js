import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/purchase-order-external-all-loader');

var moment = require('moment');

@inject(Service)
export class PurchasingDispositionItem {
    @bindable selectedEPO;

    //itemsColumns = ["PRNo", "Category", "Product", "DealQuantity", "DealUom", "PaidQuantity", "PricePerDealUnit", "PriceTotal", "PaidPrice"];
    itemsColumns = {
        columns: ["PRNo", "Unit", "Kategori", "Barang", "Jumlah Dipesan", "Satuan", "Jumlah Dibayar", "Harga Satuan", "Harga Total", "Harga Dibayar", "Harga yang Sudah Dibayar"],
        onRemove: function () {
            this.bind();
        }
    };
    
    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context=context;
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
       
        if(this.data.EPONo){
            this.selectedEPO=this.data;
        }

        if(this.data.Details){
            this.isShowing=true;
        }
        if(this.data.UseIncomeTax){
            this.incomeTax=`${this.data.IncomeTax.name} - ${this.data.IncomeTax.rate}`;
        }
    }
    // @computedFrom("data.EPONo")
    // get incomeTax() {
    //     if(this.data.UseIncomeTax){
    //         return `${this.data.IncomeTax.name}-${this.data.IncomeTax.rate}`;
    //     }
    //     else{
    //         return "-";
    //     }
    // }
    
    

    // @computedFrom("selectedEPO._id")
    // get incomeTax() {
    //     return `${this.data.IncomeTax.Name} - ${this.data.IncomeTax.Rate}`;
    // }
    toggle() {
        this.isShowing = !this.isShowing;
    }

    get epoLoader() {
        return EPOLoader;
    }

    epoView = (epo) => {
        var no= epo.no || this.data.EPONo;
        return `${no}`;
    }
}