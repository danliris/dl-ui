import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, SalesService, CoreService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service, SalesService, CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service, salesService, coreService) {
        this.service = service;
        this.salesService = salesService;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };
    subconTypes=["BORDIR","PRINT","PLISKET"];
    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "RO",
            "No Artikel",
            "Komoditi",
            ""
        ]
    }

    @computedFrom("data.Unit")
    get cuttingInFilter() {
        this.selectedCuttingIn = null;
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC"
            };
        } else {
            return {
                UnitId: 0,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC"
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,

        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({
                Unit:this.data.Unit
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
        };
    }

    selectedUnitChanged(newValue){
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Items.splice(0);
        }
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Items.splice(0);
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave){
                    qty += item.Quantity;
                }
            }
        }
        return qty;
    }
}