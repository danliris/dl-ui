import { bindable } from 'aurelia-framework';



// @inject(BindingEngine)
export class Item {
    
    @bindable output;
    @bindable data;
    @bindable readOnly;
    @bindable uomUnit;

    
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = context.options.readOnly;
        
        this.uomUnit =  context.context.options.UomUnit;
        
        if (this.data.Output) {
            this.output = this.data.Output;
        }


        
    }

    outputChanged(n, o) {

        this.data.Output = this.output;
        if (o != null && o != undefined && n != o) {
            // this.baseMathFormula();
        }

    }

    badOutputChanged(n, o) {

        this.data.BadOutput = this.badOutput;
        if (o != null && o != undefined && n != o && this.isBlowing) {
            this.baseMathFormula();
        }

    }

    deliveryTotalChanged(n, o) {

        this.data.DeliveryTotal = this.deliveryTotal;
        if (o != null && o != undefined && n != o && this.isFlyer) {
            this.baseMathFormula();
        }

    }

    spindleChanged(n, o) {

        this.data.Spindle = this.spindle;
        if (o != null && o != undefined && n != o && this.isFlyer) {
            this.baseMathFormula();
        }

    }

    wasteChanged(n, o) {

        this.data.Waste = this.waste;
        if (o != null && o != undefined && n != o && this.isWinder) {
            this.baseMathFormula();
        }

    }

    drumTotalChanged(n, o) {

        this.data.DrumTotal = this.drumTotal;
        if (o != null && o != undefined && n != o && this.isWinder) {
            this.baseMathFormula();
        }

    }

    baseMathFormula() {
        
        if (this.processType == "Blowing") {
            this.blowingFormula(this.MachineSpinning);
        } else if (this.processType == "Carding") {
            this.cardingFormula(this.MachineSpinning);
        } else if (this.processType == "Flyer") {
            this.flyerFormula(this.MachineSpinning);
        } else if (this.processType == "Ring Spinning") {
            this.ringFormula(this.MachineSpinning);
        } else if (this.processType == "Winder") {
            this.winderFormula(this.MachineSpinning);
        } else if (this.processType.includes("Drawing")) {
            this.drawingFormula(this.MachineSpinning);
        } else if (this.processType == "Lap Former") {
            this.lapFormerFormula(this.MachineSpinning);
        } else if (this.processType == "Combing") {
            this.combingFormula(this.MachineSpinning);
        }
    }

    blowingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = (this.data.Output / 181.44) * MachineSpinning.Delivery;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "GRAM") {
            this.data.Bale = this.data.Output / (1000 * 181.44);
            // this.data.Bale = (this.data.Output / 181.44) * MachineSpinning.Delivery;
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / ((this.CountConfig.RPM * 345.6 * (22 / 7) * MachineSpinning.Delivery) / (this.CountConfig.Ne * 307200)); // 60 * 24 * 0.24 & 400 * 768
    }

    cardingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = (this.data.Output / 181.44) * MachineSpinning.Delivery;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = (this.data.Output * 0.01 / this.CountConfig.Ne) / 400;

        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "MTR") {
            this.data.Bale = this.CountConfig.Constant * (this.data.Output / 0.914 * this.CountConfig.Grain) / 16800000; //6 * 7000 * 400
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 24 * MachineSpinning.Delivery) / 181.44) / 3);
    }

    combingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = ((this.data.Output / (this.CountConfig.Ne / this.CountConfig.Grain)) / 400) * MachineSpinning.Delivery;
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / ((36 * (22 / 7) * this.CountConfig.RPM * MachineSpinning.Delivery * this.CountConfig.TotalDraft) / (4300800 * this.CountConfig.Ne)); // 24 * 60 * 0.025 && 14 * 400 * 768
    }

    drawingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = (this.data.Output / 181.44) * MachineSpinning.Delivery;
        } else {
            this.data.Bale = this.data.Output;
        }

        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 1440 * MachineSpinning.Delivery) / (this.CountConfig.Ne * 307200)) / 3); //24*60 & 768 * 400
    }

    lapFormerFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "YARD") {
            this.data.Bale = ((this.data.Output / 840) / this.CountConfig.Ne) / 400;
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / ((this.CountConfig.RPM * MachineSpinning.Delivery * 1440) / (((7000 / 840) / this.CountConfig.Grain) * 307200)); // 24 * 60 && 768 * 400
    }

    ringFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = ((this.data.Output * MachineSpinning.Delivery) / (this.CountConfig.Ne * 100)) / 400;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "RND") {
            this.data.Bale = ((this.data.Output / (768 / (((22 / 7) * 2.5) / 100)) / this.CountConfig.Ne) / 400) * MachineSpinning.Delivery;

        }
        else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 1440 * MachineSpinning.Delivery) / (this.CountConfig.Ne * 12096000 * this.CountConfig.TPI)) / 3); // 60 * 24 & 36 * 840 * 400

    }

    winderFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "CONE") {
            this.data.Bale = this.data.Output / (181.44 / this.CountConfig.ConeWeight);
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 1440 * this.data.DrumTotal) / (this.CountConfig.Ne * 307200)) / 3); // 60 * 24 & 768 * 400

    }

    flyerFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = this.data.Output / 181.44;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "RND") {
            this.data.Bale = this.data.Output * ((28.5 * (22 / 7) * this.CountConfig.TotalDraft * this.CountConfig.Grain * (MachineSpinning.Delivery - this.data.Spindle)) / 76776006142.08); // 1000 * 0.914 * 30 * 15.4321 * 453.6 * 400
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "MTR") {
            this.data.Bale = (((MachineSpinning.Delivery - this.data.Spindle) * this.data.Output) / (768 * this.CountConfig.Ne)) / 400;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = (this.data.Output * 0.01 / this.CountConfig.Ne) / 400;

        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 1440 * (this.data.DeliveryTotal - this.data.Spindle)) / (this.CountConfig.Ne * 12096000 * this.CountConfig.TPI)) / 3); // 60 * 24 & 36 * 840 * 400
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

}
