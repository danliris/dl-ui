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
    @bindable OnStartOperator;

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
    OnStartOperatorChanged(newValue) {

        if (newValue) {

            if (newValue.Id && newValue.Assignment == "AJL") {

                if (this.error.OnStartOperator) {
                    this.error.OnStartOperator = "";
                }

                this.data.OperatorId = newValue.Id;

            } else {

                this.error.OnStartOperator = " Bukan Operator AJL ";
            }
        }
    }

    BeamChanged(newValue) {

        if (newValue) {

            this.data.BeamId = newvalue.Id;
        }
    }

    StartTimeChanged(newValue) {
        this.data.StartDate =  moment(this.data.StartDate).utcOffset("+07:00").format();
        this.data.StartTime = newValue;
        this.service.getShiftByTime(newValue)
        .then(result => {

            this.data.StartShiftName = result.Name;
            this.data.ShiftId = result.Id;
        });
    }
}