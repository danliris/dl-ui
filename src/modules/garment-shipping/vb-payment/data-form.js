import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../loader/garment-buyers-loader');
const EMKLLoader = require('../../../loader/garment-emkl-loader');
const ForwarderLoader = require('../../../loader/garment-forwarder-loader');
const IncomeTaxLoader = require('../../../loader/income-tax-loader');

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
            length: 6
        },
        control: {
            length: 6
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

    get emklLoader(){
        return EMKLLoader;
    }

    get forwarderLoader(){
        return ForwarderLoader;
    }

    get incomeTaxLoader(){
        return IncomeTaxLoader;
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

    incomeTaxView = (data) => {
        var name= data.Name || data.name;
        return `${name}`;
    }

    emklView= (data) => {
        var name= data.Name || data.name;
        return `${name}`;
    }

    forwarderView= (data) => {
        var name= data.Name || data.name;
        return `${name}`;
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

    get billTotal(){
        var bill=0;
        if(this.data.incomeTax){
            var rate= this.data.incomeTax.Rate || this.data.incomeTax.rate;
            bill= (this.data.billValue + this.data.vatValue)-(rate/100*this.data.billValue);
        }
        return bill;
    }
}
