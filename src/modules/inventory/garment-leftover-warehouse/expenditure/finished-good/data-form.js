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

    itemsColumns = [
        { header: "Unit", value: "UnitCode" },
        { header: "RO", value: "RONo" },
        { header: "Jumlah Stock", value: "StockQuantity" },
        { header: "Jumlah Keluar", value: "ExpenditureQuantity" },
    ]

    viewItemsColumns = [
        { header: "Unit", value: "UnitCode" },
        { header: "RO", value: "RONo" },
        { header: "Jumlah Keluar", value: "ExpenditureQuantity" },
    ]

    expenditureToOptions=["JUAL LOKAL", "LAIN-LAIN"];

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
            checkedAll: this.context.isCreate == true ? false : true 
        }
        if(this.data.Id){
            this.existingItems = this.data.Items.map(i => {
                return {
                    StockId: i.StockId,
                    Quantity: i.ExpenditureQuantity
                };
            });
            this.Options.existingItems=this.existingItems;
        }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }

}
