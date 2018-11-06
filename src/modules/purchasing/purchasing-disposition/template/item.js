import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/purchase-order-external-disposition-loader');

var moment = require('moment');

@inject(Service)
export class PurchasingDispositionItem {
    @bindable selectedEPO;

    columns = ["Product", "DefaultQuantity", "DefaultUom", "DealQuantity", "DealUom", "Convertion", "Grade", "ProductRemark"];

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.filter = this.options.supplierCode ? { "SupplierCode": this.options.supplierCode } : {};
        console.log(context)
    }

    
    selectedEPOChanged(newValue) {
        if (newValue) {
            this.selectedEPO=newValue;
            if(newValue._id){
                this.data.IsUseVat=newValue.useVat;
                this.data.IsUseIncomeTax=newValue.useIncomeTax;
                this.data.IncomeTax=newValue.incomeTax;
                this.data.IncomeTax.Name=newValue.incomeTax.name;
                this.data.IncomeTax.Id=newValue.incomeTax._id;
                this.data.IncomeTax.Rate=newValue.incomeTax.rate;
            }
            console.log(newValue);
        }
    }

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
        return `${epo.no}`
    }
}