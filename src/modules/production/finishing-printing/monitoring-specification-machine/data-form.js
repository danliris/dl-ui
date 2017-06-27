import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

var MachineLoader = require('../../../../loader/machines-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-loader');

export class DataForm {

    @bindable readOnly = false;
    @bindable data;
    @bindable error;
    @bindable machine;
    @bindable productionOrder;
    @bindable title;

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    divisionFilter = { "unit.division.name": "FINISHING & PRINTING" };

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    get isFilterMachineType() {
        this.filterMachineType = {
            "machineType.code": this.data.machineType.code
        };
        return this.filterMachineType;
    }

    // itemsColumns = [
    //     { header: "Indicator", value: "indicator" },
    //     { header: "Value", value: "defaultValue" },
    //     { header: "Satuan", value: "uom" },
    // ]

    machineChanged(newValue) {

        this.data.machine = newValue;
        if (this.data.machine) {
            var items = [];
            for (var indicator of this.data.machine.machineType.indicators) {
                var item = {
                    indicator: indicator.indicator,
                    dataType: indicator.dataType,
                    defaultValue: indicator.defaultValue,
                    value: "",
                    uom: indicator.uom,
                };
                items.push(item);
            }
            this.data.items = items;

            this.data.machineId = this.data.machine._id ? this.data.machine._id : "";
        } else {
            this.data.items = [];
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    productionOrderChanged(newValue) {
        this.data.productionOrder = newValue;
        if (this.data.productionOrder) {
            this.data.productionOrderId = this.data.productionOrder._id ? this.data.productionOrder._id : "";
        }
    }

    resetErrors() {
        this.error = {};
        // this.data.items = []

    }


    activate() {

    }

    attached() {

    }

} 