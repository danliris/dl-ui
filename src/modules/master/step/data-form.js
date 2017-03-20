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
            { header: "Indikator", value: "name" },
            { header: "Nilai", value: "qty" }, 
            { header: "Satuan", value: "uom" },
        ],
        onAdd: function () {
            this.data.stepIndicators.push({ name: "", qty: 0, uom: "" });
            console.log("add");
        }.bind(this),
        onRemove: function () {
            console.log("remove");
        }.bind(this)
    };



}