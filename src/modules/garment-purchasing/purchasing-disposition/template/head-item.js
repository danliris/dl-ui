import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const EPOLoader = require('../../../../loader/garment-purchase-order-external-simply-str-loader');

var moment = require('moment');

@inject(Service)
export class HeadItem {
    @bindable selectedEPO;
    @bindable filter = {};;
  
    @bindable isOver;
    //itemsColumns = ["PRNo", "Category", "Product", "DealQuantity", "DealUom", "PaidQuantity", "PricePerDealUnit", "PriceTotal", "PaidPrice"];
    // itemsColumns = {
    //     columns: ["No Ro", "PO Internal", "Barang", "Unit", "QTY Dipesan", "Satuan", "QTY Sisa", "Harga Satuan", "Harga Total", "QTY Dibayar", "Harga Dibayar", "% Over QTY"],
    //     onRemove: function () {
    //         this.bind();
    //     }
    // };

    itemsColumns = [{ header: "Nomor External PO" },
    { header: "Kena PPN" },
    { header: "Nominal PPN" },
    { header: "Kena PPH" },
    { header: "PPH" },
    { header: "Nominal PPH" },
    { header: "Disposisi yang sudah dibuat" },
    // { header: "Disposisi yang sudah dibayar"},
    { header: "" }];

    constructor(service) {
        this.service = service;
  
    }



    async activate(context) {
        this.context = context;
        //console.log(context);
        this.items = context.context.items;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.filter = this.data;
        this.readOnly = context.options.readOnly;
        //console.log(this.filter.SupplierId);
        // this.filter = this.options.supplierId && this.options.currencyId && this.options.categoryId && this.options.divisionId ?
        //     {
        //         "supplierId": this.options.supplierId,
        //         "currencyId": this.options.currencyId,
        //         "divisionId": this.options.divisionId,
        //         "categoryId": this.options.categoryId,
        //         "currencyCode": this.options.currencyCode,
        //         "incomeTaxBy": this.options.incomeTaxBy != null ? this.options.incomeTaxBy : ""
        //     } : {};
        if (this.data.Id == 0) {
            this.isOver = false
        } else {
            this.isOver = true;
        }
;
        
    }
   
    toggle() {
        this.isShowing = !this.isShowing;
    }

    // get filter() {

    //     console.log(this.options.supplierId);
    //     var  filter = {
    //             supplierId: this.options.supplierId,
    //             currencyId: this.options.currencyId,
    //             divisionId: this.options.divisionId,
    //             categoryId: this.options.categoryId,
    //             currencyCode: this.options.currencyCode,
    //             incomeTaxBy: this.options.incomeTaxBy != null ? this.options.incomeTaxBy : ""
    //         }
        
    //     return filter;
    // }
 

    get addItems() {
        
        return (event) => {
            this.data.Items.push(
                {
                   invoice: this.data.invoice
                })
        };
    }

    get filter() {
        var filter = {
                

                supplierId: this.filter.SupplierId,
                    currencyId: this.filter.CurrencyId,
                    categoryId: this.filter.CategoryId,
                    currencyCode: this.filter.CurrencyCode,
            }
        
        return filter;
    }

    
    detailChanged(e) {
        //console.log("detttailchanged");
        this.GetTax();
    }

    get removeDetails() {
        return (event) => //console.log(event.detail);
        {
            var details = [];
            for (var a of this.data.Details) {
                details.push(a);
            }
            this.data.Details = details;
            this.GetTax();
            //this.detailChanged(event);
        }
    }
}
