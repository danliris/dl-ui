import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../../../loader/garment-leftover-warehouse-buyer-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedType;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumnsFabric = [
        { header: "Unit", value: "UnitCode" },
        { header: "Bon No", value: "AvalReceiptNo" },
        { header: "Jumlah ", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
    ];

    itemsColumnsAcc= [
        { header: "Unit" },
        { header: "Kode - Nama Barang" },
        { header: "Satuan" },
        { header: "Jumlah Stock" },
        { header: "Jumlah Keluar" },
    ];

    viewItemsColumnsAcc=[
        { header: "Unit" },
        { header: "Kode - Nama Barang" },
        { header: "Satuan" },
        { header: "Jumlah Keluar" },
    ]

    expenditureToOptions=["JUAL LOKAL", "LAIN-LAIN"];
    avalTypes=["AVAL FABRIC", "AVAL ACCESSORIES"];

    get buyerLoader() {
        return BuyerLoader;
    }

    
    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        for(var item of this.data.Items){
            item.type=this.data.AvalType;
        }
        this.selectedType=this.data.AvalType;
        if(this.data.Id){
            this.existingItems = this.data.Items.map(i => {
                return {
                    StockId: i.StockId,
                    Quantity: i.Quantity
                };
            });
            this.Options.existingItems=this.existingItems;
        }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({
                type: this.data.AvalType
            })
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }

    selectedTypeChanged(newValue){
        if(newValue){
            this.data.AvalType=newValue;

        }
        if(!this.data.Id){
            this.data.Items.splice(0);
        }
    }
}
