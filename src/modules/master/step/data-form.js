import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    activate() { }

    attached() {
    }

    bind() {
    }

    stepIndicatorsInfo = {
        columns: [
            { header: "Indikator", value: "Name" },
            { header: "Nilai", value: "Qty" },
            { header: "Satuan", value: "Uom" },
        ],
        onAdd: function () {
            this.data.StepIndicators.push({ Name: "", Qty: 0, Uom: "" });
            console.log("add");
        }.bind(this),
        onRemove: function () {
            console.log("remove");
        }.bind(this)
    };



}