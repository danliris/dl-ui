import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../loader/garment-buyers-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedPaymentType;

    paymentTypeOptions=["EMKL", "Forwarder"];

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
    length4 = {
        label: {
            align: "right",
            length: 5
        }
    }
    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    unitsColumns = [
        { header: "Unit"},
        { header: "Nilai Tagihan" },
    ];

    invoicesColumns = [
        { header: "No Invoice"},
    ];


    get buyerLoader() {
        return BuyerLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isEdit=this.context.isEdit;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        if(this.data.id){
            this.selectedSalesNote={
                noteNo:this.data.localSalesNoteNo
            };
        }
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }

    buyerView = (data) => {
        var code= data.Code || data.code;
        var name= data.Name || data.name;
        return `${code} - ${name}`;
    }

    get addUnits() {
        return (event) => {
            this.data.units.push({});
        };
    }

    get removeUnits() {
        return (event) => {
            this.error = null;
        };
    }
    get addInvoices() {
        return (event) => {
            this.data.invoices.push({});
        };
    }

    get removeInvoices() {
        return (event) => {
            this.error = null;
        };
    }
}
