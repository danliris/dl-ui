import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
var moment = require("moment");
var Operator = require("../../../loader/weaving-operator-loader");
var FabricConstruction = require("../../../loader/weaving-constructions-loader");
var Material = require("../../../loader/weaving-material-type-loader");
var Order = require("../../../loader/weaving-order-loader");

@inject(Service, Router)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable Operator;
    @bindable Material;
    @bindable DateOperation;
    @bindable PreparationTime;
    @bindable Shift;
    @bindable OrderProductionNumber;

    constructor(service, router) {
        this.service = service;
        this.router = router;
    }
    
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

     // Bindable Method
     OrderProductionNumberChanged(newValue) {
         this.data.OrderId = newValue.Id;
     }

     DateOperationChanged(newValue) {
        this.data.DateOperation = moment(newValue).format();
    }

    OperatorChanged(newValue) {

        if (newValue) {
            this.data.OperatorId = newValue.Id;
        }
    }

    FabricConstructionChanged(newValue) {

        if (newValue) {
            this.data.ConstructionId = newValue.Id;
        }
    }

    PreparationTimeChanged(newValue) {
        this.data.TimeOperation = newValue;
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

    MaterialChanged(newValue) {

        if (newValue) {
            this.data.MaterialTypeId = newValue.Id;
        }
    }

    get FabricConstructionNumber() {
        if (this.OrderProductionNumber) {

            if (this.OrderProductionNumber.ConstructionNumber)
            {

                if (this.OrderProductionNumber.ConstructionId) {
                    this.data.ConstructionId = this.OrderProductionNumber.ConstructionId;
                }

                return this.OrderProductionNumber.ConstructionNumber;
            }

        }
    }

    // Loaders
    get OrderProductionNumbers() {
        return Order;
    }

    get Operators() {

        return Operator;
    }

    get FabricConstructions() {
        return FabricConstruction;
    }

    get Materials() {
        return Material;
    }
}