import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const BuyerLoader = require('../../../loader/garment-buyers-loader');
const ROCCLoader = require('../../../loader/cost-calculation-garment-loader');
const ComodityLoader = require("../../../loader/garment-comodities-loader");

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    @bindable SelectedROCC;

    SampleCategoryOptions = ["Commercial Sample", "Non Commercial Sample"];
    
    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    productColumns= [
        "Style",
        "Color",
        "Size",
        "Keterangan Size",
        "Quantity"
    ];

    specColumns= [
        "Inventory",
        "Detail Spesifikasi",
        "Quantity",
        "Satuan",
        "Keterangan"
    ];

    controlOptions = {
        label: {
            length:3
        },
        control: {
            length: 7
        }
    };

    controlOptions2 = {
        label: {
            length:3
        },
        control: {
            length: 5
        }
    };
    
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,
        };
        if(this.data.RONoCC){
            this.SelectedROCC={
                RO_Number: this.data.RONoCC
            };

        }
    }

    roView = (costCal) => {
        return `${costCal.RO_Number}`
      }
    get roNoCCLoader() {
        return ROCCLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    buyerView = (buyer) => {
        var buyerName = buyer.Name || buyer.name;
        var buyerCode = buyer.Code || buyer.code;
        return `${buyerCode} - ${buyerName}`
    }

    comodityView = (comodity) => {
        var code= comodity.code || comodity.Code;
        var name=comodity.name || comodity.Name;
        return `${code} - ${name}`;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    SelectedROCCChanged(newValue){
        if(newValue){
            if(newValue.RO_Number!=this.data.RONoCC){
                this.data.RONoCC=newValue.RO_Number;
            }
        }
    }

    get addItems() {
        return (event) => {
          this.data.SampleProducts.push({});
        };
      }
    
      get removeItems() {
        return (event) => {
          this.error = null;
        };
      }
    
    get addSpecs() {
        return (event) => {
          this.data.SampleSpecifications.push({});
        };
    }
    
    get removeSpecs() {
        return (event) => {
          this.error = null;
        };
    }
}