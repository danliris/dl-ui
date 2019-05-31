import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";
var Operator = require("../../../../loader/weaving-operator-loader");

@inject(Service, Router)
export class StopForm {
    @bindable title;
    @bindable readOnly;
    @bindable StopTime;
    @bindable OnStopOperator;

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

    OnStopOperatorChanged(newValue) {

        if (newValue) {

            if (newValue.Id && newValue.Assignment == "AJL") {

                if (this.error.OnStopOperator) {
                    this.error.OnStopOperator = "";
                }

                this.data.OperatorId = newValue.Id;

            } else {

                this.error.OnStopOperator = " Bukan Operator AJL ";
            }
        }
    }

    StopTimeChanged(newValue) {
        console.log(newValue);
        this.data.StopTime = newValue;
        this.service.getShiftByTime(newValue)
        .then(result => {
            this.data.StopShiftName = result.Name;
            this.data.ShiftId = result.Id;
        });
    }
}