import {inject, bindable, computedFrom} from 'aurelia-framework';

export class DataForm {
    @bindable data = { "import": true };
    @bindable error = {};
    @bindable showSecond = false;
    @bindable timePickerFormat = "HH:mm";
    @bindable datePickerFormat = "DD MMMM YYYY";
    @bindable Options = {
        "readOnly": false,

    }


    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;

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


    machineChanged(e) {
        if (e.detail) {
            var selectedProcess = e.detail || {};
            // this.data.items = e.detail.indicators;
            if (selectedProcess) {

                var items = [];
                for (var indicator of selectedProcess.machineType.indicators) {
                    var item = {
                        indicator: indicator.indicator,
                        dataType: indicator.dataType,
                        defaultValue: indicator.defaultValue,
                        value: "",
                        uom:indicator.uom,
                    };
                    items.push(item);
                }
                this.data.items = items;

                this.data.machineId = selectedProcess._id ? selectedProcess._id : "";
            }
        }
    }

       productionOrderChanged(e) {
        var selectedProcess = e.detail || {};
        this.data.productionOrder = e.detail;
        if (selectedProcess) {
            this.data.productionOrderId = selectedProcess._id ? selectedProcess._id : "";
        }

    }

    resetErrors() {
        this.error = {};
    }


    activate() {

    }

    attached() {

    }
} 