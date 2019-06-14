import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";
import moment  from "moment";
var Operator = require("../../../../loader/weaving-operator-loader");

@inject(Service, Router)
export class FinishForm {
    @bindable title;
    @bindable readOnly;
    @bindable FinishTime;
    @bindable OnFinishOperator;
    @bindable FinishDate;

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
    FinishDateChanged(newValue){
        this.data.FinishDate =  moment(newValue).utcOffset("+07:00").format();
    }

    OnFinishOperatorChanged(newValue) {

        if (newValue) {

            if (newValue.Id && newValue.Assignment == "AJL") {

                if (this.error.OnFinishOperator) {
                    this.error.OnFinishOperator = "";
                }

                this.data.OperatorId = newValue.Id;

            } else {

                this.error.OnFinishOperator = " Bukan Operator AJL ";
            }
        }
    }
    
    FinishTimeChanged(newValue) {
        this.data.FinishTime = newValue;
        this.service.getShiftByTime(newValue)
            .then(result => {
                this.data.FinishShiftName = result.Name;
                this.data.ShiftId = result.Id;
            });
    }
}