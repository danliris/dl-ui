import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";
var Operator = require("../../../../loader/weaving-operator-loader");

@inject(Service, Router)
export class StartForm {
    @bindable title;
    @bindable readOnly;
    @bindable OrderProduction;
    @bindable StartTime;
    @bindable Beam;
    @bindable Operator;

    constructor(service, router) {

        this.service = service;
        this.router = router;
    }

    bind(context) {

        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    // Loaders
    get Operators() {

        return Operator;
    }

    //bindable method
    OperatorChanged(newValue) {

        if (newValue) {

            if (newValue.Id && newValue.Assignment == "AJL") {

                if (this.error.Operator) {
                    this.error.Operator = "";
                }

                this.data.OperatorId = newValue.Id;

            } else {

                this.error.Operator = " Bukan Operator AJL ";
            }
        }
    }

    BeamChanged(newValue) {

        if (newValue) {

            this.data.BeamId = newvalue.Id;
        }
    }

    StartTimeChanged(newValue) {

        this.data.StartTime = newValue;
        this.service.getShiftByTime(newValue)
        .then(result => {

            this.data.ShiftName = result.Name;
            this.data.ShiftId = result.Id;
        });
    }
}