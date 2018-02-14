import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var YarnsLoader = require('../../../../loader/yarn-spinning-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var MachineLoader = require('../../../../loader/machine-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;


    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.Spinning && this.data.Spinning._id) {
            this.selectedSpinning = this.data.Spinning;
        }
        if (this.data.Yarn && this.data.Yarn.Id) {
            this.selectedYarn = this.data.Yarn;
        }
        if (this.data.Machine && this.data.Machine._id) {
            this.selectedMachine = this.data.Machine;
        }
    }

    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };
    @bindable machineFilter = { "unit.name": { "$exists": true } };
    shiftItems = ["", "Shift I: 06.00 - 14.00", "Shift II: 14.00 - 22.00", "Shift I: 22.00 - 06.00"];

    @bindable selectedYarn;
    selectedYarnChanged(newVal, oldVal) {
        if (this.selectedYarn && this.selectedYarn.Id) {
            this.data.Yarn = this.selectedYarn;
        }
        else {
            this.data.Yarn = null;
        }
    }

    get yarnsLoader() {
        return YarnsLoader;
    }

    @bindable selectedSpinning;
    selectedSpinningChanged(newVal, oldVal) {
        if (this.selectedSpinning && this.selectedSpinning._id) {
            this.data.Spinning = this.selectedSpinning;
            this.machineFilter = { "unit.name": { "$regex": this.selectedSpinning.name, "$options": "i" } };
            if (this.context.isCreate) {
                this.selectedMachine = null;
            }
        }
        else {
            this.machineFilter = { "unit.name": { "$exists": true } };
            this.data.Spinning = null;
        }
    }

    get spinningLoader() {
        return UnitLoader;
    }

    @bindable selectedMachine;
    selectedMachineChanged(newVal, oldVal) {
        if (this.selectedMachine && this.selectedMachine._id) {
            this.data.Machine = this.selectedMachine;
        }
        else {
            this.data.Machine = null;
        }
    }

    get machineLoader() {
        return MachineLoader;
    }
} 