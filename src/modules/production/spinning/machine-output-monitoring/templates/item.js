import { inject, BindingEngine, bindable } from 'aurelia-framework';

@inject(BindingEngine)
export class Item {
    @bindable isBlowing;
    @bindable isWinding;
    @bindable isFlying;
    @bindable output;

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = context.options.readOnly;
        this.processType = context.context.options.ProcessType;

        if (this.processType == "Blowing") {
            this.isBlowing = true;
            this.isWinding = false;
            this.isFlying = false;
        } else if (this.processType == "Winding") {
            this.isBlowing = false;
            this.isWinding = true;
            this.isFlying = false;
        } else if (this.processType == "Flying") {
            this.isBlowing = false;
            this.isWinding = false;
            this.isFlying = true;
        } else {
            this.isBlowing = false;
            this.isWinding = false;
            this.isFlying = false;
        }

    }

    outputChanged(n, o) {
        if (this.output) {
            this.data.Output = this.output;
            this.data.Bale = this.output;
            this.data.Eff = this.output;
        }
    }
    controlOptions = {
        control: {
            length: 12
        }
    };
    // mockMachineLoader = (keyword, filter) => {

    //     return Promise.resolve([{ Name: "Machine 1" }, { Name: "Machine 2" }]);
    // }

    // get machineLoader() {
    //     //return ProcessLoader;
    //     return this.mockMachineLoader;
    // }
}
