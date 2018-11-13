import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/purchase-order-external-disposition-loader');

var moment = require('moment');

@inject(Service)
export class PurchasingDispositionItem {
    @bindable selectedEPO;

    //itemsColumns = ["PRNo", "Category", "Product", "DealQuantity", "DealUom", "PaidQuantity", "PricePerDealUnit", "PriceTotal", "PaidPrice"];
    itemsColumns = {
        columns: ["PRNo", "Kategori", "Barang", "Jumlah Dipesan", "Satuan", "Jumlah Dibayar", "Harga Satuan", "Harga Total", "Harga Dibayar"],
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
        this.options = context.options;
        this.readOnly = context.options.readOnly;
        this.filter = this.options.supplierCode && this.options.currencyCode ? { "SupplierCode": this.options.supplierCode, "CurrencyCode":this.options.currencyCode } : {};
        
        if(this.data.EPONo){
            this.selectedEPO=this.data;
        }

        if(this.data.Details){
            this.isShowing=true;
        }
    }

    
    async selectedEPOChanged(newValue) {
        if (newValue) {
            this.selectedEPO=newValue;
            if(newValue._id || newValue.EPOId){
                this.data.EPOId=newValue._id || this.data.EPOId;
                this.data.EPONo= newValue._id ? newValue.no : this.data.EPONo;
                this.data.IsUseVat= newValue._id ?newValue.useVat : this.data.IsUseVat;
                this.data.IsUseIncomeTax=newValue._id ? newValue.useIncomeTax : this.data.IsUseIncomeTax;
                if(this.data.IsUseIncomeTax){
                    this.data.IncomeTax=newValue.incomeTax;
                    this.data.IncomeTax.Name=newValue.incomeTax.name;
                    this.data.IncomeTax.Id=newValue.incomeTax._id;
                    this.data.IncomeTax.Rate=newValue.incomeTax.rate;
                    this.incomeTax=`${this.data.IncomeTax.Name}-${this.data.IncomeTax.Rate}`;
                }
                else{
                    this.data.IncomeTax={};
                    this.data.IncomeTax.Name="";
                    this.data.IncomeTax.Id=0;
                    this.data.IncomeTax.Rate=0;
                    this.incomeTax="-";
                }
                this.data.Unit=newValue.unit;
                this.data.Unit.Id=newValue.unit._id;
                this.data.Unit.Name=newValue.unit.name;
                this.data.Unit.Division=newValue.unit.division;
                var details=[];
                for(var item of newValue.items){
                    var dataPO=await this.service.getPoId(item.poId);
                    for(var detail of item.details){
                        var detailId=detail._id || detail.EPODetailId;
                        var qty=detail.dealQuantity-detail.dispositionQuantity;
                        details.push({
                            PRNo: item.prNo,
                            PRId: item.prId,
                            Product:detail.product,
                            DealQuantity:qty,
                            DealUom:detail.dealUom,
                            Category: dataPO.category,
                            PricePerDealUnit: detail.pricePerDealUnit,
                            EPODetailId:  detailId,
                            PaidPrice: detail.pricePerDealUnit*qty
                        })
                    }
                }
                this.data.Details=details;
            }
            console.log(dataPO,newValue,this.data);
            this.isShowing =true;
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
        var no= epo.no || this.data.EPONo;
        return `${no}`;
    }
}