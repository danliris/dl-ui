import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable item;
    @bindable title;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    machineInfo = {
        columns: [
            { header: "Mesin", value: "machine" },
        ],
        onAdd: function () {
            this.data.machines = this.data.machines || [];
            this.data.machines.push({ machine: "" });
        }.bind(this),
        onRemove: function () {
            console.log("machine removed");
        }.bind(this)
    };
}