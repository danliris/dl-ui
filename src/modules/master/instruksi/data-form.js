import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable isEdit;

    constructor() { } 
    
    activate() { }

    attached() {
    }

    bind() {
        if (this.data && this.data.uom)
            this.data.uom.toString = function () {
                return this.unit;
            };
    }

    stepInfo = {
        columns: [
            { header: "Step", value: "step" },
        ],
        onAdd: function () {
            debugger
            this.data.steps = this.data.steps || [];
            this.data.steps.push({ step: "", stepIndicators: [] });
        }.bind(this),
        onRemove: function () {
            console.log("step removed");
        }.bind(this)
    };

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
            this.data.uomId = selectedUom._id;
    }

}