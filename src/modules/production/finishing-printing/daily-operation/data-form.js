import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
var momentToMillis = require('../../../../utils/moment-to-millis');
var MachineLoader = require('../../../../loader/machine-loader');
var StepLoader = require('../../../../loader/step-loader');
var KanbanLoader = require('../../../../loader/kanban-loader');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnlyInput = false;
    @bindable readOnlyOutput = false;
    @bindable readOnly = false;
    @bindable output = false;
    @bindable input = false;
    @bindable data = {};
    @bindable error = {};
    @bindable machine;
    @bindable step;
    @bindable kanban;

    @bindable localInputDate;
    @bindable localOutputDate;

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 8
        }
    };

    auNumericInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 3
        }
    };

    auDropdownInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    shiftOptions = ['','Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    actionOptions = ['','Reproses', 'Digudangkan', 'Dibuang'];
    timePickerShowSecond = false;
    timePickerFormat = "HH:mm";

    badOutputInfo = {
        columns: [
            { header: "Alasan", value: "badOutputReason" },
            { header: "Presentase Alasan %", value: "Presentation" },
            { header: "Keterangan", value: "description" }
        ],
        onAdd: function () {
            // this.context.ItemsCollection.bind()
            this.data.badOutputReasons = this.data.badOutputReasons || [];
            this.data.badOutputReasons.push({ badOutputReason: "", presentation : 0, description : "" });
        }.bind(this),
        onRemove: function () {
            console.log("bad output reason removed");
        }.bind(this)
    };

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    bind(context)
    {
        //console.log(context);
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.localInputDate = new Date(Date.parse(this.data.dateInput));
        this.localOutputDate = new Date(Date.parse(this.data.dateOutput));
        
        this.filterMachine = {
            "unit.division.name" : "FINISHING & PRINTING"
        }
    }

    localInputDateChanged(newValue) {
        this.data.dateInput = this.localInputDate;
    }

    localOutputDateChanged(newValue) {
        this.data.dateOutput = this.localOutputDate;
    }

    get isFilterKanban(){
        this.filterKanban = {};
        if(this.data.step)
        {
            this.filterKanban = {
                "instruction.steps" : { "$elemMatch" : {
                    "process" : this.data.step.process
                } },
                "isComplete": false,
                "$where": "this.instruction.steps.length != this.currentStepIndex"
            };
        }
        return this.filterKanban;
    }

    get isFilterStep(){
        this.filterStep = {};
        if(this.data.machine)
        {
            var steps = [];
            for(var step of this.data.machine.steps){
                steps.push(step.step.process);
            }
            this.filterStep = {
                "process" : { "$in" : steps }
            };
        }
        return this.filterStep;
    }
    
    get hasStep(){
        return this.data && this.data.step;
    }

    get hasMachine() {
        return this.data && this.data.machine;
    }

    get hasKanban() {
        return this.data && this.data.kanban;
    }

    get hasError(){
        return this.output && this.error && this.error.badOutputReasons && typeof this.error.badOutputReasons === "string";
    }

    get hasBadOutput(){
        return this.data && this.data.machineId && this.data.machineId !== "" && this.data.badOutput && this.data.badOutput > 0 && this.output;
    }

    get getFilterReason(){
        this.filterReason = {};
        if(this.data.machine){
            this.filterReason = {
                "machines" : {
                    "$elemMatch" : {
                        "code" : this.data.machine.code
                    }
                }
            }
        }
        return this.filterReason;
    }

    kanbanChanged(newValue, oldValue){
        var selectedKanban = newValue;

        if(selectedKanban){
            this.data.kanbanId = selectedKanban._id;
            this.data.kanban = selectedKanban;

            if(this.input && this.data.kanbanId && this.data.kanbanId !== "")
                this.data.input = Number(selectedKanban.cart.qty);
            if(this.output && this.data.kanbanId && this.data.kanbanId !== "")
                this.data.goodOutput = Number(selectedKanban.cart.qty);
        }
        else {
            delete this.data.kanbanId;
            this.data.kanban = undefined;
        }
    }

    stepChanged(newValue, oldValue) {
        var selectedStep = newValue;

        if(selectedStep) {
            this.data.stepId = selectedStep._id;
            this.data.step = selectedStep;
        }
        else {
            delete this.data.stepId;
            this.data.step = undefined;
        }
        
        this.kanbanAU.editorValue = "";
    }

    machineChanged(newValue, oldValue) {
        var selectedMachine = newValue;
        if(selectedMachine) {
            this.data.machine = selectedMachine;
            this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
            this.filterReason = {
                "machines" : {
                    "$elemMatch" : {
                        "code" : this.data.machine.code
                    }
                }
            }
        }
        else {
            this.data.machine = undefined;
            delete this.data.machineId;
            this.filterReason = {};
        }
        if(this.data && this.data.badOutputReasons && this.data.badOutputReasons.length > 0){
            var count = this.data.badOutputReasons.length;
            console.log(this.data.badOutputReasons);
            for(var a = count; a >= 0; a--){
                this.data.badOutputReasons.splice((a-1), 1);
            }
            console.log(this.data.badOutputReasons);
        }
        // console.log(this.ItemsCollection);
        // console.log(this.stepAU);
        this.stepAU.editorValue = "";
        this.kanbanAU.editorValue = "";
    }

    get machineLoader() {
        return MachineLoader;
    }

    get stepLoader() {
        return StepLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

    kanbanView(kanban) {
        if (kanban.productionOrder) {
            return `${kanban.productionOrder.orderNo} - ${kanban.cart.cartNumber}`;
        }
        else
            return '';
    }
}