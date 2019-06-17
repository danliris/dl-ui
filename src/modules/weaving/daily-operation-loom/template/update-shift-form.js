import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";
import moment from "moment";
var Operator = require("../../../../loader/weaving-operator-loader");

@inject(Service, Router)
export class UpdateShiftForm {
    @bindable title;
    @bindable readOnly;
    @bindable ChangeShifTime;
    @bindable OnStopOperator;
    @bindable ChangeShiftDate;

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
    ChangeShiftDateChanged(newValue) {
        this.data.ChangeShiftDate =  moment(newValue).utcOffset("+07:00").format();
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

    ChangeShifTimeChanged(newValue) {
       
        this.data.ChangeShifTime = newValue;
        this.service.getShiftByTime(newValue)
        .then(result => {
            this.data.ChangeShiftName = result.Name;
            this.data.ShiftId = result.Id;
        });
    }
}