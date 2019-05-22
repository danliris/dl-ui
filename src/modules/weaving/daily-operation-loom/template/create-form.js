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
    @bindable Shift
    @bindable Operator;
    @bindable WeavingUnit;
    @bindable PreparationTime;
    @bindable Machine;

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

    WeavingUnitChanged(newValue) {

        if (newValue) {

            if (newValue.Id) {
                this.data.UnitId = newValue.Id;
            }
        }
    }

    MachineChanged(newValue) {

        if(newValue) {

            this.data.MachineId = newValue.Id;
        }
    }

    PreparationTimeChanged(newValue) {

        this.data.PreparationTime = newValue;
        this.service.getShiftByTime(newValue)
            .then(result => {
                this.error.Shift = "";
                this.Shift = {};
                this.Shift = result;
                this.data.ShiftId = this.Shift.Id;
            })
            .catch(e => {
                this.Shift = {};
                this.data.ShiftId = this.Shift.Id;
                this.error.Shift = " Shift tidak ditemukan ";
            });
    }

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

    OrderProductionChanged(newValue) {

        if (newValue) {

            if (newValue.Id) {
                this.data.OrderId = newValue.Id;
            }
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