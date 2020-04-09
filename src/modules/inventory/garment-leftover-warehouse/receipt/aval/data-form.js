import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const UnitLoader = require('../../../../../loader/garment-units-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedUnitFrom;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "Nomor RO", value: "RONo" },
    ]

    get unitLoader() {
        return UnitLoader;
    }

    
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true 
        }

        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Code: this.data.UnitFrom.Code,
                Name: this.data.UnitFrom.Name
            };
            for (const item of this.data.Items) {
                item.ProductCode = item.Product.Code;
                item.ProductName = item.Product.Name;
                item.UomUnit = item.Uom.Unit;
            }
        }
    }

    selectedUnitFromChanged(newValue){
        if (this.data.Id) return;

        this.data.UnitFrom = newValue;

        this.data.ROList.splice(0);
    }

    get addItems() {
        return (event) => {
            this.data.ROList.push({
                UnitId: this.data.UnitFrom? this.data.UnitFrom.Id : 0,
                RONo:""
            })
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }
}
