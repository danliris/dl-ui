import { inject, BindingEngine, bindable } from 'aurelia-framework';
import { isNullOrUndefined } from 'util';


@inject(BindingEngine)
export class Item {
    @bindable isBlowing;
    @bindable isWinding;
    @bindable isFlying;
    @bindable output;
    @bindable data;
    @bindable readOnly;
    @bindable badOutput;
    @bindable deliveryTotal;
    @bindable spindle;
    @bindable waste;
    @bindable drumTotal;

    CountConfig = {};
    MachineSpinnings = {};
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = context.options.readOnly;
        this.processType = context.context.options.ProcessType;
        this.CountConfig = context.context.options.CountConfig;
        this.MachineSpinnings = context.context.options.MachineSpinnings;


        if (this.data.Output) {
            this.output = this.data.Output;
        }

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
        if (!isNullOrUndefined(this.output)) {
            this.data.Output = this.output;
            if (n != o) {
                this.baseMathFormula();
            }
        }
    }

    badOutputChanged(n, o) {
        if (!isNullOrUndefined(this.badOutput)) {
            this.data.BadOutput = this.badOutput;
            if (n != o) {
                this.baseMathFormula();
            }
        }
    }

    deliveryTotalChanged(n, o) {
        if (!isNullOrUndefined(this.deliveryTotal)) {
            this.data.DeliveryTotal = this.deliveryTotal;
            if (n != o) {
                this.baseMathFormula();
            }
        }
    }

    spindleChanged(n, o) {
        if (!isNullOrUndefined(this.spindle)) {
            this.data.Spindle = this.spindle;
            if (n != o) {
                this.baseMathFormula();
            }
        }
    }

    wasteChanged(n, o) {
        if (!isNullOrUndefined(this.waste)) {
            this.data.Waste = this.waste;
            if (n != o) {
                this.baseMathFormula();
            }
        }
    }

    drumTotalChanged(n, o) {
        if (!isNullOrUndefined(this.drumTotal)) {
            this.data.DrumTotal = this.drumTotal;
            if (n != o) {
                this.baseMathFormula();
            }
        }
    }

    baseMathFormula() {
        var MachineSpinning = this.MachineSpinnings.find(x => x.Id == this.data.MachineSpinning.Id);
        if (this.processType == "Blowing") {
            this.blowingFormula(MachineSpinning);
        } else if (this.processType == "Carding") {
            this.cardingFormula(MachineSpinning);
        } else if (this.processType == "Flying") {
            this.flyingFormula(MachineSpinning);
        } else if (this.processType == "Ring Spinning") {
            this.ringFormula(MachineSpinning);
        } else if (this.processType == "Winding") {
            this.windingFormula(MachineSpinning);
        } else if (this.processType == "Pre-Drawing" || "Finish Drawing") {
            this.drawingFormula(MachineSpinning);
        }
    }

    blowingFormula(MachineSpinning) {
        this.data.Bale = this.data.Output;
        this.data.Eff = 100;
    }

    cardingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = this.data.Output / 181.44;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = (this.data.Output * 0.01 / this.CountConfig.Ne) / 400;

        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "MTR") {
            this.data.Bale = this.CountConfig.Constant * (this.data.Output / 0.914 * this.CountConfig.Grain);
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 24 * MachineSpinning.Delivery) / 181.44) / 3);
    }

    drawingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = this.data.Output / 181.44;
        } else {
            this.data.Bale = this.data.Output;
        }

        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 60 * 24 * MachineSpinning.Delivery) / (this.CountConfig.Ne * 768 * 400)) / 3);
    }

    ringFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = this.data.Output * MachineSpinning.Delivery / ((this.CountConfig.Ne * 1000) / 400);
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 60 * 24 * MachineSpinning.Delivery) / (this.CountConfig.Ne * 36 * 840 * 400 * this.CountConfig.TPI)) / 3);

    }

    windingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "CONE") {
            this.data.Bale = this.data.Output / (181.44 / this.CountConfig.ConeWeight);
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 60 * 24 * this.data.DrumTotal) / (this.CountConfig.Ne * 768 * 400)) / 3)

    }

    flyingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = this.data.Output / 181.44;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = 28.5 * 3.14 * this.CountConfig.TotalDraft * (this.data.DeliveryTotal - this.data.Spindle) / 1000 * 768 * this.CountConfig.Ne * 400;

        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 60 * 24 * (this.data.DeliveryTotal - this.data.Spindle)) / (this.CountConfig.Ne * 36 * 840 * 400 * this.CountConfig.TPI)) / 3)
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
