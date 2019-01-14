import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/purchase-order-external-disposition-azure-loader');

var moment = require('moment');

@inject(Service)
export class PurchasingDispositionItem {
    @bindable selectedEPO;
    @bindable vatValue;
    @bindable incomeTaxValue;

    //itemsColumns = ["PRNo", "Category", "Product", "DealQuantity", "DealUom", "PaidQuantity", "PricePerDealUnit", "PriceTotal", "PaidPrice"];
    itemsColumns = {
        columns: ["PRNo", "Unit", "Kategori", "Barang", "Jumlah Dipesan", "Satuan","Harga Total", "Jumlah Dibayar", "Harga Satuan",  "Harga Dibayar"],
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
        this.filter = this.options.supplierId && this.options.currencyId && this.options.categoryId && this.options.divisionId ? { "supplierId": this.options.supplierId, "currencyId":this.options.currencyId, "divisionId": this.options.divisionId, "categoryId": this.options.categoryId} : {};
        
        if(this.data.EPONo){
            this.selectedEPO=this.data;
        }

        if(this.data.Details){
            this.isShowing=true;
        }
        if(this.data.UseIncomeTax){
            this.incomeTax=`${this.data.IncomeTax.name} - ${this.data.IncomeTax.rate}`;
        }
        this.GetTax();
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
    
    async selectedEPOChanged(newValue) {
        if (newValue) {
            this.selectedEPO=newValue;
            console.log(newValue)
            if(newValue._id || newValue.EPOId){
                this.data.EPOId=newValue._id || this.data.EPOId;
                this.data.EPONo= newValue._id ? newValue.no : this.data.EPONo;
                this.data.UseVat= newValue._id ?newValue.useVat : this.data.UseVat;
                this.data.UseIncomeTax=newValue._id ? newValue.useIncomeTax : this.data.UseIncomeTax;
                if(this.data.UseIncomeTax){
                    this.data.IncomeTax=newValue.useIncomeTax ? newValue.incomeTax : this.data.IncomeTax;
                    this.data.IncomeTax.Name=newValue.incomeTax.name;
                    this.data.IncomeTax.Id=newValue.incomeTax._id;
                    this.data.IncomeTax.Rate=newValue.incomeTax.rate;
                    this.incomeTax=`${this.data.IncomeTax.name} - ${this.data.IncomeTax.rate}`;
                    
                }
                else{
                    this.data.IncomeTax={};
                    this.data.IncomeTax.name="";
                    this.data.IncomeTax._id="";
                    this.data.IncomeTax.rate=0;
                    this.incomeTax="-";
                }
                var arg = {
                    epoId:this.data.EPOId
                }
                //var dataDisposition=await this.service.getDispositions(arg);
                var details=[];
                for(var item of newValue.items){
                    for(var detail of item.details){
                        var qty=detail.dealQuantity-detail.dispositionQuantity;

                        //===========MONGO==============
                        // if(dataDisposition.info.count>0){
                        //     for(var DispoData of dataDisposition.data){
                        //         for(var dispoItem of DispoData.Items){
                        //             for(var dispoDetail of dispoItem.Details){
                        //                 if(dispoDetail.PRId==item.purchaseRequest._id && dispoDetail.Product._id==detail.product._id){
                        //                     qty-=dispoDetail.PaidQuantity;
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }

                        //============================================================
                        //var qty=detail.dealQuantity-detail.dispositionQuantity;
                        // this.data.Unit=newValue.unit;
                        // this.data.Unit.Id=newValue.unit._id;
                        // this.data.Unit.Name=newValue.unit.name;
                        // this.data.Unit.Division=newValue.unit.division;
                        // this.data.Unit.Division.Name=newValue.unit.division.name;


                        details.push({
                            PRNo: item.prNo,
                            UnitId:item.unit._id,
                            Unit:newValue.unit,
                            PRId: item.prId,
                            Product:detail.product,
                            DealQuantity:detail.dealQuantity,
                            DealUom:detail.dealUom,
                            Category: item.category,
                            CategoryId:item.categoryId,
                            PricePerDealUnit: detail.pricePerDealUnit,
                            PaidQuantity: qty,
                            PaidPrice: detail.pricePerDealUnit*qty
                        })
                        var ppn=0;
                        var pph=0;
                        if(this.data.UseIncomeTax){
                            pph= detail.pricePerDealUnit*qty*(this.data.IncomeTax.rate/100);
                        }
                        if(this.data.UseVat){
                            ppn= detail.pricePerDealUnit*qty*0.1;
                        }
                        this.incomeTaxValue+=pph;
                        this.vatValue+=ppn;
                    }
                    // if(this.data.UseIncomeTax){
                    //     this.incomeTaxValue+=
                    // }
                    
                }
                this.data.Details=details;
            }
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

    GetTax(){
        this.incomeTaxValue=0;
        this.vatValue=0;
        if(this.data.Details){
            for(var detail of this.data.Details){
                var ppn=0;
                var pph=0;
                if(this.data.UseIncomeTax){
                    pph= detail.PaidPrice*(this.data.IncomeTax.rate/100);
                }
                if(this.data.UseVat){
                    ppn= detail.PaidPrice*0.1;
                }
                this.incomeTaxValue+=pph;
                this.vatValue+=ppn;
            }

        }
    }

    detailChanged(e){
        this.GetTax();
    }
}