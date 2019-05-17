import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";
var Operator = require("../../../../loader/weaving-operator-loader");

@inject(Service, Router)
export class StopForm {
    @bindable title;
    @bindable readOnly;
    @bindable StopTime

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
    StopTimeChanged(newValue) {
        console.log(newValue);
        this.data.StartTime = newValue;
        this.service.getShiftByTime(newValue)
        .then(result => {
            this.data.Shift = result;
        });
    }
}