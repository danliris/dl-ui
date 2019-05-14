import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";
var Operator = require("../../../../loader/weaving-operator-loader");
var Unit = require("../../../../loader/unit-loader");
var WeavingOrder = require("../../../../loader/weaving-order-loader");
var Machine = require("../../../../loader/weaving-machine-loader");

@inject(Service, Router)
export class CreateForm {
    @bindable title;
    @bindable readOnly;
    @bindable OrderProduction;
    @bindable StartTime
    @bindable Shift

    constructor(service, router) {
        this.service = service;
        this.router = router;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan"
    };

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    // Bindable Method
    StartTimeChanged(newValue) {
        this.data.StartTime = newValue;

        this.service.getShiftByTime(newValue)
            .then(result => {

                if (result) {
                    this.Shift = result;
                }
            });
    }

    OrderProductionChanged(newValue) {
        if (newValue.Id) {
            this.data.OrderProduction = newValue;
        }
    }

    // Auto Initialize
    get FabricConstruction() {
        if (this.OrderProduction) {
            return this.OrderProduction.ConstructionNumber;
        }
    }

    // Loaders
    get Operators() {
        return Operator;
    }

    get WeavingUnits() {
        return Unit;
    }

    get OrderProductions() {
        return WeavingOrder;
    }

    get Machines() {
        return Machine;
    }
}