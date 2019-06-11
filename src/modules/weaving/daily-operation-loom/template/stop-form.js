import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";
import moment from "moment";
var Operator = require("../../../../loader/weaving-operator-loader");

@inject(Service, Router)
export class StopForm {
    @bindable title;
    @bindable readOnly;
    @bindable StopTime;
    @bindable OnStopOperator;
    @bindable StopDate;

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
    StopDateChanged(newValue) {
        this.data.StopDate =  moment(newValue).utcOffset("+07:00").format();
    }

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
       
        this.data.StopTime = newValue;
        this.service.getShiftByTime(newValue)
        .then(result => {
            this.data.StopShiftName = result.Name;
            this.data.ShiftId = result.Id;
        });
    }
}